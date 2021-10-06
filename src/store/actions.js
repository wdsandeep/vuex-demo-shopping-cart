import shop from '@/api/shop'

export default {
  fetchProducts (context) {
  // make the call (methods)
  return new Promise((resolve, reject)=> {
    shop.getProducts(products => {
      context.commit('setProducts', products)
      resolve()
    })

  })
},

  addProductToCart({state, getters, commit}, product) {

  if(getters.productIsInStock(product)) { //product.inventory > 0
    const cartItem = state.cart.find(item => item.id === product.id)
    if(!cartItem){
      //pushProductToCart
      commit('pushProductToCart', product.id)
    } else {
      //incrementItemQuantity
      commit('incrementItemQuantity', cartItem)
    }
    commit('decrementProductInventory', product)

  }
},

  checkout ({state, commit}) {
  shop.buyProducts(
    state.cart,
    ()=>{
      commit('emptyCart')
      commit('setCheckoutStatus', 'success')
    },
    ()=>{
      commit('setCheckoutStatus','fail')
    }
  )
}
}
