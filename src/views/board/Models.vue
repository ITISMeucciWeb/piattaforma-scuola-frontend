<template>
  <v-container class="fill-height pa-0" fluid>
    <v-card color="other" elevation="12" width="100%">
      <v-data-table ref="dataTable" :headers="disorderHeaders" :items="getDisordersList" class="other">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Disorders</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-btn
                class="mb-2"
                color="primary"
                dark
                to="/board/models/new"
            >
              Nuovo
            </v-btn>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import gql from "graphql-tag";

export default {
  name: "Modelli-admin",
  apollo: {
    getDisordersList: {
      query: gql`query getDisordersList{getDisordersList{_id, name, description}}`,
      fetchPolicy: "no-cache"
    },
  },
  data: () => ({
    disorderHeaders: [
      {text: "Nome", value: "name"},
      {text: "Descrizione", value: "description"},
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Calories', value: 'calories'},
      {text: 'Fat (g)', value: 'fat'},
      {text: 'Carbs (g)', value: 'carbs'},
      {text: 'Protein (g)', value: 'protein'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  })
}
</script>

<style scoped>

</style>
