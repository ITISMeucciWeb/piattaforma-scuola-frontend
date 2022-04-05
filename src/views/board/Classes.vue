<template>
  <v-container class="fill-height pa-0" fluid>
    <v-card color="other" elevation="12" width="100%">
      <v-data-table :search="searchFor" :headers="tableHeaders" :items="getMyStudents" class="other">
        <template v-slot:top>
          <v-text-field v-model="searchFor" append-icon="mdi-magnify" class="mx-4"></v-text-field>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Classes",
  apollo: {
    getMyStudents: {
      query: gql`
        query getMyStudents {
          getMyStudents {
            class,
            division,
            name,
            surname
          }

        }
        `
    }
  },
  data(){
    return {
      searchFor: "",
      tableHeaders: [
        {
          text: "Name",
          value: "name",
          sortable: true
        },
        {
          text: "Surname",
          value: "surname",
          sortable: true
        },
        {
          text: "Class",
          value: "class",
          sortable: true
        },
        {
          text: "Division",
          value: "division",
          sortable: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
