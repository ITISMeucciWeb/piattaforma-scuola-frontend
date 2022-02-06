<template>
  <div></div>
</template>

<script lang="ts">
import {PDFDocument} from "pdf-lib";

export default {
  name: "PDFFormsBuilder",
  props: {
    pdf: PDFDocument
  },
  methods: {
    async addPage(){
      this.pdf.addPage().drawEllipse();

      await this.updatePDF();
    }
  },
  async beforeMount() {
    if(!this.pdf){
      this.pdf = await PDFDocument.create();
    }

    //await this.updatePDF();
  }
}
</script>

<style scoped>

</style>
