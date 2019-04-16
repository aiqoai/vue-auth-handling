<template>
  <div >
    <h1>Home</h1>
    <h2>{{msg}}</h2>
    <el-row>
      <el-col :span="5"><div class="grid-content"></div></el-col>
      <el-col :span="14">{{JSON.stringify(testCategories)}}
        <el-carousel arrow="always" :autoplay="false">
<!--        <el-carousel-item v-for="i in skillTest.length" :key="i">-->
<!--            <h3>{{ i }}-->
<!--            </h3>-->
<!--          </el-carousel-item>-->
        </el-carousel>  
      </el-col>
      <el-col :span="5"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters({
      testCategories: 'testCategories'
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
      msg: 'This is your home page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    height: 600px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-col {
    border-radius: 4px;
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
    min-height: 36px;
  }
</style>
