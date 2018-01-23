<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex xs12>
          <v-card class="pa-5">
            <v-card-title>
              <h3 class="headline text-md-center">Thank you for your answer</h3>
            </v-card-title>
            <v-card-text class="text-md-center">
              <p>Redirecting in {{this.counter}}</p>
              <v-btn color="secondary" round replace to="/">Cant wait</v-btn>
            </v-card-text>
          </v-card>
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
