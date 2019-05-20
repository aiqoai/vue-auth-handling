<template>
  <div class="hello">
    <h1 class="title">Welcome to Test</h1>
    <h2>{{msg}}</h2>
    <div v-if="totalPages == 0">
      <h2>This practice set is empty</h2>
      <el-button type="success" plain icon="el-icon-back" @click="$router.push('/catalogue')">Back to Catalogue</el-button>
    </div>
    <div v-if="totalPages > 0">
      <el-progress :percentage="parseInt((currentPage / totalPages) * 100)" color="green"></el-progress>
      <el-row v-if="currProb && currentPage < totalPages">
        <el-button type="success" icon="el-icon-arrow-left" @click="handlePrevClick" :disabled="currentPage == 0"
          style="margin-top: 20px;" >Previous</el-button>
        <el-button type="success" icon="el-icon-arrow-right" @click="handleNextClick" :disabled="currentPage == activePage"
          style="margin-left: 80%; margin-top:20px;" >Next</el-button>
      </el-row>


      <el-card style="margin: auto;" v-if="currProb && currentPage < totalPages" class="box-card">
        <div slot="header" class="clearfix">
          <h2>{{currProb.problem_description}}</h2>
        </div>
        
        <el-radio-group @change="handleRadioChange" v-model="currAnswer">
          <div v-for="d in currProb.data_item" :key="d.key">
            <el-radio :label="d.key" v-model="d.value">
              <img v-if="d.image_url" :src="d.image_url" class="image">

              <el-button style="display:inline-block;" v-if="d.audio_url" type="primary" icon="el-icon-caret-right" 
              @click.prevent="playSound(d.audio_url)" class="playbutton">Play</el-button>

              <div style="display:inline-block;" v-if="d.label"><p>{{d.label}}</p></div>
            </el-radio>
          </div>
        </el-radio-group>
      </el-card>

      <div v-else>
        <h2>Congratulations! You have finished the test!</h2>
        <el-button type="success" plain icon="el-icon-back" @click="$router.push('/catalogue')">Back to Catalogue</el-button>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .title{
    text-align: center;
}

     h1{
    font-size: 25px;
color:#E6605B;
  }
    .playbutton{
        margin-top: 10px
    }
     .image{
        margin-top: 5px;
        margin-bottom: 5px;
    }

    h2{font-size: 20px;
color:#090218;}
p{
font-size: 16px;
   
color:#090218;

}

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
      }
    }
  },
  methods: {
    ...mapMutations([
      'setProblems',
      'setWordCategory'
    ]),
    submitAnswers() {
      let answers = [];
      this.problems.forEach(p => {
        let fromSet = this.answerSet[p._id];
        let selected = null;
        let problem_answer_correct = false;
        let key = '';
        let value = '';
        
        if (fromSet){
          if (fromSet.answer) {
            selected = p.data_item.find(d => { return d.key == fromSet.answer });
            key = fromSet.answer;
          }
        }
        if (selected) {
          if (selected.answer) {
            problem_answer_correct = selected.answer.toLowerCase() == "yes";
          }
          if (selected.value) {
            value = selected.value;
          }
        }
        let ans = {
          "problem_id" : p._id,
          "problem_answer_phase": "test",
          "problem_answer_retry": false,
          "problem_answer_correct": problem_answer_correct,
          "problem_answer_use_hint": false,
          "answer": {
            "key": key, 
            "value": value
          }
        };
        answers.push(ans);
      });
      console.log(answers);
      let correct = 0;
      answers.forEach(answer => {
        if (answer.problem_answer_correct){
          correct += 1;
        }
        HTTP.post('/api/problem_answer/submit_answer', answer).then(response => {
          console.log("Received from server: ", response);
        })
      });
      let percent_val = parseInt((correct / answers.length) * 100);
      console.log("posting course progress...");
      let progress = {
          "course_name": this.query.wordset,
          "completion_date": new Date().toISOString().split('T')[0] + 'UTC',
          "last_access": new Date().toISOString().split('T')[0] + 'UTC',
          "course_score": percent_val
        }
      HTTP.post('/api/courseProgress', progress).then(response => {
        console.log("Received from server: ", response.data);
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
    },
    handleRadioChange (data) {
      if (!this.answerSet[this.currProb._id]) {
        this.answerSet[this.currProb._id] = {};
      }
      if (this.answerSet[this.currProb._id].answer !== undefined) {
        this.answerSet[this.currProb._id].retry = true;
      }
      this.answerSet[this.currProb._id].answer = data;
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
      this.activePage = this.totalPages;
      this.currProb = this.problems[0];
    }

    if (this.problems.length == 0) {
      HTTP.post('/api/problem/query_problems', {
        problem_course_name: this.query.wordset,
        problem_lesson_name: this.query.level,
        num_problems: 5
      }).then(response => {
        console.log("Received from server: ", response.data);
        this.setProblems(
          response.data.data,
        );
        if (this.problems.length > 0) {
          this.totalPages = this.problems.length;
          this.activePage = this.totalPages;
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


