<template>
  <v-container>
    <v-row>
      <v-col>
        <v-app>
          <viewer ref="viewer" :pdf="pdf"></viewer>
          <v-footer absolute>
            <v-spacer/>
            <v-icon @click="previusPage" class="mr-3">mdi-arrow-left-circle</v-icon>
            <v-icon @click="nextPage">mdi-arrow-right-circle</v-icon>
          </v-footer>
        </v-app>
      </v-col>
      <v-col>
        <v-card v-for="(field, key) in fields" v-bind:key="key">
          <v-card-title>{{field.title}}</v-card-title>
          <v-card-subtitle>{{field.type}}</v-card-subtitle>
          <v-card-actions>
            <v-btn>PORTA IN QUESTA PAGINA</v-btn>
            <v-btn>PORTAMI ALLA PAGINA</v-btn>
            <v-btn color="error">RIMUOVI</v-btn>
          </v-card-actions>
        </v-card>
        <v-btn width="100%" color="accent2">NUOVO FIELD</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {fabric} from "fabric";
import {Viewer} from "vue-dreaming-pdf"

export default {
  name: "editor",
  components: {
    Viewer
  },
  data() {
    return {
      fields: []
    }
  },
  methods: {
    spawnText() {
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
    nextPage() {
      this.$refs.viewer.setPage(this.$refs.viewer.currentPage + 1);
    },
    previusPage() {
      this.$refs.viewer.setPage(this.$refs.viewer.currentPage - 1);
    },
    exportPDF() {
      this.$refs.viewer.exportToPDF()
    },
  },
  props: {
    pdf: {
      type: Blob,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
