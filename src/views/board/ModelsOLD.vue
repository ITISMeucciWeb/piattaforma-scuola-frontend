<template>
  <v-container fluid class="fill-height pa-0">
    <v-card width="100%" height="500" elevation="12" color="other" @dragenter.prevent @dragover.prevent @drop.prevent="handleModelDrop">
      <input v-if="!file" type="file" accept="application/pdf" @change="renderPDF">
      <button @click="spawnText">SPAWN TEXT</button>
      <button @click="previusPage">PREVIUS PAGE</button>
      <button @click="nextPage">NEXT PAGE</button>
      <button @click="exportPDF">EXPORT PDF</button>
      <viewer ref="viewer" v-if="file" style="height: 90%; width: 100%" :pdf="file"></viewer>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Viewer} from "@dreaming-codes/vue-dreaming-pdf";

import {fabric} from "fabric";
export default {
  name: "Modelli-admin",
  components: {
    Viewer
  },
  methods: {
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
