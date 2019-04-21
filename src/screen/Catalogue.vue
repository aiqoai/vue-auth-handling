<template>
  <div class="hello">
    <el-row>
        <el-col :span="24">
             <div class="title-1" style="text-align: center;">
                <h1>
                    Word Catalogues
                </h1>
            </div>
        </el-col>
    </el-row>
             <div class="title-1" style="text-align: left;">
                <h2 class="title">Test Preparation</h2>
            </div>
        <el-row>
                <el-col :span="8" >
                        <el-card :body-style="{ padding: '0px' }">
                                <img src="../assets/SAT.png" width="100%">
                                <div style="padding: 14px;">
                                      <h3>SAT words set</h3>

                                      <div class="bottom clearfix">
                                      
                                        <el-button type="primary" round  class="button" v-on:click="populateWordList('SAT', 'topic')">Learn vocabularies</el-button>
                                      </div>
                                </div>
                        </el-card>
                </el-col>
            <el-col :span="8" >
                <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/GRE.png" width="100%">
                <div style="padding: 14px;">
                  <h3>GRE words set</h3>
                  <div class="bottom clearfix">
                    
                    <el-button type="primary" round   class="button" v-on:click="populateWordList('GRE', 'topic')">Learn vocabularies</el-button>
                  </div>
                </div>
                </el-card>
            </el-col>
               <el-col :span="8" >
                <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/TOEFL.png" width="100%">
                <div style="padding: 14px;">
                  <h3>TOEFL words set</h3>
                  <div class="bottom clearfix">
                    <el-button type="primary" round class="button" v-on:click="populateWordList('TOEFL', 'topic')">Learn vocabularies</el-button>
                  </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
    <h2 class="title-2">Category by User</h2>
    <el-row>
           <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/usercreat5.png" width="100%">
                    <div style="padding: 14px;">
                      <p>Word set by Linda</p>
                      <div class="bottom clearfix">
                        
                        <el-button type="danger" round class="button" v-on:click="$router.push('/learning/mywords/1');">Learn vocabularies</el-button>
                      </div>
                    </div>
                </el-card>
        </el-col>
           <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/usercreat2.png" width="100%">
                    <div style="padding: 14px;">
                      <p>Word set by Brent</p>
                      <div class="bottom clearfix">
                        
                        <el-button type="danger" round class="button">Learn vocabularies</el-button>
                      </div>
                    </div>
                </el-card>
        </el-col>
         <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/usercreat3.png" width="100%">
                    <div style="padding: 14px;">
                      <p>Word set by Brent</p>
                      <div class="bottom clearfix">
                        
                        <el-button type="danger" round class="button" >Learn vocabularies</el-button>
                      </div>
                    </div>
                </el-card>
        </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/usercreat6.png" width="100%">
                    <div style="padding: 14px;">
                    <p>Word set by Danile</p>
                      <div class="bottom clearfix">
                        
                        <el-button type="danger" round class="button" >Learn vocabularies</el-button>
                      </div>
                    </div>
                </el-card>
        </el-col>
    </el-row>

    <el-row>
           <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/usercreat1.png" width="100%">
                    <div style="padding: 14px;">
                      <p>Word set by Linda</p>
                      <div class="bottom clearfix">
                        
                        <el-button type="danger" round class="button" >Learn vocabularies</el-button>
                      </div>
                    </div>
                </el-card>
        </el-col>

        <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/usercreat4.png" width="100%">
                    <div style="padding: 14px;">
                      <p>Word set by Linda</p>
                      <div class="bottom clearfix">
                        
                        <el-button type="danger" round class="button" >Learn vocabularies</el-button>
                      </div>
                    </div>
                </el-card>
        </el-col>

            <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/usercreat7.png" width="100%">
                    <div style="padding: 14px;">
                      <p>Word set by Linda</p>
                      <div class="bottom clearfix">
                        
                        <el-button type="danger" round class="button" >Learn vocabularies</el-button>
                      </div>
                    </div>
                </el-card>
        </el-col>

             <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../assets/usercreat8.png" width="100%">
                    <div style="padding: 14px;">
                      <p>Word set by Linda</p>
                      <div class="bottom clearfix">
                        
                        <el-button type="danger" round class="button" >Learn vocabularies</el-button>
                      </div>
                    </div>
                </el-card>
        </el-col>


    </el-row>



       <el-container>
  <el-footer>©2019 aiQo.ai. All rights reserved.</el-footer>

 </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
// import * as wdata from '../../data/word_bank.json';
import {setWordList} from '../store/wordList'

export default {
  name: 'catalogue',
  data () {
    return {
      currentDate: new Date().toLocaleDateString()
    }
  },
  computed: {
    ...mapGetters({
      currentUser:'currentUser'
    })
  },
  methods: {
    ...mapMutations([
      'setWordCategory'
    ]),
    ...mapActions([

    ]),
    populateWordList(category, destination) {
      var path = { name: destination, params: { wordset: category } };
      this.setWordCategory(category);
      this.$router.push(path);
    }
  }
}
</script>

<style >

/* This is fixed for viewing. Neeeded to be changed. */

h1{font-size: 30px;
color:#06597D;}

h2{
    font-size: 25px;
    color: #1A708E;
}
h3{font-size: 18px;
color:#06597D;

}
.title-2{margin-top: 50px;

}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.cards {
  height: 400px;
}
/*End*/
.el-card{
    margin-right: 20px;
}

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
  .el-footer {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 100px;
    margin-top: 150px;
  }



</style>

