

<template>

    <el-row :gutter="20">
         <el-col :span="10" :offset="6">
            <h1>My profile</h1>
                <el-card class="box-card">
                      <div class="user-img">
                            <img src="../assets/user.png" width="45%">
                        </div>
                        
                    <template v-if="profile">
                    <table>
                      
                      <tr>
                        <td><h2>My Name:</h2></td>
                        <td>{{profile.name}}</td>
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
                    </template>

                
            </el-card>
        </el-col>    
    </el-row>
  
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
  import {mapGetters} from 'vuex'
  import Store from '../store/userStore'
  let data = {
    profile: null,
    form_name: "",
    form_description: ""
  }
export default {
    data(){
      return data
    }
  ,
  mounted: function(){
    HTTP.get('/api/profile', {headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(response => {
      data.profile = response.data.user
      console.log(response.data)
    })
  },
  computed:{
    ...mapGetters({
        currentUser: 'currentUser',
      }

    ),
    // user:{
    //   // get(){
    //   //   return this.currentUser
    //   // }
    // }
  },
  methods:{

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

