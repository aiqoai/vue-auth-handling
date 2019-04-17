<template>
  <div class="hello">
  <h1 v-show="!selectedWord">Learning Deck </h1>
  <h2 v-show="!selectedWord">{{wordCatagory}}</h2>
  <el-collapse accordion v-show="!selectedWord">
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
          <!-- {{JSON.stringify(String(w.favorite))}} -->
          <el-button type="warning" icon="el-icon-tickets" circle @click.prevent="switchView(w)"></el-button>
          <el-button type="primary" icon="el-icon-caret-right" circle @click.prevent="playSound(w.sound_url)" ></el-button>
          <el-button type="success" v-if="w.favorite && w.favorite == true" icon="el-icon-star-on" circle @click.prevent="favorite(w)"></el-button>
          <el-button type="success" v-else icon="el-icon-star-off" circle @click.prevent="favorite(w)"></el-button>
          </div>
      </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>

  <div v-if="selectedWord">
    <div class="grid-content">
      <el-button type="warning" icon="el-icon-back" circle @click.prevent="switchView('')"></el-button>
      <el-button type="primary" icon="el-icon-caret-right" circle @click.prevent="playSound(selectedWord.sound_url)" ></el-button>
      <el-button type="success" v-show="selectedWord && selectedWord.favorite" icon="el-icon-star-on" circle @click.prevent="favorite(selectedWord)"></el-button>
      <el-button type="success" v-show="selectedWord && !selectedWord.favorite" icon="el-icon-star-off" circle @click.prevent="favorite(selectedWord)"></el-button>
       </div>
    <h2>{{selectedWord.word}}</h2> 
    <!-- <div class="play" @click.prevent="playSound(w.sound_url)"></div>{{selectedWord.pronunciation}} -->
    <img :src="selectedWord.picture_url" class="image">
    <div v-for="p in selectedWord.part_of_speech" :key="p.type">
    <div>{{p.type}}</div> <strong>{{p.definition}}</strong>
    <div v-for="t in p.translation" :key="t.zh">{{t.zh}}</div>
    <li v-for="s in p.sentence" :key="s">{{s}}</li>
    <div v-if="p.synonyms">Synonyms: <label v-for="syn in p.synonyms" :key="syn">{{syn}}</label> </div>
    <div v-if="p.encoding">Encoding: <label v-for="enc in p.encoding" :key="enc">{{enc}}</label> </div>
    </div>
    <strong v-if="selectedWord.root">Roots</strong>
    <div v-for="r in selectedWord.root" :key="r.type">
      {{r.type}} : {{r.root}}
    </div>
  </div>

  <!-- <el-carousel :interval="4000" type="card" height="600px" >
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
  </el-carousel> -->
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
    favorite(w) {
      if (w) {
        console.log("Before status: ", w.favorite);
        this.markFavorite(w);
        console.log("After status: ", w.favorite);
      }
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

.play {
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-left: 12px solid #000;
  border-bottom: 8px solid transparent;
}
</style>
