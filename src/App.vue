<template>
  <el-container id="app">
<!--    <el-aside width="200px">Category</el-aside>-->
    <el-container>
      <el-header>
        <nav-bar></nav-bar>
      </el-header>
      <el-main>

<!--        <div  >-->
          <router-view/>
<!--        </div>-->

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

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
