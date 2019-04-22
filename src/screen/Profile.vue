

<template>
    <el-tabs type="border-card">
  <el-tab-pane label="Profile">
    <el-row :gutter="20">
         <el-col :span="10" :offset="6">
            <h1>My profile</h1>
                <el-card class="box-card">
                      <div class="user-img">
                            <img src="../assets/user.png" width="45%">
                        </div>

                    <table>
                      
                      <tr>
                        <td><h2>My Name:</h2></td>
                        <td>{{currentUser.name}}</td>
                        <td><input v-model="form_name"></td>
                      </tr>
                      <tr>
                        <td><h2>Email:</h2></td>
                        <td>{{profile.email}}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><h2>About Me:</h2></td>
                        <td>{{profile.description}}</td>
                        <td><input v-model="form_description"></td>
                      </tr>
                      <tr>
                      <tr>
                        <td><h2>Current Level:</h2></td>
                        <td>{{profile.current_level}}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><h2>Current Category:</h2></td>
                        <td>{{profile.current_category}}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><h2>Member Since: </h2></td>
                        <td>{{profile.registration_datetime}}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <el-row>
                            <el-col :span="12">
                                <td><button @click="update" class="update-button">Update</button></td>
                            </el-col>

                            <el-col :span="12">
                                <td><button @click="logout" class="logout-button">Logout</button></td>
                            </el-col>
                        </el-row>
                      </tr>
                    </table>

                
            </el-card>
        </el-col>    
    </el-row>
  </el-tab-pane>
  <el-tab-pane label="Progress">
    <el-col :span="4" v-for="p in this.progress" :key="p.category + p.level + p.task">
    <el-progress v-if="p.progress < 25"
      type="circle" :percentage="parseInt(p.progress)" status="text" color="red">
      <el-row>{{p.category}}-{{p.level}}</el-row>
      <el-row>{{p.task}}</el-row>
    </el-progress>
    <el-progress v-else-if="p.progress < 50"
      type="circle" :percentage="parseInt(p.progress)" status="text" color="orange">
      <el-row>{{p.category}}-{{p.level}}</el-row>
      <el-row>{{p.task}}</el-row>
    </el-progress>
    <el-progress v-else-if="p.progress < 75"
      type="circle" :percentage="parseInt(p.progress)" status="text" color="gold">
      <el-row>{{p.category}}-{{p.level}}</el-row>
      <el-row>{{p.task}}</el-row>
    </el-progress>
    <el-progress v-else-if="p.progress < 95"
      type="circle" :percentage="parseInt(p.progress)" status="text" color="limegreen">
      <el-row>{{p.category}}-{{p.level}}</el-row>
      <el-row>{{p.task}}</el-row>
    </el-progress>
    <el-progress v-else
      type="circle" :percentage="parseInt(p.progress)" status="text" color="green">
      <el-row>{{p.category}}-{{p.level}}</el-row>
      <el-row>{{p.task}}</el-row>
    </el-progress>
    </el-col>
  </el-tab-pane>
  </el-tabs>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.update-button{
border-radius: 10px;
 background-color: #EF843C;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 15px 2px;
  cursor: pointer;
}
.logout-button{
     border-radius: 10px;
     background-color: #06597D;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
 margin-left: 40%;
 margin-top: 15px;
  cursor: pointer;

}
.logout-button:hover {
    border-radius: 10px;
     background-color: #53A1E6;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
 margin-left: 40%;
 margin-top: 15px;
  cursor: pointer;
}
.update-button:hover {
  border-radius: 10px;
 background-color: #B35432;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 15px 2px;
  cursor: pointer;
}

.user-img{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;

}

h1, h2 {
  font-weight: bolder;
}
h1{

font-size: 30px;
color:#06597D;

}
h2{
    font-size: 15px;
    color:#06597D;
    line-height: 0.6;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<script>
  import {HTTP} from '../store/httpcommon'
  import {mapGetters,mapMutations} from 'vuex'

export default {
    data(){
      return {
        form_name: "",
        form_description: "",
        progress: []
      }
    }
  ,
  mounted: function(){
    console.log(" profile created:")
    HTTP.get('/api/profile'

    ).then(response => {
      // data.profile = response.data.user
      this.setUserProfile(response.data.user)

      // console.log("profile return",response.data)
    });
    console.log("Before progress");
    HTTP.get('/api/progress')
      .then(response => {
        console.log(response.data[0].data);
        this.progress = response.data[0].data; 
        console.log("During progress");
    })
    console.log("After progress");
  },
  computed:{
    ...mapGetters({
        currentUser: 'currentUser',
        profile:'currentProfile'
      }

    ),

  },
  methods:{
    ...mapMutations([
      'setUserProfile'
    ]),
    logout(e){
      e.preventDefault();
      console.log(" logout")
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      this.$router.push('/login')
    },

    update(e){
      if(this.form_name != ''){
        data.profile.name = data.form_name;

      }
      if(this.form_description != ''){
        data.profile.description = data.form_description;
      }
      HTTP.patch('/api/profile', data.profile).then(res => {
        if(this.$route.params.nextUrl != null){
          this.$router.push(this.$route.params.nextUrl)
        }
        else{
          this.$router.push('/profile')
        }
      }).catch(error => {
        console.error(error);
      });
    }

  }
}
</script>

