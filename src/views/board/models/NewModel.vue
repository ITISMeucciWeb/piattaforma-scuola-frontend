<template>
  <v-container class="fill-height pa-0" fluid>
    <v-card elevation="12" width="100%">
      <div class="mx-3 mt-4">
        <v-text-field v-model="name" class="" label="Nome"></v-text-field>
        <v-textarea v-model="description" height="5%" label="Descrizione"></v-textarea>
        <input ref="fileHandler" accept="application/pdf" class="d-none" type="file" @change="pdfLoader">
        <v-card v-if="!file" class="mx-auto mt-3" color="other" elevation="6" min-height="200" @dragenter.prevent
                @dragover.prevent @drop.prevent="pdfLoader">
          <v-card-actions class="justify-center fill-height">
            <v-icon class="mt-8" size="120" @click="openFileHandler">mdi-cloud-upload</v-icon>
          </v-card-actions>
        </v-card>
        <editor v-else ref="editor" :pdf="file" style="width: 100%"></editor>
      </div>
      <v-card-actions>
        <v-spacer/>
        <v-btn :disabled="loading" color="error" text @click="$router.push('/board/models')">Annulla</v-btn>
        <v-btn :loading="loading" color="accent" text @click="saveModel">Salva</v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script lang="ts">
import Editor from "./Editor.vue";
import Component from "vue-class-component";
import Vue from "vue";
import gql from "graphql-tag";

function getFileFromEvent(event) {
  if (event.type === 'drop') {
    return event.dataTransfer.files[0];
  } else {
    return event.target.files[0];
  }
}

@Component({
  components: {
    Editor
  }
})
export default class NewModel extends Vue {
  file = null;
  name = "";
  description = "";

  loading = false;

  $refs!: {
    fileHandler: HTMLInputElement,
    editor: Editor
  }

  openFileHandler() {
    this.$refs.fileHandler.click()
  }

  pdfLoader(event) {
    this.file = event.target.files[0];
  }

  async saveModel() {
    this.loading = true;
    await this.$apollo.mutate({
      mutation: gql`mutation newDisorder($modelDocument: Disorder!, $pdfFile: Upload!){newDisorder(disorderDocument: $modelDocument, pdf: $pdfFile)}`,
      variables: {
        modelDocument: {
          name: this.name,
          description: this.description
        },
        pdfFile: new Blob([await this.$refs.editor.getPDF()], {
          type: "application/pdf"
        })
      },
    })

    this.$router.push('/board/models')
  }
}
</script>

<style scoped>

</style>
