<template>
  <div>
    <div>
      <h1>User  Board :::{{JSON.stringify(currentUser)}}</h1>
      <template v-if="profile">
        <table>
          <tr>
            <td>Name:</td>
            <td>{{profile.name}}</td>
            <td><input v-model="form_name"></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{{profile.email}}</td>
            <td></td>
          </tr>
          <tr>
            <td>About Me:</td>
            <td>{{profile.description}}</td>
            <td><input v-model="form_description"></td>
          </tr>
          <tr>
          <tr>
            <td>Current Level:</td>
            <td>{{profile.current_level}}</td>
            <td></td>
          </tr>
          <tr>
            <td>Current Category:</td>
            <td>{{profile.current_category}}</td>
            <td></td>
          </tr>
          <tr>
            <td>Member Since: </td>
            <td>{{profile.registration_datetime}}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td><button @click="update">Update</button></td>
          </tr>
        </table>
      </template>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
