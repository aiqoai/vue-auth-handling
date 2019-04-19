<template>
  <div class="hello">
    <div class="column">
        
    
  <h1 v-show="!selectedWord">Learning Deck </h1>
  <h2 v-show="!selectedWord">{{wordCatagory}}</h2>
  <el-collapse accordion v-show="!selectedWord" @change="handleNewWord">
    <el-collapse-item v-for="w in wordList" :key="w._id" :title="w.word" :name="w._id">
      <el-row >
      <el-col :span="20">
        <div class="grid-content" v-for="pos in w.part_of_speech" :key="pos.type">
          <strong>
            {{pos.type}}
            </strong>
          {{pos.definition}}
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-button type="warning" icon="el-icon-tickets" circle @click.prevent="switchView(w)"></el-button>
          <el-button type="primary" icon="el-icon-caret-right" circle @click.prevent="playSound(w.sound_url)" ></el-button>
          <el-button type="success" :key="updateFavorite + w._id + 'on'" v-if="w.favorite && w.favorite == true" icon="el-icon-star-on" circle @click="favorite(w)"></el-button>
          <el-button type="info" :key="updateFavorite + w._id + 'off'" v-else icon="el-icon-star-off" circle @click="favorite(w)"></el-button>
          </div>
      </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>

  <div v-if="selectedWord">
    <div class="grid-content">
      <el-button type="warning" icon="el-icon-back" circle @click.prevent="switchView('')"></el-button>
      <el-button type="primary" icon="el-icon-caret-right" circle @click.prevent="playSound(selectedWord.sound_url)" ></el-button>
      <el-button type="success" :key="updateFavorite + selectedWord._id + 'selon'" v-show="selectedWord && selectedWord.favorite" icon="el-icon-star-on" circle @click="favorite(selectedWord)"></el-button>
      <el-button type="info" :key="updateFavorite + selectedWord._id + 'seloff'" v-show="selectedWord && !selectedWord.favorite" icon="el-icon-star-off" circle @click="favorite(selectedWord)"></el-button>

      <div style="float:right;">
        <el-button type="success" icon="el-icon-arrow-left" @click="getPrev">Previous Word</el-button>
        <el-button type="success"  icon="el-icon-arrow-right" @click="getNext">Next Word</el-button>
      </div>
       </div>
    <h2>{{selectedWord.word}}</h2> 
    <div class="picture">
        <img :src="selectedWord.picture_url" class="image" width="500px">
    </div>
 
    <div v-for="p in selectedWord.part_of_speech" :key="p.type">
    <div>{{p.type}}</div> <strong>{{p.definition}}</strong>
    <div v-for="t in p.translation" :key="t.zh">{{t.zh}}</div>
    <li v-for="s in p.sentence" :key="s">{{s}}</li>
    <div v-if="p.synonyms">Synonyms: <label v-for="syn in p.synonyms" :key="syn">{{syn}}</label> </div>
    <div v-if="p.encoding">Encoding: <label v-for="enc in p.encoding" :key="enc" style="white-space: pre-line">{{enc}}</label> </div>
    </div>
    <strong v-if="selectedWord.root">Roots</strong>
    <div v-for="r in selectedWord.root" :key="r.type">
      {{r.origin}} : {{r.root}}
    </div>
  </div>

  </div>
  </div>
</template>

<style>
.image{
    height: 300px;
    width: 500px;
}
.picture{
   
    margin-bottom: 30px;
}

.h1{font-size: 30px;
color:#06597D;}
    .column{
        width: 70%;
        margin-left: 15%;
        margin-right: 15%;

    }

    .el-collapse-item__header {
        font-size: 22px;
        color: #041F3D;
        padding-top: 10px;
    }
     .el-collapse-item__header:hover{
        font-size: 22px;
        color: #EA3232;
        padding-top: 10px;
    }
    .el-collapse-item__content {
    padding-bottom: 25px;
    font-size: 18px;
    color: #303133;
    line-height: 1.769230769230769;
}

</style>



<script>
import {HTTP} from '../../store/httpcommon';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Vue from 'vue';

export default {
  data () {
    return {
      msg: 'learning',
      selectedWord: '',
      query: {
        'wordset': '',
        'level': ''
      },
      viewedWords: new Set(),
      reportSubmitted: false,
      updateFavorite: 0
    }
  },
  methods: {
    ...mapMutations([
      'markFavorite',
      'setWordList',
      'setWordCategory'
    ]),
    handleNewWord(word_id) {
      if (this.reportSubmitted) {
        return;
      }
      this.viewedWords.add(word_id);
      if (this.viewedWords.size == this.wordList.length) {
        console.log("All words are viewed!!", this.query);
        let progress = {
          "category_name": this.query.wordset,
          "category_id": String(1),
          "set": String(this.query.level),
          "achievement": "learning",
          "completion_date": new Date().toISOString().split('T')[0] + 'UTC',
          "last_access": new Date().toISOString().split('T')[0] + 'UTC'
        };
        HTTP.post('/api/progress', progress).then(response => {
          console.log("Received from server: ", response.data);
        });
        this.reportSubmitted = true;
      }
    },
    getNext() {
      let id = this.wordList.indexOf(this.selectedWord);
      if (id || id == 0) {
        id += 1;
        if (this.wordList[id]) {
          this.selectedWord = this.wordList[id];
        }
      }
      this.handleNewWord(this.selectedWord._id);
    },
    getPrev() {
      let idx = this.wordList.indexOf(this.selectedWord);
      if (idx || idx == 0) {
        idx -= 1;
        if (idx > -1 && this.wordList[idx]) {
          this.selectedWord = this.wordList[idx];
        }
      }
      this.handleNewWord(this.selectedWord._id);
    },
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
        let star = w.favorite ? false : true;
        // The following object is in accordance with the backend seed_data/favourite.JSON file. 
        // If that changes, change it too.
        let fav = {
            "word_id": w._id,
            "is_active": star
        }
        console.log(fav);
        HTTP.put('/api/favorite', fav).then(response => {
          console.log("Received from server: ", response.statusText);
          if (response) {
            this.markFavorite(w);
            // Update the favorite icon. Two hacks:
            this.updateFavorite += 1;
            // this.$forceUpdate();
          }
        })
      }
    }
  },

  created() {
    this.loading = true;

    if(this.$route.params.hasOwnProperty('wordset') && this.$route.params.wordset) {
      this.query.wordset = this.$route.params.wordset;
    }
    if(this.$route.params.hasOwnProperty('level') && this.$route.params.level) {
      this.query.level = this.$route.params.level;
    }
    this.loading = false;
    console.log("Query", this.query);

    if (!this.problems || this.problems.length == 0) {
      HTTP.post('/api/word/query_words', {
        category: this.query.wordset,
        level: String(this.query.level)
      }).then(response => {
        console.log("Received from server: ", response.data);
        this.setWordList(response.data.data);
      })
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
      /* Not used */
      if(word.favorite == true)
      {
        return "el-icon-star-on";
      }
      else return "el-icon-star-off";
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
  height: 300px;
  width: 500px;
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
