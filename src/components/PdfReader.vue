<template>
  <div id="pageContainer">
    <div id="viewer" class="pdfViewer"></div>
  </div>
</template>

<script>
import pdfjsLib from "pdfjs-dist/webpack";
import { PDFViewer } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";

export default {
  name: "PdfViewer",
  props: { docPath: String },
  mounted() {
    this.getPdf();
  },
  methods: {
    async getPdf() {
      let container = document.getElementById("pageContainer");
      let pdfViewer = new PDFViewer({
        container: container,
      });
      let pdf = await pdfjsLib.getDocument(this.docPath);
      pdfViewer.setDocument(pdf);
    },
  },
};
</script>

<style>
#pageContainer {
  margin: auto;
  width: 80%;
}

div.page {
  display: inline-block;
}
</style>
