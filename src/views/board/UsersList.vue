<template>
  <v-container fluid class="fill-height pa-0">
    <v-card width="100%" elevation="12" color="other">
      <v-data-table ref="dataTable" class="other" virt :headers="tableHeaders" v-on:update:options="changeOptions"
                    :page.sync="page"
                    :footer-props="{
                      'items-per-page-options': [5, 10, 15, 20]
                    }"
                    :items="getUsersByName.users" :items-per-page="15" :server-items-length="getUsersByName.count">
        <template v-slot:top>
          <v-text-field @keydown="prepareForSearch" v-model="nameSearch" class="mx-4" append-icon="mdi-magnify"></v-text-field>
        </template>
        <template v-slot:[`item.hasDisorders`]="{ item }">
          <v-icon>
            {{ item.hasDisorders ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline" }}
          </v-icon>
        </template>
        <template v-slot:[`item.avatar`]="{ item }">
          <v-img contain :height="50" :width="50" class="rounded-circle" v-if="item.avatar" :src="item.avatar"></v-img>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">


import gql from "graphql-tag";

export default {
  name: "Users-list",
  apollo: {
    getUsersByName: {
      query: gql`
        query getUsersByName($from: Int, $limit: Int, $nameSearch: String!){
          getUsersByName(from: $from, limit: $limit, nameSearch: $nameSearch){
            count
            users {
              _id
              avatar
              name
              surname
              class
              division
              role
              hasDisorders
              fiscalCode
              email
            }
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
      page: 1,
      tableHeaders: [
        {
          text: "Db   Id",
          value: "_id",
          sortable: false,
        },
        {
          text: "Avatar",
          value: "avatar",
          sortable: false,
        },
        {
          text: "Nome",
          value: "name",
          sortable: false,
        },
        {
          text: "Cognome",
          value: "surname",
          sortable: false,
        },
        {
          text: "Codice fiscale",
          value: "fiscalCode",
          sortable: false,
        },
        {
          text: "Email",
          value: "email",
          sortable: false,
        },
        {
          text: "Ruolo",
          value: "role",
          sortable: false,
        },
        {
          text: "Ha disorders",
          value: "hasDisorders",
          sortable: false,
        },
        {
          text: "Classe",
          value: "class",
          sortable: false,
        },
        {
          text: "Sezione",
          value: "division",
          sortable: false,
        }
      ]
    };
  },
  methods: {
    logData(data){
      console.log(data);
    },
    prepareForSearch() {
      this.page = 1;
      console.log("sdsa", this.page);
    },
    changeOptions(options: any){
      this.from = (options.page - 1) * options.itemsPerPage;
      this.limit = options.itemsPerPage;
    }
  }
}
</script>

<style scoped>

</style>
