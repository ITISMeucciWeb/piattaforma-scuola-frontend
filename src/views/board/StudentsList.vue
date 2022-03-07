<template>
  <v-container fluid class="fill-height pa-0">
    <v-card width="100%" elevation="12" color="other">
      <v-data-table class="other" virt :items="students" :items-per-page="15"></v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">


import gql from "graphql-tag";

export default {
  name: "Students-list",
  apollo: {
    students: {
      query: gql`
        query getUsersByName($from: Int, $limit: Int, $nameSearch: String!){
          getUsersByName(from: $from, limit: $limit, nameSearch: $nameSearch){
          name
          surname
          }
        }`,
      variables() {
        return {
          from: this.from,
          limit: this.limit,
          nameSearch: this.nameSearch
        };
      },
    }
  },
  data() {
    return {
      nameSearch: "",
      limit: 15,
      from: 0,
    };
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
