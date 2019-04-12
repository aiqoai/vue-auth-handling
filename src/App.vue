<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header> <nav-bar></nav-bar>
      </el-header>
      <el-main>

        <div id="app">


          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>



</template>

<script>
  import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  },
  data () {
    return {}
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
