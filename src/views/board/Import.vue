<template>
  <v-container class="fill-height pa-0" fluid>
    <v-col v-for="(upload, index) in uploadsType" :key="index">
      <input ref="fileHandler" :accept="upload.fileType" class="d-none" type="file" @change="upload.handler">
      <v-card color="other" elevation="6" @dragenter.prevent @dragover.prevent @drop.prevent="upload.handler">
        <v-responsive aspect-ratio="1.1">
          <v-card-title class="justify-center">{{ upload.title }}</v-card-title>
          <v-card-actions class="justify-center fill-height">
            <v-icon class="mb-16" size="120" @click="openFileHandler(index)">mdi-cloud-upload</v-icon>
          </v-card-actions>
        </v-responsive>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import * as XLSX from "xlsx";
import gql from "graphql-tag";

function getFileFromEvent(event) {
  if (event.type === 'drop') {
    return event.dataTransfer.files[0];
  } else {
    return event.target.files[0];
  }
}

//TODO: CONDIVISI CON BACKEND #1
interface Teacher {
  name: string;
  surname: string;
}

interface Class {
  division: string;
  class: number;
  teachers: { id: number[], subjects: string[] }[];
}

interface dataTimetable{
  teachers: Teacher[];
  classes: Class[];
}

interface StudentInfo {
  division: string,
  class: number,
  name: string,
  surname: string,
  fiscalCode: string,
  disorders: string[],
}

export default {
  name: "Import-admin",
  data() {
    return {
      uploadsType: [
        {title: "Orario", fileType: ".xml", handler: this.orarioHandler},
        {title: "Studenti", fileType: ".xls,.xlsx", handler: this.studentiHandler},
      ]
    }
  },
  methods: {
    sendTimetable(timetable: dataTimetable): Promise<boolean> {
      return this.$apollo.mutate({
        mutation: gql`
          mutation ($timetable: dataTimetable!) {
            importTimetable(data: $timetable)
          }`,
        variables: {
          timetable: timetable
        }
      })
    },
    sendStudents(students: StudentInfo[]): Promise<boolean> {
      return this.$apollo.mutate({
        mutation: gql`
          mutation ($students: [StudentInfo!]!) {
            importStudents(students: $students)
          }`,
        variables: {
          students: students
        }
      })
    },
    openFileHandler(index) {
      this.$refs.fileHandler[index].click();
    },
    //TODO: Fix working variable names to match structure names
    orarioHandler(e) {
      let file = getFileFromEvent(e);
      if (!this.uploadsType[0].fileType.split(",").includes("." + file.name.split(".")[1])) {
        this.$swal("Errore", "Tipo di file non valido, TIPI VALIDI:" + this.uploadsType[1].fileType, "error");
        return;
      }

      Vue.swal({
        title: "Caricamento orario",
        text: "Caricamento in corso...",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen() {
          Vue.swal.showLoading();
        }
      });
      const reader = new FileReader();
      reader.onload = async (e) => {
        const contents = e.target.result;
        /**
         * Array of teachers
         */
        const profs: Teacher[] = [];
        const classes: Class[] = [];
        const lessons = new DOMParser().parseFromString(contents as string, 'text/xml').getElementsByTagName("LESSON");

        for (let lesson of lessons) {
          //Get an array of prof surname + names
          const profNames = Array.from(lesson.getElementsByTagName("TEACHER")).map(prof => {
            return prof.childNodes[0].nodeValue
          });
          /**
           * Indexes of prof of the current iteration
           */
          let profIndexes: number[] = [];

          //Fill profIndexes and profs array
          profNames.forEach(element => {
            const splittedName = element.split(" ");
            const name = splittedName[splittedName.length - 1]
            let surname = splittedName[0];
            for (let j = 1; j < splittedName.length - 1; j++) {
              surname += " " + splittedName[j];
            }

            let prof = profs.findIndex((profElement) => profElement.name === name && profElement.surname === surname)
            if (prof === -1) {
              prof = profs.length;
              profs.push({
                name,
                surname
              });
            }
            profIndexes.push(prof);
          })

          //Get groups (section + division + other)
          const groups = lesson.getElementsByTagName("GROUP");
          //Check if the lesson has groups
          if (groups.length !== 0) {
            const group = groups[0].childNodes[0].nodeValue;
            const division = Number(group[0]);
            const className = group.replace(" - ", "").replace(/(\d\^)|(-)|(_(.*?)$)|( (.*?)$)/gmiu, "");
            if (className === "ART") {
              continue;
            }
            const subjectName = lesson.getElementsByTagName("SUBJECT")[0].childNodes[0].nodeValue.replace(" LAB", "");
            const cls = classes.findIndex(cls => cls.division === className && cls.class === division);
            if (cls === -1) {
              classes.push({
                class: division,
                division: className,
                teachers: [{
                  id: profIndexes,
                  subjects: [subjectName]
                }]
              });
            } else {
              const teacher = classes[cls].teachers.findIndex(element => element.id[0] === profIndexes[0]);
              if (teacher === -1) {
                classes[cls].teachers.push({
                  id: profIndexes,
                  subjects: [subjectName]
                });
              } else {
                profIndexes.forEach((index) => {
                  if (!classes[cls].teachers[teacher].id.includes(index)) {
                    classes[cls].teachers[teacher].id.push(index)
                  }
                })
                if (!classes[cls].teachers[teacher].subjects.includes(subjectName)) {
                  classes[cls].teachers[teacher].subjects.push(subjectName);
                }
              }
            }
          }

        }
        if (profs.length !== 0 && classes.length !== 0) {
          Vue.swal.fire({
            title: "Caricamento orario",
            html: "Caricamento completato<br>Upload in corso...",
            icon: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen() {
              Vue.swal.showLoading();
            }
          });
        } else {
          Vue.swal.fire({
            title: "Caricamento orario",
            text: "Caricamento non riuscito",
            icon: "error",
            showConfirmButton: false,
            timer: 3000
          });
        }
        console.log({teachers: profs, classes})
        const result = await this.sendTimetable({teachers: profs, classes});
        if(result.data.importTimetable){
          Vue.swal.fire({
            title: "Upload orario",
            text: "Upload completato",
            icon: "success",
            showConfirmButton: false,
            timer: 3000
          });
        }else{
          Vue.swal.fire({
            title: "Upload orario",
            html: "Upload non riuscito<br>Se il problema persiste si prega di contattare l'amministratore",
            icon: "error",
            showConfirmButton: false,
            timer: 3000
          });
        }
        console.log(result)
      };
      reader.readAsText(file);
    },
    studentiHandler(e) {
      let file = getFileFromEvent(e);

      if (!this.uploadsType[1].fileType.split(",").includes("." + file.name.split(".")[1])) {
        this.$swal("Errore", "Tipo di file non valido, TIPI VALIDI:" + this.uploadsType[1].fileType, "error");
        return;
      }

      Vue.swal.fire({
        title: "Elaborazione studenti",
        text: "Elaborazione in corso",
        allowOutsideClick: false,
        icon: "info",
        showConfirmButton: false,
        didOpen() {
          Vue.swal.showLoading();
        }
      });

      const reader = new FileReader();
      reader.onload = async (e) => {
        const contents = e.target.result;
        const workbook = XLSX.read(contents, {
          type: 'binary'
        });
        let rawData;
        workbook.SheetNames.forEach(sheetName => {
          // @ts-ignore
          rawData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
        })
        let info: StudentInfo[] = [];
        // console.log(rawData)

        rawData.forEach(person => {
          // console.log(person)
          let {"PART_ANAGRAFICHE ": disorder} = person;
          // /\[...\]/gmi
          const regex = /(?<=\[)(.*?)(?=])/gmi
          const found = disorder.match(regex) || []
          info.push({
            class: Number(person["CL "]),
            division: person["SEZ "],
            name: person["NOME "],
            surname: person["COGNOME "],
            fiscalCode: person["COD_FISC "],
            disorders: found
          })
        })

        if (info.length !== 0) {
          Vue.swal.fire({
            title: "Elebarazione studenti",
            html: "Elaborazione completata<br>Upload in corso...",
            icon: "info",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen() {
              Vue.swal.showLoading();
            }
          })
        } else {
          Vue.swal.fire({
            title: "Elaborazione studenti",
            text: "Elabarazione non riuscita",
            icon: "error",
            showConfirmButton: false,
            timer: 3000
          })
        }


        const result = await this.sendStudents(info);
        if(result.data.importStudents){
          Vue.swal.fire({
            title: "Upload studenti",
            text: "Upload completato",
            icon: "success",
            showConfirmButton: false,
            timer: 3000
          });
        }else{
          Vue.swal.fire({
            title: "Upload orario",
            html: "Upload non riuscito<br>Hai importato prima le relative classi?",
            icon: "error",
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
      reader.onerror = function (ex) {
        Vue.swal("Errore", "Errore nell'elaborazione del file", "error");
        console.log(ex);
      };
      reader.readAsBinaryString(file);

      console.log("Uploading studenti");
    }
  }
}
</script>
