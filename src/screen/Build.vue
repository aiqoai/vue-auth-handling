<template>
  <div class="hello">
    <h1>Build your personalized learning pathway</h1>
    <h1>Build your learning material and selling in the content marketplace </h1>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  methods: {
    callback (data) {
      console.log(data)
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
