<template>
  <div ref="viewerContainer">
    <div ref="viewer" class="pdfViewer"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer.js";
import * as pdfjsLib from "@/pdfjsLibWrapper";

const SimplePDFViewerProps = Vue.extend({
  props: {
    pdf: Blob
  }
});

@Component({})
export default class SimplePDFViewer extends SimplePDFViewerProps {
  $refs: {
    viewerContainer: HTMLDivElement,
    viewer: HTMLDivElement
  };
  mounted(){
    const SANDBOX_BUNDLE_SRC = "../../node_modules/pdfjs-dist/build/pdf.sandbox.js";


    const eventBus = new pdfjsViewer.EventBus();

    const pdfLinkService = new pdfjsViewer.PDFLinkService({
      eventBus,
    });

    // (Optionally) enable scripting support.
    const pdfScriptingManager = new pdfjsViewer.PDFScriptingManager({
      eventBus,
      sandboxBundleSrc: SANDBOX_BUNDLE_SRC,
    });

    const pdfViewer = new pdfjsViewer.PDFViewer({
      l10n: undefined, renderer: "canvas",
      container: this.$refs.viewerContainer,
      eventBus,
      linkService: pdfLinkService,
      scriptingManager: pdfScriptingManager
    });

    pdfLinkService.setViewer(pdfViewer);
    pdfScriptingManager.setViewer(pdfViewer);

    eventBus.on("pagesinit", function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = "page-width";
    });

    // Loading document.
    const loadingTask = pdfjsLib.getDocument({
      url: "https://www.orimi.com/pdf-test.pdf",
      withCredentials: false
    });
    (async function () {
      const pdfDocument = await loadingTask.promise;
      // Document loaded, specifying document for the viewer and
      // the (optional) linkService.
      pdfViewer.setDocument(pdfDocument);

      pdfLinkService.setDocument(pdfDocument, null);
    })();
  }
}
</script>

<style scoped>

</style>
