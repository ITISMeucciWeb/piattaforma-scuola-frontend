<template>
  <v-container fluid class="fill-height pa-0">
    <v-card width="100%" elevation="12" color="other">
      <v-data-table class="other" virt :server-items-length="studentsCount" :items-per-page="15"></v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">


import gql from "graphql-tag";

export default {
  name: "Students-list",
  apollo: {
    studentiCount: {
      query: gql`query {getStudentsCount}`,
      subscribeToMore: {
        document: gql`
          subscription {
            studentsCount
          }`,
        updateQuery: (prev, {subscriptionData}) => {
          return {getStudentsCount: subscriptionData.data.studentsCount}
        }
      },

      update(data: any) {
        this.studentsCount = data.getStudentsCount;
      }
    },
  },
  data() {
    return {
      studentsCount: 0,
    };
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
