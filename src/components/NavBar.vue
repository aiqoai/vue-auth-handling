<template>
	  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#B3C0D1" text-color="#333" active-text-color="#00d1b2">
    <el-menu-item><router-link to="/" class="nav-item">
        <img src="../assets/logo.png" alt="Bulma logo">
      </router-link>
    </el-menu-item>
    <el-menu-item index="1"><router-link to="/" class="nav-item">Home</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/cart" class="nav-item">Category</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/products" class="nav-item">Build</router-link></el-menu-item>
    <el-menu-item index="4"><router-link to="/dashboard" class="nav-item">Gaming</router-link></el-menu-item>
    <el-menu-item index="5"><router-link to="/login" class="nav-item">Login</router-link></el-menu-item>
    <el-menu-item index="6"><router-link to="/login" class="nav-item">Sign Up</router-link></el-menu-item>
  </el-menu> 
</template>

<style >
.nav {
	height: auto;
	margin-bottom: 2rem;
}

.nav-item img {
    max-height: 3.5rem;
}

.active-bottom-border {
	border-bottom: 3px solid #00d1b2;
    color: #00d1b2;
    padding-bottom: calc(.75rem - 8px);
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		itemsInCart(){
			let cart = this.$store.getters.cartProducts;
			return cart.reduce((accum, item) => accum + item.quantity, 0)
		}
	}
}
</script>
