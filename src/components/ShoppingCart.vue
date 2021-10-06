<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products">
          {{product.title}} - {{product.price | currency}} - {{product.quantity}}
      </li>
    </ul>
    <p>Total: {{total | currency}}</p>

    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{$store.state.checkoutStatus}}</p>
  </div>
</template>

<script>
import {mapGetters,mapState, mapActions} from "vuex";

export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal'
    }),

    // products (){
    //   return this.$store.getters.cartProducts
    // },
    // total () {
    //   return this.$store.getters.cartTotal
    // }

    ...mapState({
      checkoutStatus: 'checkoutStatus'
    })

  },
  methods: {
    ...mapActions({
      checkout: 'checkout'
    }),
  }
}
</script>

<style scoped>

</style>
