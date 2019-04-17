<template>
  <div class="hello">
    <h1>This is practice</h1>
    <h2>{{msg}}</h2>
    <div class="block">
      <span class="demonstration">When you have few pages</span>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      msg: 'learning',
      selectedWord: ''
    }
  },
  methods: {
    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    switchView(w) {
      console.log("Switching View");
      this.selectedWord = w;
      console.log(this.selectedWord);
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
