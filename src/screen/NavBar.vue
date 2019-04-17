<template>
	  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#B3C0D1" text-color="#333" active-text-color="#064672">
    <el-menu-item><router-link to="/" class="nav-item">
        <img src="../assets/logo-alt.png" alt="Bulma logo">
      </router-link>
    </el-menu-item>
    <el-menu-item index="1"><router-link to="/" class="nav-item">Home</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/catalogue" class="nav-item">Catalogue</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/build" class="nav-item">Build</router-link></el-menu-item>
    <el-menu-item index="4"><router-link to="/play" class="nav-item">Play</router-link></el-menu-item>
    <el-menu-item index="5"><router-link to="/login" class="nav-item">Login</router-link></el-menu-item>
    <el-menu-item index="6"><router-link to="/register" class="nav-item">Sign Up</router-link></el-menu-item>

    <el-menu-item index="7"><router-link to="/profile" class="nav-item">Profile</router-link></el-menu-item>

      <el-menu-item index="8">

        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
                    Message<el-badge :value="3" class="item">
                    </el-badge>

            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              comments
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              replies
              <el-badge class="mark" :value="3" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>



      </el-menu-item>



  </el-menu>

</template>

<style scoped>
.nav {
	height: auto;
	margin-bottom: 2rem;
}

.nav-item img {
    max-height: 3.5rem;
}

.active-bottom-border {
	border-bottom: 3px solid #00d1b2;
    color: #064672;
    padding-bottom: calc(.75rem - 8px);
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      activeIndex:"0"
    }
  },
  methods:{
    handleSelect(index){
      console.log("selected: ",index)
      if(index=='1'){
        this.$router.push('/');
      }
      else if(index=='2'){
        this.$router.push('/catalogue');
      }
      else if(index=='3'){
        this.$router.push('/build');
      }
      else if(index=='4'){
        this.$router.push('/play');
      }
      else if(index=='5'){
        this.$router.push('/login');
      }
      else if(index=='6'){
        this.$router.push('/register');
      }
      else if(index=='7')
        this.$router.push('/profile');
      else{
        this.$router.push('/');
      }
    }
  },
	computed: {
		itemsInCart(){
			let cart = this.$store.getters.cartProducts;
			return cart.reduce((accum, item) => accum + item.quantity, 0)
		}
	}
}
</script>
