<template>
<div class="hello">
    <h1>Learning Deck </h1>
    <h2>{{wordCatagory}}</h2>
    <el-row>
    <el-button type="primary" v-on:click="redirectToLearn(1, '/learning')" >Level 1</el-button>
    </el-row>

    <el-row>
    <el-button type="primary" v-on:click="redirectToLearn(2, '/learning')">Level 2</el-button>
    </el-row>

    <el-row>
    <el-button type="primary" v-on:click="redirectToLearn(3, '/learning')">Level 3</el-button>
    </el-row>

    <el-row>
    <el-button type="primary" v-on:click="redirectToLearn(4, '/practice')">Practice</el-button>
    <el-button type="primary" v-on:click="redirectToLearn(5, '/practice')">Test</el-button>
    </el-row>

</div>
</template>

<script>
import {HTTP} from '../../store/httpcommon'
import * as wdata from '../../../data/word_bank.json';
import * as pdata from '../../../data/problem.json';
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      msg: 'learning',
      selectedWord: ''
    }
  },
  methods: {
    ...mapMutations([
      'setWordList',
      'setProblems'
    ]),
    ...mapActions([

    ]),
    redirectToLearn(level, path) {
      /* Need to decouple for problems and words */
      this.setProblems(pdata);

      console.log(level, path);
      if (false) {
      HTTP.get('/api/word/query_words').then(response => {
          console.log("Received from server: ", response.data);
          this.setWordList(
            response.data.data,
          );
          this.$router.push(path);
        })
      }
      else{
        this.setWordList(wdata);
        this.$router.push(path);
      }
    }
  },

  computed: {
    ...mapGetters({
      wordCatagory: 'wordCatagory'
    })
  }
}
</script>

<style>

</style>
