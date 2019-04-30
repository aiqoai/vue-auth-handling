<template>
  <div class="hello">
    <h1>Play word game</h1>
<!--    <h2>{{msg}}</h2>-->
    <table>
      <tr>
        <td>
          <audio-recorder
            :upload-url="sendURL"
            :attempts="3"
            :time="2"
            :headers="headers"
            :select-record="prepareURL"
            :before-upload="prepareURL"
            :successful-upload="callback"
            :failed-upload="callback"/>
          <!--      :before-recording="callback"-->
          <!--      :pause-recording="callback"-->
          <!--      :after-recording="callback"-->
        </td>
        <td v-bind:style="{padding: '2em'}"></td>
        <td>
          <div>
            <br/>
            <div>
              <Label>Enter Text to Compare to:</Label>
              <input v-model="text_to_compare"></input>
              <br/>
              <br/>
              <div>{{text_to_compare}}</div>
              <br/>
            </div>
            <label>Score:</label>
            <div>{{ JSON.stringify(scoringdata) }}</div>
            <table>
                <tr>
                  <td v-for="word in  wordsscore" @click="showModal(word)" >
                    <span v-if="word.quality_score > 70" v-bind:style="{color: 'green'}">{{word.word}}</span>
                    <span v-else v-bind:style="{color: 'red'}" @click="showModal" >{{word.word}}</span>
                  </td>
<!--                  <td v-if="word.quality_score > 70" v-bind:style="{color: 'green'}">{{word.word}}</td>-->
<!--                  <td v-else v-bind:style="{color: 'red'}" @click="showModal" >{{word.word}}</td>-->
<!--                  <td v-for="phoneme in word.phone_score_list">-->
<!--                    <span v-if="phoneme.quality_score > 70" v-bind:style="{color: 'green'}" >{{phoneme.phone}} </span>-->
<!--                    <span v-else v-bind:style="{color: 'red'}" >{{phoneme.phone}} </span>-->
<!--                  </td>-->
                </tr>
                <voiceModal
                  v-show="isModalVisible"
                  @close="closeModal"
                >
                  <template v-slot:body>
                    <table>
                      <tr>
                        <th>Sound</th>
                        <th>Rating</th>
                        <th>Score</th>
                      </tr>
                      <tr v-for="phoneme in WordToCheck.phone_score_list">
                        <td>{{phoneme.phone}}</td>
                        <td v-if="phoneme.quality_score > 70" v-bind:style="{color: 'green'}"> GOOD</td>
                        <td v-else-if="phoneme.quality_score > 40" v-bind:style="{color: '#CCCC00'}"> OKAY</td>
                        <td v-else-if="phoneme.sound_most_like == null" v-bind:style="{color: 'red'}">No Input</td>
                        <td v-else v-bind:style="{color: 'red'}">Sounds Like {{phoneme.sound_most_like}}</td>
                        <td>{{phoneme.quality_score}} </td>
                      </tr>
                    </table>
                  </template>
                  <template v-slot:footer>
                  </template>
                </voiceModal>
            </table>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import voiceModal from '../components/VoiceModal.vue';

export default {
  name: 'Play',
  components: {
    voiceModal,
  },
  data () {
    return {
      text_to_compare: "",
      msg: 'Hello World!',
      scoringdata:{},
      wordsscore:[],
      headers: {"Authorization": "Bearer "+ localStorage.getItem('jwt')},
      baseURL: process.env.APP_API_PATH + "api/pronunciation?text=",
      sendURL: process.env.APP_API_PATH,
      isModalVisible: false,
      WordToCheck: {},
    }
  },
  methods: {
    callback (data) {
      console.log(data)
      if(data.data){

        this.scoringdata=data.data.text_score.quality_score;
        this.wordsscore=data.data.text_score.word_score_list;
      }
    },
    prepareURL (data) {
      console.log(this.headers)
      this.sendURL = this.baseURL + this.text_to_compare
    },
    showModal(data) {
      this.WordToCheck = data;
      this.isModalVisible = true;
      console.log(this.WordToCheck)
      console.log(data)
    },
    closeModal() {
      this.isModalVisible = false;
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
