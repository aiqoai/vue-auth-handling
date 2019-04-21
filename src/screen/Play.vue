<template>
  <div class="hello">
    <h1>Play word game</h1>
<!--    <h2>{{msg}}</h2>-->
    <audio-recorder
      upload-url="http://localhost:4000/api/pronunciation"
      :attempts="3"
      :time="2"
      :headers="headers"
      :before-recording="callback"
      :pause-recording="callback"
      :after-recording="callback"
      :select-record="callback"
      :before-upload="callback"
      :successful-upload="callback"
      :failed-upload="callback"/>
    <div>

      <label>Score:</label>
      <div>{{ JSON.stringify(scoringdata) }}</div>
      <div>{{JSON.stringify(wordsscore[0])}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!',
      scoringdata:{},
      wordsscore:[],
      headers:{}
    }
  },
  methods: {
    callback (data) {
      console.log(data)
      if(data.data){

        this.scoringdata=data.data.text_score.quality_score;
        this.wordsscore=data.data.text_score.word_score_list
      }
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
