<template>
  <v-container fluid class="fill-height pa-0">
    <v-card width="100%" height="500" elevation="12" color="other" @dragenter.prevent @dragover.prevent @drop.prevent="handleModelDrop">
      <PDFFormsBuilder></PDFFormsBuilder>
    </v-card>

  </v-container>
</template>

<script lang="ts">
import {PDFDocument} from "pdf-lib";
import PDFFormsBuilder from "@/components/PDFFormsBuilder.vue";

export default {
  name: "Modelli-admin",
  components: {PDFFormsBuilder},
  methods: {
    async handleModelDrop(e: DragEvent) {
      //const test = await PDFDocument.load(await e.dataTransfer.files[0].arrayBuffer());
    }
  }
}
</script>

<style scoped>

</style>
