<template>
<div class="hello">
     <el-row>
          <el-col :span="24">
               <img v-if="$route.params.wordset == 'SAT'" src="../../assets/S1.SAT.png" width="100%" style="text-align: center; margin-top: -20px;">
               <img v-if="$route.params.wordset == 'GRE'" src="../../assets/S1.GRE.png" width="100%" style="text-align: center; margin-top: -20px;">
               <img v-if="$route.params.wordset == 'TOEFL'" src="../../assets/S1.TOEFL.png" width="100%" style="text-align: center; margin-top: -20px;">
          </el-col>
     </el-row>

    <h1>{{wordCatagory}} Vocabulary Sets </h1>
   
    <el-row :gutter="20">
               <el-col :span="16">
                    <button class="set-button" type="submit" v-on:click="redirectToLearn(1)">Set-1</button>
               </el-col>
              
              <el-col :span="8">
               <button class="pr-button" type="submit" v-on:click="redirectToPractice(1)">Practice</button>
                <button class="te-button" type="submit" v-on:click="redirectToTest(1)">Test</button>
              </el-col>
    </el-row>
<hr>
     <el-row :gutter="20">
          <el-col :span="16">
                    <button class="set-button" type="submit" v-on:click="redirectToLearn(2)">Set-2</button>
               </el-col>
              
              <el-col :span="8">
               <button class="pr-button" type="submit" v-on:click="redirectToPractice(2)">Practice</button>
                <button class="te-button" type="submit" v-on:click="redirectToTest(2)">Test</button>
              </el-col>
     </el-row>
<hr>
     <el-row :gutter="20">
          <el-col :span="16">
                    <button class="set-button" type="submit" v-on:click="redirectToLearn(3)">Set-3</button>
               </el-col>
              
              <el-col :span="8">
               <button class="pr-button" type="submit" v-on:click="redirectToPractice(3)">Practice</button>
                <button class="te-button" type="submit" v-on:click="redirectToTest(3)">Test</button>
              </el-col>
     </el-row>
<hr>
       <el-row>
              <el-col :span="24">
                <div class="gr" style="text-align: center;padding-top: 2%; max-height: 20px;">
                <p>©2019 aiQo.ai. All rights reserved.</p> 
                 </div>
             </el-col>
        </el-row>
</div>
</template>

<style> 
h1{font-size: 30px;
color:#06597D;}

.set-button{
     border-radius: 12px;
     background-color: #06597D;
     border: none;
     color: white;
     padding: 15px 100px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 20px;
     margin: 4px 2px;
     cursor: pointer;
     -webkit-transition-duration: 0.4s; /* Safari */
     transition-duration: 0.4s;
     font-size: 20px;
      font-weight: bold;

}
.set-button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

.pr-button{
     border-radius: 12px;
     background-color: #EC5F64;
     border: none;
     color: white;
     padding: 15px 50px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 18px;
     margin: 4px 2px;
     cursor: pointer;
     -webkit-transition-duration: 0.4s; /* Safari */
     transition-duration: 0.4s;
     font-size: 20px;
      font-weight: bold;
}

.pr-button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
.te-button{
     border-radius: 12px;
     background-color: #FF8800;
     border: none;
     color: white;
     padding: 15px 50px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 18px;
     margin: 4px 2px;
     cursor: pointer;
     -webkit-transition-duration: 0.4s; /* Safari */
     transition-duration: 0.4s;
     font-size: 20px;
      font-weight: bold;
}

.te-button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

.el-footer {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 100px;
    margin-top: 150px;
  }

</style>

<script>
import {HTTP} from '../../store/httpcommon';
// import * as wdata from '../../../data/word_bank.json';
// import * as pdata from '../../../data/problem.json';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props : ['nextUrl'],
  data () {
    return {
      msg: 'learning',
      selectedWord: ''
    }
  },
  created(){
    if (!this.wordCatagory) {
      if(this.$route.params.hasOwnProperty('wordset') && this.$route.params.wordset) {
        this.setWordCategory(this.$route.params.wordset);
      }
    }
  },
  methods: {
    ...mapMutations([
      'setWordList',
      'setProblems',
      'setWordCategory'
    ]),
    ...mapActions([

    ]),
    redirectToLearn(level) {
      var path = { name: 'learning', params: { wordset: this.wordCatagory, level: level } };
      HTTP.post('/api/word/query_words', {
        category: this.wordCatagory,
        level: String(level)
      }).then(response => {
        console.log("Received from server: ", response.data);
        this.setWordList(
          response.data.data,
        );
        this.$router.push(path);
      })
    },
    redirectToPractice(level) {
      var path = { name: 'practice', params: { wordset: this.wordCatagory, level: level } };
      HTTP.post('/api/problem/query_problems', {
        problem_category: this.wordCatagory,
        problem_grade_level: String(level),
        num_problems: 5
      }).then(response => {
        console.log("Received from server: ", response.data);
        this.setProblems(
          response.data.data,
        );
        this.$router.push(path);
      })
    },
    redirectToTest(level) {
      var path = { name: 'test', params: { wordset: this.wordCatagory, level: level } };
      HTTP.post('/api/problem/query_problems', {
        problem_category: this.wordCatagory,
        problem_grade_level: String(level),
        num_problems: 5
      }).then(response => {
        console.log("Received from server: ", response.data);
        this.setProblems(
          response.data.data,
        );
        this.$router.push(path);
      })
    }
  },

  computed: {
    ...mapGetters({
      wordCatagory: 'wordCatagory'
    })
  }
}
</script>

<style scoped>

</style>
