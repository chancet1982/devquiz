<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex xs8>
          <v-subheader>Thank you for answering</v-subheader>
          <v-subheader>Redirecting in {{this.counter}}</v-subheader>
        </v-flex>
        <v-flex>
          <v-btn color="info" replace to="/">Cant wait</v-btn>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    name: 'Thanks',
    mounted() {
      setTimeout( () => {
        console.log("I should be redirecting back now...");
        this.$router.push('/');
      }, 5000)
      setInterval(() => {
        if (this.counter == 1) {
          return null;
        }
        this.counter --;
      },
      1000)
    },
    data() {
      return {
        counter : 5,
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
