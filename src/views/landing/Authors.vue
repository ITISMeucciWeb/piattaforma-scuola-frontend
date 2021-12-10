<template>
  <v-container class="fill-height" fluid>
    <v-row dense>
      <v-row dense>
        <v-col
            v-for="author in authors"
            :key="author.nickname"
            class="d-flex"
            style="flex-direction: column"
        >
          <v-card class="flex-grow-1 d-flex" elevation="6" outlined style="flex-direction: column">
            <v-img
                :src="author.image"
                class="flex-grow-0"
                height="50%"
            />
            <v-card-title><p>{{ author.name }}</p></v-card-title>
            <v-card-subtitle v-if="author.website"><a :href="author.website" target="_blank">{{ author.website }}</a>
            </v-card-subtitle>
            <v-card-text class="flex-grow-1">
              {{ author.nickname }}<br>
              {{ author.class }}
            </v-card-text>
            <v-card-text>
              <v-chip v-for="chip in author.chips" v-bind:key="chip.text" :color="chip.color" class="mr-3 pr-4 mb-3">
                <v-icon style="margin-right: 3%">{{ chip.icon }}</v-icon>
                {{ chip.text }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Authors",
  data: () => {
    return {
      authors: [
        {
          image: require("@/assets/authors/DreamingCodes.gif"),
          name: "Lorenzo Rizzotti",
          nickname: 'DreamingCodes',
          class: "3C-IA",
          website: "https://dreaming.codes",
          chips: [
            {
              color: 'blue',
              text: 'Sognante',
              icon: 'mdi-weather-night'
            },
            {
              color: '#F213DB',
              text: 'Programmatore',
              icon: 'mdi-cube'
            }
          ]
        },
        {
          image: 'https://picsum.photos/400/400?random=2',
          name: "Lorenzo Melone",
          nickname: 'Melons',
          class: "5B-IA",
          chips: [
            {
              color: 'green',
              text: 'Gamer',
              icon: 'mdi-controller-classic'
            }
          ]
        },
        {
          image: 'https://picsum.photos/400/400?random=3',
          name: "Tommaso Bianchi",
          nickname: 'Bianchi',
          class: "5B-IA",
          chips: [
            {
              color: '#F213DB',
              text: 'Programmatore',
              icon: 'mdi-cube'
            }
          ]
        },
      ],
    }
  }
}
</script>

<style scoped>
p {
  white-space: nowrap;
}
</style>
