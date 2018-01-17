<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>Enter your answer below</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="answer"
              label="And the answer is..."
              id="answer"
              required
              v-model="answer"
              :rules="[rules.required, rules.answer]"
            ></v-text-field>
          </v-flex>        
          <v-flex xs4>
            <v-subheader>Your name?</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="name"
              label="your name?"
              id="name"
              required
              v-model="name"
              :rules="[rules.required, rules.name]"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-subheader>Email address</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="email"
              label="Email address"
              id="email"
              required
              v-model="email"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn :disabled="!this.isFormValid" color="success" @click="saveAnswer()">Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import { required, between } from 'vuelidate/lib/validators'
  export default {
    name: 'Welcome',
    mounted() {
      console.log(this.$localStorage.get('currentResults'));
      //this.$localStorage.remove('currentResults');
    },
    localStorage: {
      currentResults: {
        type: Object,
      },
    },
    computed: {
      isAnswerCorrect() {
        const reg = /1,2,3,4,5,6/;
        return this.answer.replace(/\s/g,'').match(reg) ? true : false;
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
          isAnswerCorrect: this.isAnswerCorrect
        }
      }
    },
    methods: {
      saveAnswer() {
        if (this.isMailUsed() == false) {
          this.$localStorage.set('currentResults', this.payload);
          this.$router.replace("/thanks");
        } else {
          console.log("You can only submit your answer once ",this.$localStorage.get('currentResults'))
          //TODO change to snakebar
        }
      },
      isMailUsed() {
        const currentResultsObject = this.$localStorage.get('currentResults');
        return currentResultsObject !== null /*&& currentResultsObject.findIndex(entry => entry.email === this.email) !== -1 ? true : false;*/

        //TODO fix this validation...
      },
    },
    data() {
      return {
        name: '',
        email: '',
        answer: '',
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          answer:(value) => value.length > 1 || 'Answer cannot be empty',
          name:(value) => value.length > 5 && value.length < 50 || 'Name must be between 5 to 50 chars'
        }        
      }
    },
    /*validations: {
      name: {
        between: between(5, 50)
      },
      email: {
        required,
      },
      answer: {
        required,
        minLength: minLength(1)
      },      
    }, */   

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
