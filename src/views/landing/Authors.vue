<template>
<div>

</div>
</template>

<script>
export default {
  name: "Authors",
  data: ()=> {
    return{
      authors: [
        {
          image: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          name: "Lorenzo",
          lastname: "Rizzotti",
          nickname: 'DreamingCodes',
          class: "3C-IA",
          website: "https://dreaming.codes",
          chips: [
            {
              color: 'blue',
              text: 'Sognante',
              icon: 'mdi-bed'
            }
          ]
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>
