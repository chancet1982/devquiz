<template>
  <v-container fluid class="fill-height bg--graphics">
    <v-layout column align-center transition="slide-x-transition">
      <v-flex xs12 class="text-md-center pt-1 flex-0">
        <img src="../assets/logo-white.svg" height="150" width="200" />        
      </v-flex>
      <v-container fluid class="fill-height">
        <v-layout column align-center>
        <v-flex xs12 class="text-md-center">
          <v-card color="green" class="pa-5">
            <v-card-title class="text-md-center">
              <h3 class="headline white--text cardTitle mb-0">Answer and win a Raspbarry Pi</h3>
            </v-card-title>
            <v-card-text>
              <div class="white--text text-md-center">
                Clicking the button below you'll be presented with some JavaScript code. <br/>
                The fastest to answer correctly wins a new Raspbarry Pi<br/>
              </div>
              <div class="text-md-center pt-4">
                <v-btn color="white" round @click="start()">Got it, lets go</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
  import VEmbed from 'vue-embed'

  export default {
    name: 'Welcome',
    components: {
      VEmbed
    },
    mounted() {
      this.quizResults = this.$localStorage.get('currentResults');
    },
    localStorage: {
      currentResults: {
        type: Array,
      },
    },
    computed: {
      showSnackbar(){
        return this.snackbarContent.length > 0;
      },
      isAnswerCorrect() {
        let reg;
        switch (this.gist) {
          case 1:
            reg = /341325/;
            break;
          case 2:
            reg = /341325/; //TODO fix
            break;
          case 3:
            reg = /341325/; //TODO fix
            break;                    
          default:
            console.error("NOT A VALID GIST!");
        }
        
        return this.answer.replace(/\s|,|[|]/g,'').match(reg) ? true : false;
      },
      isNameValid() {
        return this.rules.required(this.name) && this.rules.name(this.name)
      },
      isEmailValid() {
        return this.rules.required(this.email) && this.rules.email(this.email)
      },
      isAnswerValid() {
        return this.rules.required(this.answer) && this.rules.answer(this.answer)
      },
      isFormValid() {
        return typeof this.isNameValid !== "string" && typeof this.isEmailValid !== "string" && typeof this.isAnswerValid !== "string";
      },
      payload() {
        return {
          name: this.name,
          email: this.email,
          answer: this.answer,
          isAnswerCorrect: this.isAnswerCorrect,
          timeLeft: this.countdown,
        }
      }
    },
    methods: {
      start() {
        this.$router.push("/start");
      },
    },
    data() {
      return {
    
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-0 {
  flex:0;
}

.bg--graphics {
  background: url("../assets/rp3.jpg");
  background-repeat: no-repeat;
  background-position: left top;
  background-attachment: fixed;
  background-size: cover;
}
</style>
