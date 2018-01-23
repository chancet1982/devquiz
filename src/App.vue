<template>
  <v-app>
    <v-content>
      <v-container fluid class="fill-height primary">
        <v-layout row wrap>
          <v-flex xs12 class="text-md-center pt-1"><img src="./Assets/Logo.png" /></v-flex>
          <v-flex xs12><router-view /></v-flex>
        </v-layout>
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