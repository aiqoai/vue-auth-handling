<template>
<div class="hello">
    <h1>Learning Deck </h1>
    <h2>{{wordCatagory}}</h2>
    <el-row>
    <el-button type="primary" v-on:click="redirectToLearn(1)" >Level 1</el-button>
    </el-row>

    <el-row>
    <el-button type="primary" v-on:click="redirectToLearn(2)">Level 2</el-button>
    </el-row>

    <el-row>
    <el-button type="primary" v-on:click="redirectToLearn(3)">Level 3</el-button>
    </el-row>

    <el-row>
    <el-button type="primary" v-on:click="redirectToLearn(4)">Practice</el-button>
    <el-button type="primary" v-on:click="redirectToLearn(5)">Test</el-button>
    </el-row>

</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      msg: 'learning',
      selectedWord: ''
    }
  },
  methods: {
    ...mapMutations([
      'markFavorite'
    ]),
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
    },
    redirectToLearn(w) {
        this.$router.push('/learning');
    }
  },

  computed: {
    ...mapGetters({
      testCategories: 'testCategories',
      userCategories: 'userCategories',
      wordList: 'wordList',
      wordCatagory: 'wordCatagory'
    }),
    favClass: function(word) {
      if(word.favorite == true)
      {
        return "el-icon-star-on";
      }
      else return "el-icon-star-off"
    }
  }
}
</script>

<style>

</style>
