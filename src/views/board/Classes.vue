<template>
  <v-container class="fill-height pa-0" fluid>
    <v-card color="other" elevation="12" width="100%">
      <v-data-table :headers="tableHeaders" :items="getClasses.flat().students" class="other">
        <template v-slot:top>
          <v-text-field append-icon="mdi-magnify" class="mx-4"></v-text-field>
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
    getClasses: {
      query: gql`
        query getClasses {
          getClasses {
            class,
            division,
            students {
                name,
                surname
            }
          }

        }
        `
    }
  },
  mounted() {
    console.log(this.getClasses.flat());
  },
  data(){
    return {
      tableHeaders: [
        {
          text: "Name",
          value: "name",
          sortable: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
