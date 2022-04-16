<template>
  <v-card class="other" tile>
    <v-toolbar
        dark
    >
      <v-spacer/>
      <v-btn
          dark
          icon
          @click="$emit('close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <SimplePDFViewer ></SimplePDFViewer>
    </v-content>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import gql from "graphql-tag";
import SimplePDFViewer from "@/components/PDP/SimplePDFViewer.vue";


const FillModelProps = Vue.extend({
  props: {
    user: Object
  },
});

@Component({
  components: {
    SimplePDFViewer
  }
})
export default class FillModel extends FillModelProps {
  async mounted() {


    console.log(this.user._id);
    this.$apollo.query({
      query: gql`
        query getStudent($_id: String!) {
           getStudent(id: $_id) {
              _id
              name
          }
        }
      `,
      variables: {
        _id: this.user._id
      }
    })
    const data = this.$apollo.query({
      query: gql`
        query getDisorder {
           getDisorder(id: "6253be03272c92ffb31f733d") {
              _id
          }
        }
      `
    })
    console.log(await data);
  }
}
</script>

<style scoped>

</style>
