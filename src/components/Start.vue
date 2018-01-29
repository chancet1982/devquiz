<template>
  <v-container fluid fill-height class="bg--graphics">>
    <v-layout row wrap transition="slide-x-transition">
      <v-flex xs12 v-show="countdown !== 0">
        <VEmbed id="gist1" v-if="gist === 1" :options="{ emoji: false }">
          <p>https://gist.github.com/chancet1982/3619681e6305c50ed01fab709f6ab8d3.js</p>
        </VEmbed>
        <VEmbed id="gist2" v-else-if="gist === 2" :options="{ emoji: false }">
          <p>https://gist.github.com/chancet1982/e6bb491cfb4602198acb6c35f76aee7d.js</p>
        </VEmbed>
        <VEmbed id="gist3" v-else :options="{ emoji: false }">
          <p>https://gist.github.com/chancet1982/2f8541854ea583cb7d558846a9039de2.js</p>
        </VEmbed>
      </v-flex>
      <v-flex xs12 v-if="countdown > 0">
        <v-stepper v-model="stepper">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="this.answer !== ''">Your answer</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="this.isFormValid">Your details</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card color="white" class="mb-5" height="200px">
                  <v-layout row align-center>
                    <v-flex xs8>
                      <v-text-field
                        name="answer"
                        label="What is the output?"
                        hint="write the values separated by commas"
                        id="answer"
                        required
                        v-model="answer"
                        ref="answer"
                        :disabled="countdown === 0"
                        :rules="[rules.required, rules.answer]"
                        @keyup.enter="stepper = 2"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 class="text-xs-center">
                      <v-progress-circular
                        v-bind:size="150"
                        v-bind:width="15"
                        v-bind:rotate="270"
                        v-bind:value="countdown"
                        :color="getCountdownColor()"
                      >
                        {{countdown}}
                      </v-progress-circular>              
                    </v-flex>
                  </v-layout>
              </v-card>
              <v-btn round :disabled="this.answer === ''" color="primary" @click.native="stepper = 2">Continue</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card color="white" class="mb-5" height="200px">
                  <v-text-field
                    name="name"
                    label="Your name?"
                    id="name"
                    required
                    v-model="name"
                    :rules="[rules.required, rules.name]"
                  ></v-text-field>
                  <v-text-field
                    name="email"
                    label="Email address"
                    id="email"
                    required
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>            
                  <v-alert :type="snackbarType" :value="showSnackbar" transition="scale-transition">
                    {{snackbarContent}}
                  </v-alert>
              </v-card>
              <v-btn round :disabled="!this.isFormValid" color="success" @click="submit()">Submit</v-btn>                  
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>          
      </v-flex>
      <v-flex xs6 offset-xs3 v-else class="text-md-center">
        <v-card class="text-md-center red white--text">
          <v-card-text>
            {{countdown}}
            Time is up, good luck next time
            <div class="text-md-center pt-4">
              <v-btn round to="/">Go back...</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import VEmbed from 'vue-embed'

  export default {
    name: 'Start',
    components: {
      VEmbed
    },
    mounted() {
      this.quizResults = this.$localStorage.get('currentResults');
      setTimeout(() => {
        this.startCountdown();
        this.$refs.answer.focus();
      }, 1000);
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
      expectedAnswer() {
        switch (this.gist) {
          case 1:
            return "341325";
          case 2:
            return "124523"; 
          case 3:
            return "687985"; 
        }
      },
      isAnswerCorrect() {
        const reg = new RegExp(this.expectedAnswer);
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
          expectedAnswer: this.expectedAnswer,
          isAnswerCorrect: this.isAnswerCorrect,
          timeLeft: this.countdown,
        }
      }
    },
    methods: {
      getCountdownColor() {
        return this.countdown > 50 ? "green" : this.countdown > 25 ? "yellow" : "error";
      },
      getRand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      },
      startCountdown() {
        setInterval(() => {
          if (this.countdown === 0 || this.stepper === 2) {
            return null;
          }
          this.countdown --;
        }, 600);
      },
      submit() {
        if (this.isMailUsed() == false) {
          this.quizResults.push(this.payload);
          this.$localStorage.set('currentResults', this.quizResults);
          this.$router.replace("/thanks");
        } else {
          this.setSnackbar("error", "Email already used");
        }
      },
      isMailUsed() {
        return this.quizResults.findIndex(entry => entry.email === this.email) !== -1 ? true : false;
      },
      setSnackbar(type, message) {
        this.snackbarType = type;
        this.snackbarContent = message;
        setTimeout(() => {
          this.snackbarContent = ""
        },5000)
      },
    },
    data() {
      return {
        name: '',
        email: '',
        answer: '',
        snackbarContent: '',
        quizResults: [],
        countdown: 100,
        snackbarType: "error",
        stepper: 1,
        gist: this.getRand(1,4),
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          answer:(value) => value.length > 1 || 'Hint: The answer is longer than that',
          name:(value) => value.length > 5 && value.length < 50 || 'Name must be between 5 to 50 chars'
        }        
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#gist1,
#gist2,
#gist3{
  height:250px;
}
#gist1 > p,
#gist2 > p,
#gist3 > p {
  display:none;
}

.cardTitle {
  display: block;
  width: 100%;
}

.bg--graphics {
  background: url("../assets/rp3.jpg");
  background-repeat: no-repeat;
  background-position: left top;
  background-attachment: fixed;
  background-size: cover;
}
</style>
