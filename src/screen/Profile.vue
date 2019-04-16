<template>
  <div>
    <h1>User  Board :::{{JSON.stringify(currentUser)}}</h1>
    <button @click="logout">Logout</button>
    <div>{{profile}}</div>
  </div>
</template>

<script>
<<<<<<< HEAD
  import {HTTP} from '../store/httpcommon'
  import {mapGetters} from 'vuex'
  import {} from '../store/userStore'
  let data = {
    profile: {name: "jim"}
  }
=======

  import {HTTP} from '../store/httpcommon'

  import {mapGetters} from 'vuex'
  import {} from '../store/userStore'

>>>>>>> dev
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
