<template>
  <div class="hello">
    <div>Word Collection Builder</div>
    <table>
      <tr>
        <td>Enter your word</td>
        <td><input v-model="word"></input></td>
      </tr>
      <tr>
        <td>Enter your Definition</td>
        <td><input v-model="definition"></input></td>
      </tr>
      <tr>
        <td>Add an image URL</td>
        <td><input v-model="picture_url"></input></td>
        <td><img :src=picture_url></td>
      </tr>
      <tr>
        <td>Enter a translation</td>
        <td><input v-model="translation"></input></td>
      </tr>
      <tr>
        <td>Enter your Encodings</td>
        <td><vue-tags-input
          v-model="encoding_tag"
          :tags="encoding_tags"
          :placeholder="encoding_text"
          @tags-changed="newTags => encoding_tags = newTags"
          :allow-edit-tags="true"
        /></td>
      </tr>
      <tr>
        <td>Enter example Sentences</td>
        <td><vue-tags-input
          v-model="sentence_tag"
          :tags="sentence_tags"
          :placeholder="sentence_text"
          @tags-changed="newTags => sentence_tags = newTags"
          :allow-edit-tags="true"
        /></td>
      </tr>
    </table>
    <div v-if="msg.length > 0">{{msg}}</div>
    <button @click="submit"> Upload Word</button>
    <button @click="checkWords"> Checkout my Words</button>

  </div>

</template>
<script>
  import VueTagsInput from '@johmun/vue-tags-input';
  import {HTTP} from "../store/httpcommon";

  export default {
    components: {
      VueTagsInput,
    },
    data() {
      return {
        msg: '',
        sentence_tag: '',
        sentence_tags: [],
        sentence_text: "add sentences here",
        encoding_tag: '',
        encoding_tags: [],
        encoding_text: "add encodings here",
        word: '',
        definition: '',
        picture_url: '',
        translation: '',
      };
    },
    methods: {
      submit(e){
        e.preventDefault();
        let part_of_speech = [
          {
            "definition": this.definition,
            "translation": [{"translation": this.translation}],
            "sentence": this.sentence_tags.map(tag => tag.text),
            "encoding": this.encoding_tags.map(tag => tag.text),

          }
        ];
        let data = {
          "word": this.word,
          "picture_url": this.picture_url,
          "part_of_speech" : part_of_speech,
        };
        HTTP.post("/api/word", data)
          .then(response => {
            this.msg = 'Word Succesfully Uploaded';
            this.sentence_tag = '';
            this.sentence_tags = [];
            this.sentence_text = "add sentences here";
            this.encoding_tag = '';
            this.encoding_tags = [];
            this.encoding_text = "add encodings here";
            this.word = '';
            this.definition =  '';
            this.picture_url = '';
            this.translation = '';
            console.log(response);
      }).catch(error => {
          this.msg = 'Upload was Unsuccessfully';
          console.log(error);
        });
      },
      checkWords(path) {
        this.$router.push('/learning/mywords/1')
      },
    },
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
