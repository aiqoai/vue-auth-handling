<template>
	<nav class="nav has-shadow" style='box-shadow: 0 1px 0 rgba(219,219,219,.3);'>
	  <div >
	    <router-link to="/" class="nav-item">
	      <img src="../assets/logo-alt.png" alt="Bulma logo">
	    </router-link>

      <router-link to="/dashboard" class="nav-item is-tab" exact-active-class="is-active">
        dashboard
      </router-link>

      <router-link to="/login"  >
        login
      </router-link>

      <router-link to="/register" >
        register
      </router-link>

      <router-link to="/products" >
        products
      </router-link>

      <router-link to="/cart" >
        cart
      </router-link>




      <router-link to="/admin" class="nav-item is-tab" exact-active-class="is-active">
        admin
      </router-link>


      <router-link to='/cart' class="button is-info">
	            <span class="icon">
	              <i class="fa fa-shopping-cart"></i>
	            </span>
        <span>Checkout ({{itemsInCart}})</span>
      </router-link>

	  </div>



	</nav>
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
