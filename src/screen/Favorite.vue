<template>
  <div class="hello">
    <h1>Favorites</h1>
    <div>
    <table>
      <tr v-for="fav in favorites">
        <td v-for="value in fav">{{value}}</td>
      </tr>
    </table>
  </div>
  </div>
</template>

<script>
  import {HTTP} from "../store/httpcommon";
  let data = {
    favorites: []
  }
  export default {
    data () {
      return data
    },
    mounted: function(){
      HTTP.get('/api/favorite', {headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then(response => {
        data.favorites = response.data.data
        console.log(response.data)
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
