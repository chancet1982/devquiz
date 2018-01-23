<template>
  <v-container fluid>
    <v-container fluid fill-height>
      <v-layout column wrap v-show="answering" transition="slide-x-transition">
        <v-flex xs12 v-show="countdown !== 0">
          <VEmbed id="gist" :options="{ emoji: false }">
            <p>https://gist.github.com/chancet1982/6b79e2bde10ce599e59db109c2920519.js</p>
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
        <v-flex xs12 v-else class="text-md-center">
          Time is up.
        </v-flex>
      </v-layout>
      <v-layout column wrap v-show="!answering" align-center transition="slide-x-transition">
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
      </v-layout>
    </v-container>
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
        const reg = /341325/;
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
      getCountdownColor() {
        return this.countdown > 50 ? "green" : this.countdown > 25 ? "yellow" : "error";
      },
      start() {
        this.answering = true;
        setTimeout(() => {
          this.startCountdown();
          this.$refs.answer.focus();
        }, 1000);
      },
      startCountdown() {
        setInterval(() => {
          if (this.countdown === 0 || this.stepper === 2) {
            return null;
          }
          this.countdown --;
        }, 100);
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
        answering: false,
        name: '',
        email: '',
        answer: '',
        snackbarContent: '',
        quizResults: [],
        countdown: 100,
        snackbarType: "error",
        stepper: 1,
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
#gist {
  height:250px;
}
#gist > p {
  display:none;
}

.cardTitle {
  display: block;
  width: 100%;
}
</style>
