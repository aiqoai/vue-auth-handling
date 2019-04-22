<template>
  <div class="hello">
        <el-row>

                <el-col :span="24"><div class="build-header">
                    <img src="../assets/build-page.png" width="100%">
                </div>
            </el-col>
        </el-row>
    
    <el-row :gutter="24">
        <el-col :span="18" :offset="6">
                <el-card class="box-card">
                    <table>
                      <tr>
                        <h3>Enter your word</h3>
                        <td><input v-model="word"></input></td>
                      </tr>
                      <tr>
                        <h3>Enter your Definition</h3>
                        <td><input v-model="definition"></input></td>
                      </tr>
                      <tr>
                        <h3>Add an image URL</h3>
                        <td><input v-model="picture_url"></input></td>
                        <td><img :src=picture_url></td>
                      </tr>
                      <tr>
                        <h3>Enter a translation</h3>
                        <td><input v-model="translation"></input></td>
                      </tr>
                      <tr>
                        <h3>Enter your Encodings</h3>
                        <td><vue-tags-input
                          v-model="encoding_tag"
                          :tags="encoding_tags"
                          :placeholder="encoding_text"
                          @tags-changed="newTags => encoding_tags = newTags"
                          :allow-edit-tags="true"
                        /></td>
                      </tr>
                      <tr>
                        <h3>Enter example Sentences</h3>
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
                    
                 <el-button type="danger" round  @click="submit" class="sub-button">Upload Word </el-button>
                 <el-button type="info" @click="checkWords"> Word Collection</el-button>
                </el-card>
        </el-col>
    </el-row>


</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .sub-button{
        margin-top: 15px;
        color: white;
        font-size: 15px;
    }
input {
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    padding: 4px 70px;
    border-width: 2px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
   
}
input, textarea, select, button {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    margin-top: 0em;
    margin-right: 0em;
    margin-bottom: 0em;
    
    font: 400 11px system-ui;
}

.box-card{
    width: 65%;
    margin-top: 3%;

}
.build-header{
    position: relative;
    z-index: -1;
    margin-top: -20px;
}

h3{font-size: 15px;
    
  color:#090218;
  line-height: 0.5;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

</style>










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
            this.sentence_tag = null;
            this.sentence_tags = null;
            this.sentence_text = "add sentences here";
            this.encoding_tag = '';
            this.encoding_tags = null;
            this.encoding_text = "add encodings here";
            this.word = null;
            this.definition =  null;
            this.picture_url = null;
            this.translation = null;
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

