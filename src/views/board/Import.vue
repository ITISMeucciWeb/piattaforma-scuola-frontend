<template>
  <v-container class="fill-height pa-0" fluid>
    <v-col v-for="(upload, index) in uploadsType" :key="index">
      <input ref="fileHandler" :accept="upload.fileType" class="d-none" type="file" @change="upload.handler">
      <v-card elevation="6" @dragenter.prevent @dragover.prevent @drop.prevent="upload.handler">
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

<script>
function getFileFromEvent(event) {
  if(event.type === 'drop'){
    return event.dataTransfer.files[0];
  }else{
    return event.target.files[0];
  }
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
    openFileHandler(index) {
      this.$refs.fileHandler[index].click();
    },
    orarioHandler(e) {
      let file = getFileFromEvent(e);
      if (!this.uploadsType[0].fileType.split(",").includes("." + file.name.split(".")[1])) {
        this.$swal("Errore", "Tipo di file non valido, TIPI VALIDI:" + this.uploadsType[1].fileType, "error");
        return;
      }
      console.log("Uploading orario");
    },
    studentiHandler(e) {
      let file = getFileFromEvent(e);

      if (!this.uploadsType[1].fileType.split(",").includes("." + file.name.split(".")[1])) {
        this.$swal("Errore", "Tipo di file non valido, TIPI VALIDI:" + this.uploadsType[1].fileType, "error");
        return;
      }
      console.log("Uploading studenti");
    }
  }
}
</script>
