<template>
  <div class="hello">
    <h1 class="title">Vocabulary Practice</h1>
    <el-row>
        <el-col :span="6">
             <h2>{{msg}}</h2>
        </el-col>
          <el-button v-if="query.wordset == 'review'" style="float:right; margin:20px; " icon="el-icon-back" type="success" @click="$router.push('/catalogue')">Back to Catalogue</el-button>
          <el-button v-if="query.wordset != 'review'" style="float:right; margin:20px; " icon="el-icon-d-arrow-left" type="warning" @click="$router.push('/learning/' + query.wordset + '/' + query.level)">Back to Learning</el-button>
          <el-button v-if="query.wordset != 'review'" style="float:right; margin:20px; " icon="el-icon-d-arrow-left" type="danger" @click="$router.push('/topic/' + query.wordset)">Back to {{query.wordset}} Sets</el-button>

            
    </el-row>

    <div v-if="totalPages == 0">
      <h2>This practice set is empty</h2>
      <el-button type="success" plain icon="el-icon-back" @click="$router.push('/catalogue')">Back to Catalogue</el-button>
    </div>
    <div v-if="totalPages > 0">
      <el-progress :percentage="parseInt((currentPage / totalPages) * 100)" color="green"></el-progress>
      <el-row v-if="currProb && currentPage < totalPages">
      <el-button type="success" icon="el-icon-arrow-left" @click="handlePrevClick" :disabled="currentPage == 0"
        style="margin-top: 20px;">Previous</el-button>
      <el-button type="success" icon="el-icon-arrow-right" @click="handleNextClick" :disabled="currentPage == activePage"
        style="margin-left: 80%; margin-top:20px;">Next</el-button>
      </el-row>

              <el-card style="margin: auto;" v-if="currProb && currentPage < totalPages" class="box-card">

                <div slot="header" class="clearfix">

                  <h2>{{currProb.problem_description}}</h2>

                  <el-button style="float: right; padding: 3px 0" type="text" @click="handleHintClick">Hint</el-button>
                  <el-alert v-show="showHint" title="Hint" type="info" 
                  @close="showHint=false">{{currProb.problem_hint}}</el-alert>
                </div>


                
                <el-radio-group @change="handleRadioChange" v-model="currAnswer">
                  <div v-for="d in currProb.data_item" :key="d.key">
                        <el-radio :label="d.key" v-model="d.value">
                          <img v-if="d.image_url" :src="d.image_url" class="image">

                          <el-button style="display:inline-block;" v-if="d.audio_url" type="primary" icon="el-icon-caret-right" 
                          @click.prevent="playSound(d.audio_url)"
                          class="playbutton">Play</el-button>

                          <div style="display:inline-block;" v-if="d.label"><p>{{d.label}}</p></div>
                            </el-radio>

                        <el-alert :closable="false" v-if="currAnswer == d.key && d.answer == 'yes'" title="Correct!" type="success"></el-alert>
                        <el-alert :closable="false" v-if="currAnswer == d.key && d.answer != 'yes'" title="Wrong! Please try again." 
                        type="error">
                         </el-alert>
                  </div>
                </el-radio-group>
              </el-card>

      <div v-else>
                <h2>Congratulations! You have finished learning the wordset!</h2>
                <h1 v-if="summary.length > 0">The following words require your attention: </h1>
                        <table style="margin: auto;">
                          <tr v-for="summ in summary" :key="summ.id">
                            <td>
                              <el-row>
                                <el-button style="margin: auto;" v-if="summ.hint" icon="el-icon-warning" type="warning">Used Hint</el-button>
                                <el-button style="margin: auto;" v-if="summ.retry" icon="el-icon-warning" type="warning">Wrong Answer</el-button>
                              </el-row>
                            </td>
                            <td>{{summ.text}}</td>
                          </tr>
                        </table>
        <el-button type="success" plain icon="el-icon-back" @click="$router.push('/catalogue')">Back to Catalogue</el-button>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .playbutton{
        margin-top: 10px
    }
    .image{
        margin-top: 5px;
        margin-bottom: 5px;
    }
.el-radio-group{

}
p{font-size: 16px;
   
color:#090218;

}
.el-radio__inner {
    border: 1px solid #2f333c;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #FFF;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.text {
    font-size: 20px;
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
    font-size: 20px;
  }
  .image {
    height: 150px;
    width: 150px;
    display: inline;
    vertical-align: middle;
    border: 1px solid black;
  }
  h1{
    font-size: 25px;
color:#E6605B;
  }

  h2{font-size: 20px;
color:#090218;}
.title{
    text-align: center;
}





</style>

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
      mode: "practice",
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
        let selected = p.data_item.find(d => { return d.key == fromSet.answer });
        let correct_answer = selected && selected.answer? selected.answer.toLowerCase() == "yes" : false;
        if (fromSet.retry || fromSet.hint) {
          correct_answer = false;
        }
        let ans = {
          "problem_id" : p._id,
          "problem_answer_phase": "learning",
          "problem_answer_retry": fromSet.retry ? true : false,
          "problem_answer_correct": correct_answer,
          "problem_answer_use_hint": fromSet.hint? true : false,
          "answer":{
            "key": fromSet.answer? fromSet.answer : '', 
            "value": selected && selected.value? selected.value : ''
          }
        };
          if (!ans.problem_answer_correct || ans.problem_answer_retry || ans.problem_answer_use_hint) {
          let s = {
            'id': ans.problem_id,
            'text': p.problem_title +': ' + p.problem_description,
            'retry': ans.problem_answer_retry,
            'hint': ans.problem_answer_use_hint
          };
          this.summary.push(s);
        }
        answers.push(ans);
      });
      let correct = 0;
      console.log(answers);
      answers.forEach(answer => {
        if (answer.problem_answer_correct){
          correct += 1;
        }
        HTTP.post('/api/problem_answer/submit_answer', answer).then(response => {
          console.log("Received from server: ", response);
        })
      });
      if (this.query.wordset !== 'review') {
        let percent_val = parseInt((correct / answers.length) * 100);
        let progress = {
            "category": this.query.wordset,
            "level": String(this.query.level),
            "task": "practice",
            "completion_date": new Date().toISOString().split('T')[0] + 'UTC',
            "last_access": new Date().toISOString().split('T')[0] + 'UTC',
            "progress": percent_val
          }
        HTTP.post('/api/progress', progress).then(response => {
          console.log("Received from server: ", response.data);
        });
      }
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
      this.showHint = false;
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
      if (!this.answerSet[this.currProb._id]) {
        this.answerSet[this.currProb._id] = {};
      }
      if (this.answerSet[this.currProb._id].answer !== undefined) {
        this.answerSet[this.currProb._id].retry = true;
      }
      this.answerSet[this.currProb._id].answer = data;
      this.activateNext();
    },
    activateNext() {
      if (!this.answerSet[this.currProb._id] || !this.answerSet[this.currProb._id].answer) {
        return;
      }
      var data = this.answerSet[this.currProb._id].answer;
      var act = this.activePage;
      this.activePage = this.currentPage;
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
    if (this.query.wordset == 'review') {
      this.msg = 'Review previous words';
    }
    console.log("Query", this.query);

    if (this.problems.length > 0) {
      this.totalPages = this.problems.length;
      this.currProb = this.problems[0];
    }

    if (this.problems.length == 0) {
      let post_path = '/api/problem/query_problems';
      let query_string = {
        problem_category: this.query.wordset,
        problem_grade_level: this.query.level,
        num_problems: 5
      };
      if (this.query.wordset == 'review') {
        post_path = '/api/problem_answer/query_problem_answers';
        query_string = {
          problem_answer_correct: false,
          num_problems: 10,
          problem_answer_phase: 'test'
        }
      }
      HTTP.post(post_path, query_string).then(response => {
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

