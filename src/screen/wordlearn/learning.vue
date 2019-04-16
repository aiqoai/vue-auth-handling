<template>
  <div class="hello">
  <h1>Learning Deck </h1>
    <h2>{{wordCatagory}}</h2>
  <el-collapse accordion>
    <el-collapse-item v-for="w in wordList" :key="w.id" :title="w.word" :name="w.word">
      <el-row>
      <el-col :span="20">
        <div class="grid-content" v-for="pos in w.part_of_speech" :key="pos.type">
          <strong>{{pos.type}}</strong>
          {{pos.definition}}
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-button type="warning" icon="el-icon-message" circle @click.prevent="switchView()"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click.prevent="playSound(w.sound_url)" ></el-button>
          <el-button type="success" icon="el-icon-star-off" circle></el-button>
        </div>
      </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>


  <el-carousel :interval="4000" type="card" height="600px" >
    <el-carousel-item v-for="w in wordList" :key="w.id">
      <h3 class="center">{{ w.word }}
        <el-button type="primary" icon="el-icon-edit" circle @click.prevent="playSound(w.sound_url)" ></el-button>
      </h3>
      <h3 class="center"><img :src="w.picture_url" class="image"></h3>
      <div class="center"><div class="grid-content" v-for="pos in w.part_of_speech" :key="pos.type">
          <strong>{{pos.type}}</strong>
          {{pos.definition}}
        </div></div>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      msg: 'learning',
      activeName: '2'
    }
  },
  methods: {
    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    switchView() {
      console.log("Switching View");
    }
  },

  
  computed: {

    ...mapGetters({
                 testCategories: 'testCategories',
                 userCategories: 'userCategories',
                 wordList: 'wordList',
                 wordCatagory: 'wordCatagory'
               })
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
}

.image {
  height: 200px;
  width: 200px;
}

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
