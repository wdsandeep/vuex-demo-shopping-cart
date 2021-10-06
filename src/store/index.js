import Vuex from 'vuex'
import Vue from 'vue'
import actions from "@/store/actions";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{ //data
    products: [],
    // {id, quantity}
    cart: [],
    checkoutStatus: null
  },

  getters: { // = computed properties
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    },

    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(product => product.id === cartItem.id )
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal (state, getters) {
      // let total = 0
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity
      // })
      // return total
      return getters.cartProducts.reduce((total, product)=> total + product.price * product.quantity, 0 )
    },
  // dynamic getter
    productIsInStock() {
        return (product) => {
          return product.inventory > 0
        }
    }
  },

  actions,

  mutations: {
    // Setting and updating state
    setProducts (state, products) {
      state.products = products
    },

    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      product.inventory--
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.cart = []
    }
  }


})

