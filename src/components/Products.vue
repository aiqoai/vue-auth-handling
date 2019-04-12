<template>
	<div>
    <el-button type="primary" icon="el-icon-edit"></el-button>
    <el-button type="primary" icon="el-icon-share"></el-button>
    <el-button type="primary" icon="el-icon-delete"></el-button>
    <el-button type="primary" icon="el-icon-search">Search</el-button>
    <el-button type="primary">Upload<i class="el-icon-upload el-icon-right"></i></el-button>
		<h1 class="title">All Products</h1>
    	<p>{{length}} products</p>
    	<table class="table is-striped">
		    <thead>
		      <tr>
		        <th>Name</th>
		        <th>Description</th>
		        <th>Price</th>
		        <th></th>
		      </tr>
		    </thead>
		    <tbody>
		      <tr v-for="product in products" track-by="id">
		        <td>{{product.name}}</td>
		        <td>{{product.description}}</td>
		        <td>${{product.price}}</td>
		        <td><button @click='addToCart(product)' class='button is-info'>Add to cart</button></td>
		      </tr>
		    </tbody>
		</table>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: mapGetters({
    products: 'allProducts',
    length: 'getNumberOfProducts'
  }),
  methods: mapActions([
    'addToCart'
  ])
}
</script>

<style >

</style>
