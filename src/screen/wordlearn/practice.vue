<template>
  <div class="hello">
    <h1>Welocome to Practice</h1>
    <h2>{{msg}}</h2>
    <div v-if="totalPages == 0">
      <h2>This practice set is empty</h2>
      <el-button type="success" plain icon="el-icon-back" @click="$router.push('/catalogue')">Back to Catelogue</el-button>
    </div>
    <div v-if="totalPages > 0">
      <el-progress :percentage="parseInt((currentPage / totalPages) * 100)" color="green"></el-progress>
      <el-card style="margin: auto;" v-if="currProb && currentPage < totalPages" class="box-card">
        <div slot="header" class="clearfix">
          <strong>{{currProb.problem_title}}:</strong>
          <span>{{currProb.problem_description}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="handleHintClick">Hint</el-button>
          <el-alert v-show="showHint" title="Hint" type="info" 
          @close="showHint=false">{{currProb.problem_hint}}</el-alert>
        </div>
        
        <el-radio-group @change="handleRadioChange" v-model="currAnswer">
          <div v-for="d in currProb.data_item" :key="d.key">
            <el-radio :label="d.key" v-model="d.value">
              <img v-if="d.image_url" :src="d.image_url" class="image">
              <el-button style="display:inline;" v-if="d.audio_url" type="primary" icon="el-icon-caret-right" 
              @click.prevent="playSound(d.audio_url)">Play</el-button>
              <div style="display:inline;" v-if="d.label">{{d.label}}</div>
            </el-radio>
            <el-alert :closable="false" v-if="currAnswer == d.key && d.answer == 'yes'" title="Correct!" type="success">
            </el-alert>
            <el-alert :closable="false" v-if="currAnswer == d.key && d.answer != 'yes'" title="Wrong! Please try again." 
            type="error"> </el-alert>
          </div>
        </el-radio-group>
      </el-card>
      <div v-else>
        <h2>Contratulation!</h2>
        <table>
          <tr v-for="summ in summary" :key="summ.id">
            <td></td>
            <td>{{summ.text}}</td>
          </tr>
        </table>
        <el-button type="success" plain icon="el-icon-back" @click="$router.push('/catalogue')">Back to Catelogue</el-button>
      </div>
      <el-row v-if="currProb && currentPage < totalPages">
        <el-button icon="el-icon-arrow-left" @click="handlePrevClick" :disabled="currentPage == 0"></el-button>
        <el-button icon="el-icon-arrow-right" @click="handleNextClick" :disabled="currentPage == activePage"></el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../../store/httpcommon';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data () {
    return {
      msg: 'Practice',
      currProb: '',
      currAnswer: '',
      answerSet: {},
      currentPage: 0,
      activePage: 0,
      totalPages: 0,
      showHint: false,
      query: {
        wordset: '',
        level: ''
      },
      summary: []
    }
  },
  methods: {
    ...mapMutations([
      'setProblems',
      'setWordCategory'
    ]),
    submitAnswers() {
      let answers = [];
      this.summary = [];
      this.problems.forEach(p => {
        let fromSet = this.answerSet[p._id];
        let selected = p.data_item.forEach(d => { return d.key == fromSet.answer });
        let ans = {
          "problem_id" : p._id,
          "problem_answer_phase": "learning",
          "problem_answer_retry": fromSet.retry ? true : false,
          "problem_answer_correct": selected && selected.answer? selected.answer.toLowerCase() == "yes" : '',
          "problem_answer_use_hint": fromSet.hint? true : false,
          "answer":{
            "key": fromSet.answer? fromSet.answer : '', 
            "value": selected && selected.value? selected.value : ''
          }
        };
        if (!ans.problem_answer_correct) {
          let s = {
            'id': ans.problem_id,
            'text': p.problem_title,
            'retry': ans.problem_answer_retry,
            'hint': ans.problem_answer_use_hint
          };
          this.summary.push(s);
        }
        answers.push(ans);
      });
    },
    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    handlePrevClick() {
      this.handleCurrentChange(this.currentPage - 1);
    },
    handleNextClick () {
      console.log("Next");
      this.handleCurrentChange(this.currentPage + 1)
      if (this.currentPage == this.totalPages) {
        this.submitAnswers()
      }
    },
    handleHintClick() {
      this.showHint = !this.showHint;
      if (!this.answerSet[this.currProb._id]) {
        this.answerSet[this.currProb._id] = {};
      }
      this.answerSet[this.currProb._id].hint = true;
      console.log(this.answerSet);
    },
    handleCurrentChange(curr) {
      console.log("handleCurrentChange", curr);
      this.currentPage = curr;
      this.currProb = '';
      if (curr < this.totalPages) {
        this.currProb = this.problems[curr];
        this.currAnswer = ''; 
        if (this.answerSet[this.currProb._id]){
          if (this.answerSet[this.currProb._id].answer) {
            this.currAnswer = this.answerSet[this.currProb._id].answer;
          }
        }
      }
      this.activateNext();
    },
    handleRadioChange (data) {
      console.log("handleRadioChange")
      if (!this.answerSet[this.currProb._id]) {
        this.answerSet[this.currProb._id] = {};
      }
      if (this.answerSet[this.currProb._id].answer !== undefined) {
        this.answerSet[this.currProb._id].retry = true;
      }
      this.answerSet[this.currProb._id].answer = data;
      console.log(this.answerSet);
      this.activateNext();
    },
    activateNext() {
      if (!this.answerSet[this.currProb._id] || !this.answerSet[this.currProb._id].answer) {
        return;
      }
      var data = this.answerSet[this.currProb._id].answer;
      var act = this.activePage;
      this.activePage = this.currentPage;
      console.log("activateNext", this.currProb);
      this.currProb.data_item.forEach(p => {
        if (p.answer == "yes" && p.key == data) {
          this.activePage = act + 1;
        }
      });
    }
  },

  created() {
    this.loading = true;
    
    if(this.$route.params.hasOwnProperty('wordset') && this.$route.params.wordset) {
      this.query.wordset = this.$route.params.wordset
    }
    if(this.$route.params.hasOwnProperty('level') && this.$route.params.level) {
      this.query.level = this.$route.params.level
    }
    this.msg = this.query.wordset + ": Level " + this.query.level;
    console.log("Query", this.query);

    if (this.problems.length > 0) {
      this.totalPages = this.problems.length;
      this.currProb = this.problems[0];
    }

    if (this.problems.length == 0) {
      HTTP.post('/api/problem/query_problems', {
        problem_category: this.query.wordset,
        problem_grade_level: this.query.level
      }).then(response => {
        console.log("Received from server: ", response.data);
        this.setProblems(
          response.data.data,
        );
        if (this.problems.length > 0) {
          this.totalPages = this.problems.length;
          this.currProb = this.problems[0];
        }
      })
    }
    this.loading = false;
  },

  computed: {
    ...mapGetters({ 
      problems: 'problems' 
    })
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 640px;
    min-height: 400px;
  }
  .image {
    height: 150px;
    width: 150px;
    display: inline;
    vertical-align: middle;
    border: 1px solid black;
  }
</style>
