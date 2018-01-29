<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'devQuiz'
    }
  },
}
</script>

<style scoped>

</style>