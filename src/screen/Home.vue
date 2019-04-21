<template>
  <div >
    <el-alert class="home-alert" :key="problems.length" 
      :title="'Welcome ' + currentUser.name + '!'"
      close-text="Close"
      type="success" show-icon 
      @close="redirect_to_practice=false">
      <label v-if="problems.length > 0">
      There are {{problems.length}} words to be reviewed.
      You will be redirected to <router-link to="/practice/review/1" class="nav-item">the review page</router-link> to continue practicing these words.
      </label>
      <el-row v-if="redirect_to_practice">
        <label>
        Please close this to cancel going to the review page.
        </label>
      </el-row>
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

              <el-col :span="24"><div class="grid-content " style="max-height: 20px;"><p>©2019 aiQo.ai. All rights reserved.</p> </div></el-col>


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
      redirect_to_practice: true,
      msg: 'This is your home page'
    }
  },
  methods: {
    handleRedirect() {
      console.log(this.$router.currentRoute.path);
      if (this.redirect_to_practice && this.$router.currentRoute.path == "/") {
        this.$router.push({ path: '/practice/review/1'});
      }
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
      if (this.problems) {
        setTimeout( this.handleRedirect, 5000);
      }
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
  .home-alert label {
    font-weight: bold; font-size:16px;
  }
</style>
