<template>
  <div>LOGIN COMPLETATO - chiudi questa finestra</div>
</template>

<script>
export default {
  name: "authComplete",
  beforeMount() {
    window.close();
  }
}
</script>

<style scoped>

</style>
