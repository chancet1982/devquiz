<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex xs12>
          <v-card color="white" class="mb-5">
            <v-card-title>
              <h3 class="headline mb-0">Look at the awesome results we've got!</h3>
            </v-card-title>
            <v-card-text>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
                ref="search"
              ></v-text-field>
              <v-data-table
                  v-bind:headers="headers"
                  v-bind:items="quizResults"
                  v-bind:search="search"
                >
                <template slot="items" slot-scope="props">
                  <td :class="{ correct: props.item.isAnswerCorrect}">{{ props.item.name }}</td>
                  <td :class="{ correct: props.item.isAnswerCorrect}">{{ props.item.email }}</td>
                  <td :class="{ correct: props.item.isAnswerCorrect}">{{ props.item.answer }}</td>
                  <td :class="{ correct: props.item.isAnswerCorrect}"><v-icon v-if="props.item.isAnswerCorrect" color="green">check</v-icon> <v-icon v-else color="red">clear</v-icon></td>
                  <td :class="{ correct: props.item.isAnswerCorrect}">{{ props.item.timeLeft }}</td>
                  <td :class="{ correct: props.item.isAnswerCorrect}">
                    <v-btn icon class="mx-0" @click="deleteItem(props.index)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                  </td>
                </template>
                <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                  From {{ pageStart }} to {{ pageStop }}
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    name: 'Results',
    mounted() {
      this.quizResults = this.$localStorage.get('currentResults');
      this.$refs.search.focus();
    },
    localStorage: {
      currentResults: {
        type: Array,
      },
    },    
    methods: {
      deleteItem(index) {
        this.quizResults.splice(index, 1);
        this.$localStorage.set('currentResults', this.quizResults);
      },
    },
    data() {
      return {
        search: '',
        headers: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Email', value: 'email', align: 'left' },
          { text: 'Answer ', value: 'answer', align: 'left' },
          { text: 'Answered correctly?', value: 'iscorrect', align: 'left' },
          { text: 'Time left', value: 'timeleft'}
        ],        
        quizResults: [],
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.correct {
  background-color: seagreen;
}
</style>
