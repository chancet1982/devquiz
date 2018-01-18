<template>
  <v-app>
    <v-content>
      <v-container class="text-xs-center">
        <img src="./Assets/Logo.png" />
        <router-view />
      </v-container>
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