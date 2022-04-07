<template>
  <v-container class="fill-height pa-0" fluid>
    <v-card color="other" elevation="12" width="100%">
      <v-data-table :headers="tableHeaders" :items="getMyStudents" :search="searchFor" class="other" multi-sort>
        <template v-slot:top>
          <v-text-field v-model="searchFor" append-icon="mdi-magnify" class="mx-4"></v-text-field>
        </template>
        <template v-slot:[`item.hasDisorders`]="{ item }">
          <v-icon>
            {{ item.hasDisorders ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline" }}
          </v-icon>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              class="mr-2"
              @click="compileItem(item)"
          >
            mdi-card-account-details
          </v-icon>
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
            _id,
            class,
            division,
            name,
            surname,
            hasDisorders
          }

        }
        `
    }
  },
  data() {
    return {
      searchFor: "",
      getMyStudents: [],
      tableHeaders: [
        {
          text: "ID",
          sortable: false,
          value: "_id"
        },
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
        },
        {
          text: "Disorders",
          value: "hasDisorders",
          sortable: true
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
