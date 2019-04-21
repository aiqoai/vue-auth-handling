<template>
  <div >
    <el-alert :key="problems.length" 
      :title="'Welcome back ' + currentUser.name + '!'" 
      type="success" show-icon :closable="problems.length == 0">
      <label v-if="problems.length > 0" style="font-weight: bold; font-size:16px;">
      There are {{problems.length}} words to be reviewed.
      Please click <router-link to="/practice/review/1" class="nav-item">here</router-link> to continue practicing these words.
      </label>
    </el-alert>
    <el-row>
            <el-col :span="24"><div class="grid-content headerimg">
                  <img src="../assets/hearderimg.png" width="100%">
            </div></el-col>
      </el-row>

      <el-row>
           <el-col :span="24">
               <div class="grid-content headerimg">
                    <div class="img1">
                         <img src="../assets/home1.png" width="100%">
                    </div>

                 </div>
                  <el-col><el-button type="danger" round>Learn More</el-button></el-col>

            </el-col>
      </el-row>

        <el-row>
           <el-col :span="24">
               <div class="grid-content">
                    <div class="img2">
                          <img src="../assets/home2.png" width="100%">
                    </div>

                 </div>
            </el-col>
      </el-row>

      <el-row>

              <el-col :span="24"><div class="grid-content bg-purple-light"><p>©2019 aiQo.ai. All rights reserved.</p> </div></el-col>


      </el-row>

  </div>
</template>

<script>
import {HTTP} from '../store/httpcommon';
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters({
      curr: 'testCategories',
      currentUser:'currentUser'
               })

  }

,
  methods: {
    ...mapActions([

               ])

  }
,
  data () {
    return {
      problems: [],
      msg: 'This is your home page'
    }
  },
  mounted() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera


    // The following shold be provided by the current user api.
    // This is for temporary testing.
    let post_path = '/api/problem_answer/query_problem_answers';
    let query_string = {
      problem_answer_correct: false,
      num_problems: 10,
      problem_answer_phase: 'test'
    }
    HTTP.post(post_path, query_string).then(response => {
      console.log("Received from server: ", response.data);
      this.problems = response.data.data;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
     h1{font-family: 'Poppins', sans-serif;}

    p{text-align: center;
     padding-top: 50px;
padding-bottom: 20px;
font-family: 'Poppins', sans-serif;}

.el-button{margin-left: 1200px;
margin-top: -200px;
position: absolute;
z-index: 2;

}
.img1,.img2{

     z-index: -1;
}

  .el-col {
    border-radius: 2px;

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

  }
</style>
