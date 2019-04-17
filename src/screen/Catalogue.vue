<template>
  <div class="hello">
    <h1>Word Catalogue</h1>
    <h2 class="title">Test Prep</h2>

        <el-row>
            <el-col :span="8" >
                <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/SAT.png" width="100%">
                <div style="padding: 14px;">
                  <span>SAT words set</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button" v-on:click="populateWordList('SAT', '/learning')">Learn vocabularies</el-button>
                  </div>
                </div>
                </el-card>
            </el-col>

            <el-col :span="8" >
                <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/GRE.png" width="100%">
                <div style="padding: 14px;">
                  <span>GRE words set</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button" v-on:click="populateWordList('GRE', '/learning')">Learn vocabularies</el-button>
                  </div>
                </div>
                </el-card>
            </el-col>

               <el-col :span="8" >
                <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/TOEFL.png" width="100%">
                <div style="padding: 14px;">
                  <span>TOEFL words set</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button" v-on:click="populateWordList('TOEFL', '/learning')">Learn vocabularies</el-button>
                  </div>
                </div>
                </el-card>
            </el-col>
        </el-row>

    <h2 class="title">Categories by User</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="cat in userCategories" :key="cat.id">
        <div class="grid-content bg-purple">
        <el-card class="cards box-card">
          <div slot="header" class="clearfix">
            <span>{{cat.name}}</span>
            <img v-show="cat.image" :src="cat.image" aspect-ratio="1" class="image">
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button" v-on:click="populateWordList('SAT', '/learning')">Learn vocabularies</el-button>
            </div>
          </div>
          <div v-for="des in cat.description" :key="des" class="text item">
            {{ des }}
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {HTTP} from '../store/httpcommon'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as wdata from '../../data/word_bank.json';
// import {setWordList} from '../store/wordList'

export default {
  name: 'catalogue',
  data () {
    return {
      currentDate: new Date().toLocaleDateString()
    }
  },
  computed: {
    ...mapGetters({
                 testCategories: 'testCategories',
                 userCategories: 'userCategories',
                 testname:'testname',
                 currentUser:'currentUser'
               })
  },
  methods: {
    ...mapMutations([
      'setWordList'
    ]),
    ...mapActions([

    ]),
    populateWordList(name, path) {
      console.log(name, path);
      if (false) {
      HTTP.get('/api/word/query_words').then(response => {
          console.log("Received from server: ", response.data);
          this.setWordList({
            wordList: response.data.data,
            wordCategory: name
          });
          this.$router.push(path);
        })
      }
      else{
        this.setWordList({
            wordList: wdata,
            wordCategory: name
          });
        this.$router.push(path);
      }
    }
  }
}
</script>

<style >

/* This is fixed for viewing. Neeeded to be changed. */
.cards {
  height: 400px;
}
/*End*/


.image {
    width: 100%;
    height: 100%;
    display: block;
  }
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

