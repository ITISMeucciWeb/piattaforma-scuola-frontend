<template>
  <v-container fluid class="fill-height pa-0">
    <v-card width="100%" elevation="12" color="other">
      <v-data-table :headers="disorderHeaders" ref="dataTable" class="other" :items="getDisordersList">
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
                color="primary"
                dark
                class="mb-2"
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
    getDisordersList: gql`query getDisordersList{getDisordersList{_id, name, description}}`,
  },
  data: () => ({
    disorderHeaders: [
      { text: "Nome", value: "name" },
      { text: "Descrizione", value: "description" },
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
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false },
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
