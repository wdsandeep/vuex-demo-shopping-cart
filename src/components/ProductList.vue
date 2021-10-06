<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif"/>
    <ul v-else>
      <li v-for="product in products">
        {{product.title}} - {{product.price | currency}} - {{product.inventory}}
        <button :disabled="!productIsInStock(product)" @click="addProductToCart(product)">Add to Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: "ProductList",
  data() {
    return {
      loading: false,
      productIndex: 1
    }
  },

  computed: {
    ...mapState({
      products: state => state.products.items,  // 'products'
      // firstProduct: state => state.products[0],
      // specificProduct(state) {
      //   return state.products[this.productIndex]
      // }
    }),

    // products () {
    //   return this.$store.state.products
    // },

    ...mapGetters('products', {
      productIsInStock: 'productIsInStock'
    }),

    // productIsInStock () {
    //   return this.$store.getters.productIsInStock
    // }

  },
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart'
    }),

    // addProductToCart(product) {
    //   this.$store.dispatch('addProductToCart', product)
    // }

  },
  created() {
    this.loading = true
     this.fetchProducts() //this.$store.dispatch('fetchProducts')
    .then(()=> this.loading = false)
  }
}
</script>

<style scoped>

</style>
