<template>
  <div>
    <h1>User  Board</h1>
    <button @click="logout">Logout</button>
  </div>


</template>

<script>
export default {
  data () {
    return {
      msg: 'The commoners'
    }
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
