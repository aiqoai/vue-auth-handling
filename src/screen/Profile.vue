<template>
  <div>
    <h1>User  Board :::{{JSON.stringify(currentUser)}}</h1>
    <button @click="logout">Logout</button>
    <div>{{profile.name}}</div>
  </div>


</template>

<script>

  import {HTTP} from '../store/httpcommon'

  import {mapGetters} from 'vuex'
  import {} from '../store/userStore'

export default {
  data () {

  },
  mounted: function(){
    HTTP.get('/api/profile').then(response => {
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
