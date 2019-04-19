<template>
  <div class="hello">
  <h1>Favorite Words </h1>
  <div >
  <el-collapse accordion v-show="!selectedWord">
    <el-collapse-item v-for="w in favorites" :key="w._id" :title="w.word" :name="w.word">
      <el-row>
      <el-col :span="20">
        <div class="grid-content" v-for="pos in w.part_of_speech" :key="pos.type">
          <strong>{{pos.type}}</strong>
          {{pos.definition}}
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <el-button type="warning" icon="el-icon-tickets" circle @click.prevent="switchView(w)"></el-button>
          <el-button type="primary" icon="el-icon-caret-right" circle @click.prevent="playSound(w.sound_url)" ></el-button>
          <el-button type="success" :key="updateFavorite + w._id + 'on'" v-if="w.favorite && w.favorite == true" icon="el-icon-star-on" circle @click="favorite(w)"></el-button>
          <el-button type="success" :key="updateFavorite + w._id + 'off'" v-else icon="el-icon-star-off" circle @click="favorite(w)"></el-button>
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
      <el-button type="success" :key="updateFavorite + selectedWord._id + 'seloff'" v-show="selectedWord && !selectedWord.favorite" icon="el-icon-star-off" circle @click="favorite(selectedWord)"></el-button>

      <div style="float:right;">
        <el-button type="success" plain icon="el-icon-arrow-left" @click="getPrev">Previous Word</el-button>
        <el-button type="success" plain icon="el-icon-arrow-right" @click="getNext">Next Word</el-button>
      </div>
       </div>
    <h2>{{selectedWord.word}}</h2> 
    <img :src="selectedWord.picture_url" class="image">
    <div v-for="p in selectedWord.part_of_speech" :key="p.type">
    <div>{{p.type}}</div> <strong>{{p.definition}}</strong>
    <div v-for="t in p.translation" :key="t.zh">{{t.zh}}</div>
    <li v-for="s in p.sentence" :key="s">{{s}}</li>
    <div v-if="p.synonyms">Synonyms: <label v-for="syn in p.synonyms" :key="syn">{{syn}}</label> </div>
    <div v-if="p.encoding">Encoding: <label v-for="enc in p.encoding" :key="enc" style="white-space: pre-line">{{enc}}</label> </div>
    </div>
    <strong v-if="selectedWord.root">Roots</strong>
    <div v-for="r in selectedWord.root" :key="r.type">
      {{r.type}} : {{r.root}}
    </div>
  </div>
  </div>
  </div>
</template>

<script>
  import {HTTP} from "../store/httpcommon";
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import Vue from 'vue';
  export default {
    data () {
      return {
        msg: 'Favorite',
        selectedWord: '',
        updateFavorite: 0,
        favorites: []
      }
    },
    methods: {
      ...mapMutations([
        'markFavorite',
        'setFavorites'
      ]),
      getNext() {
        let id = this.favorites.indexOf(this.selectedWord);
        if (id || id == 0) {
          id += 1;
          if (this.favorites[id]) {
            this.selectedWord = this.favorites[id];
          }
        }
      },
      getPrev() {
        let idx = this.favorites.indexOf(this.selectedWord);
        if (idx || idx == 0) {
          idx -= 1;
          if (idx > -1 && this.favorites[idx]) {
            this.selectedWord = this.favorites[idx];
          }
        }
      },
      playSound (sound) {
        if(sound) {
          var audio = new Audio(sound);
          audio.play();
        }
      },
      switchView(w) {
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
      console.log("Query", this.query);

      if (!this.favorites || this.favorites.length == 0) {
      HTTP.post('/api/word/favorite_words').then(response => {
          console.log("Received from server: ", response.data);
          this.favorites = response.data.data;
          this.setFavorites(response.data.data);
          console.log("Updated favorites", this.favorites);
        })
      }
    },

    computed: {
      ...mapGetters({
        // favorites: 'favorites'
      })
    }
  }
</script>

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
