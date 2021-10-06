import shop from "@/api/shop";

export default {

  namespaced: true,

  state: {
    items: []

  },

  getters: {

    availableProducts (state, getters) {
      return state.items.filter(product => product.inventory > 0)
    },

    // dynamic getter
    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }

  },

  actions: {

    fetchProducts (context) {
      // make the call (methods)
      return new Promise((resolve, reject)=> {
        shop.getProducts(products => {
          context.commit('setProducts', products)
          resolve()
        })

      })
    },

  },

  mutations: {

    setProducts (state, products) {
      state.items = products
    },

    decrementProductInventory (state, product) {
      product.inventory--
    },

  }


}
