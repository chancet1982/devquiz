<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex xs12>
          <v-card color="white" class="mb-5">
            <v-card-title class="primary">
              <h3 class="headline mb-0 white--text">Overview of the results</h3>
            </v-card-title>
            <v-card-text>
              <v-switch
                :label="filterIncorrect === true ? 'Correct results only' : 'All Results'"
                v-model="filterIncorrect"
              />
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
                  v-bind:items="availableResults"
                  v-bind:search="search"
                >
                <template slot="items" slot-scope="props">
                  <td :class="getClass(props.item.isAnswerCorrect)">{{ props.item.name }}</td>
                  <td :class="getClass(props.item.isAnswerCorrect)">{{ props.item.email }}</td>
                  <td :class="getClass(props.item.isAnswerCorrect)">{{ props.item.answer }}</td>
                  <td :class="getClass(props.item.isAnswerCorrect)"><v-icon v-if="props.item.isAnswerCorrect" color="green">check</v-icon> <v-icon v-else color="red">clear</v-icon></td>
                  <td :class="getClass(props.item.isAnswerCorrect)">{{ props.item.timeLeft }}</td>
                  <td :class="getClass(props.item.isAnswerCorrect)">
                    <v-btn icon class="mx-0" @click="deleteItem(props.index)">
                      <v-icon color="white">delete</v-icon>
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
      getClass(value) {
        return value ? "green" : "error";
      },
      deleteItem(index) {
        this.quizResults.splice(index, 1);
        this.$localStorage.set('currentResults', this.quizResults);
      },
    },
    computed: {
      availableResults() {
        return this.filterIncorrect ? this.quizResults.filter(result => result.isAnswerCorrect === true) : this.quizResults;
      }
    },
    data() {
      return {
        search: '',
        filterIncorrect: true,
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

</style>
