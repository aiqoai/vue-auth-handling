<template>
  <div class="hello">
    <h1>This is practice</h1>
    <h2>{{msg}}</h2>
      <el-progress :percentage="(currentPage / totalPages) * 100" color="green"></el-progress>
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
        <h3>You have finished the {{this.category}} at level {{this.level}}!</h3>
      </div>
      <el-row v-if="currProb && currentPage < totalPages">
        <el-button icon="el-icon-arrow-left" @click="handlePrevClick" :disabled="currentPage == 0"></el-button>
        <el-button icon="el-icon-arrow-right" @click="handleNextClick" :disabled="currentPage == activePage"></el-button>
      </el-row>
      <!-- <el-pagination style="margin: auto;" background layout="prev, next" @current-change="handleCurrentChange" 
      v-on:next-click="handleNextClick" :page-count="11">
      </el-pagination> -->


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      msg: 'Practice',
      currProb: '',
      currAnswer: '',
      answerSet: {},
      currentPage: 0,
      activePage: 0,
      totalPages: 10,
      showHint: false
    }
  },
  methods: {
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
    },
    handleHintClick() {
      this.showHint = !this.showHint;
      if (!this.answerSet[this.currProb.problem_title]) {
        this.answerSet[this.currProb.problem_title] = {};
      }
      this.answerSet[this.currProb.problem_title].hint = true;
      console.log(this.answerSet);
    },
    handleCurrentChange(curr) {
      console.log("Current Change", curr);
      this.currProb = this.problems[curr];
      this.currentPage = curr;
      this.currAnswer = ''; 
      if (this.answerSet[this.currProb.problem_title] && this.answerSet[this.currProb.problem_title].answer){
        this.currAnswer = this.answerSet[this.currProb.problem_title].answer;
      }
      this.activateNext()
    },
    handleRadioChange (data) {
      console.log("Radio changed")
      if (!this.answerSet[this.currProb.problem_title]) {
        this.answerSet[this.currProb.problem_title] = {};
      }
      this.answerSet[this.currProb.problem_title].answer = data;
      console.log(this.answerSet);
      this.activateNext();
    },
    activateNext() {
      var data = this.answerSet[this.currProb.problem_title].answer;
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
  computed: {
    ...mapGetters({ 
      problems: 'problems' 
    })
   
  },
  mounted () {
    this.category = "SAT";
    this.level = 3;
    // this.category = this.$route.query.wordset;
    // this.level = this.$route.query.level;
    // console.log(this.category, this.level);
    // if (!this.problems || this.problems.length == 0) {
    //   this.getProblems();
    // }
    this.currProb = this.problems[0];
  },
  getProblems() {
    this.getProblems();
    // if (false) {
    //   HTTP.get('/api/problem/query_problems').then(response => {
    //     console.log("Received from server: ", response.data);
    //     this.setProblems(response.data.data);
    //   })
    // }
    // else {
    //   this.setProblems(pdata);
    // }
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
