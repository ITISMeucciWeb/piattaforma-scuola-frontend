<template>
  <v-container fluid class="fill-height pa-0">
    <v-card width="100%" elevation="12">
      <div class="mx-3 mt-4">
        <v-text-field class="" label="Nome"></v-text-field>
        <v-textarea  height="5%" label="Descrizione"></v-textarea>
        <input ref="fileHandler" accept="application/pdf" class="d-none" type="file" @change="pdfLoader">
        <v-card min-height="200" color="other" class="mx-auto mt-3" v-if="!file" elevation="6" @dragenter.prevent @dragover.prevent @drop.prevent="pdfLoader">
          <v-card-actions class="justify-center fill-height">
            <v-icon class="mt-8" size="120" @click="openFileHandler">mdi-cloud-upload</v-icon>
          </v-card-actions>
        </v-card>
        <viewer ref="viewer" v-else style="width: 100%" :pdf="file"></viewer>
      </div>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat color="error" @click="$router.push('/board/models')">Annulla</v-btn>
        <v-btn flat color="accent" @click="$router.push('/board/models')">Salva</v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
import {fabric} from "fabric";
import {Viewer} from "@dreaming-codes/vue-dreaming-pdf"

function getFileFromEvent(event) {
  if (event.type === 'drop') {
    return event.dataTransfer.files[0];
  } else {
    return event.target.files[0];
  }
}

export default {
  name: "new",
  components: {
    Viewer
  },

  methods: {
    openFileHandler(){
      this.$refs.fileHandler.click()
    },
    pdfLoader(event){
      this.file = event.target.files[0];
    },
    async renderPDF(event) {
      this.file = event.target.files[0];
    },
    spawnText(){
      const fieldToSpawn = {
        id: "ID: " + Date.now().toExponential(),
        type: 0,
        fabricEntity: new fabric.Text("Hello World", {
          opacity: 0.5,
          backgroundColor: "blue",
          fill: "yellow",
          width: 200,
          height: 100,
          lockRotation: true,
          lockScalingFlip: true,
        })
      }

      this.$refs.viewer.addField(fieldToSpawn)
    },
    nextPage(){
      this.$refs.viewer.setPage(this.$refs.viewer.currentPage + 1);
    },
    previusPage(){
      this.$refs.viewer.setPage(this.$refs.viewer.currentPage - 1);
    },
    exportPDF(){
      this.$refs.viewer.exportToPDF()
    },
  },
  data() {
    return {
      file: null
    };
  }
}
</script>

<style scoped>

</style>
