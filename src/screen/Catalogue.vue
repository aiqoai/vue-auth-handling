<template>
  <div class="hello">
    <h1>Word Catalogue</h1>
    <h2 class="title">Test Prep</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="cat in testCategories" :key="cat.id">
        <div class="grid-content bg-purple">
        <el-card class="cards box-card">
          <div slot="header" class="clearfix">
            <span>{{cat.name}}</span>
            <div style="float:right" >
            <el-button type="primary" plain v-on:click="populateWordList(cat.name, '/learning')">Learn</el-button>
            <el-button type="primary" plain v-on:click="populateWordList(cat.name, '/practice')">Practice</el-button>
            </div>
          </div>
          <img v-show="cat.image" :src="cat.image" aspect-ratio="1" class="image">
          <div v-for="des in cat.description" :key="des" class="text item">
            {{ des }}
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>

    <h2 class="title">Categories by User</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="cat in userCategories" :key="cat.id">
        <div class="grid-content bg-purple">
        <el-card class="cards box-card">
          <div slot="header" class="clearfix">
            <span>{{cat.name}}</span>
            <div style="float:right" >
            <el-button type="primary" plain v-on:click="populateWordList(cat.name, '/learning')">Learn</el-button>
            <el-button type="primary" plain v-on:click="populateWordList(cat.name, '/practice')">Practice</el-button>
            </div>
          </div>
          <img v-show="cat.image" :src="cat.image" aspect-ratio="1" class="image">
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
// import {setWordList} from '../store/wordList'

export default {
  name: 'app',

  computed: {
    ...mapGetters({
                 testCategories: 'testCategories',
                 userCategories: 'userCategories'
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
      this.setWordList(name);
      this.$router.push(path);
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

