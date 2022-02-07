<template>
  <div>LOGIN COMPLETATO - chiudi questa finestra</div>
</template>

<script>
export default {
  name: "auth-Complete",
  beforeMount() {
    const token = this.$route.query.token;
    localStorage.setItem("token", token);
    window.close();
  }
}
</script>
