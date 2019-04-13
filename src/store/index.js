import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import * as userStore from './userStore';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// initial state
const state = {
  added: [],
  ...userStore.state,
  all: [
    {
      id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
      name: 'COBOL 101 vintage',
      description: 'Learn COBOL with this vintage programming book',
      price: 399
    },
    {
      id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
      name: 'Sharp C2719 curved TV',
      description: 'Watch TV like never before with the brand new curved screen technology',
      price: 1995
    },
    {
      id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
      name: 'Remmington X mechanical keyboard',
      description: 'Excellent for gaming and typing, this Remmington X keyboard ' +
        'features tactile, clicky switches for speed and accuracy',
      price: 595
    }
  ],
	  testCategories: [
	    {
	      id: '1',
	      name: 'GRE',
	      description: ['GRE learning cards'],
	      image: ''
	    },
	    {
	      id: '2',
	      name: 'SAT',
	      description: ['GRE learning cards'],
	      image: ''
	    },
	    {
	      id: '3',
	      name: 'ASUAB',
	      description: ['GRE learning cards'],
	      image: ''
	    },
	    {
	      id: '4',
	      name: 'TOEFL',
	      description: ['TOEFL learning cards'],
	      image: ''
	    },
	    {
	      id: '5',
	      name: 'Locked',
	      description: [''],
	      image: 'https://image.flaticon.com/icons/svg/44/44594.svg'
	    },
	    {
	      id: '6',
	      name: 'Locked',
	      description: [''],
	      image: 'https://image.flaticon.com/icons/svg/44/44594.svg'
	    },
	    
	  ],
	  userCategories: [
	    {
	      id: '1',
	      name: 'Mastered',
	      description: ['I\'m good!'],
	      image: 'https://images.fineartamerica.com/images-medium-large-5/tiger-growl-athena-mckinzie.jpg'
	    },
	    {
	      id: '2',
	      name: 'Hardest',
	      description: ['Keep learning'],
	      image: 'https://cdn.shopify.com/s/files/1/0900/0928/files/Wet_Cat_large.jpg?17494516074913132002'
	    },
	    {
	      id: '3',
	      name: 'Revisit',
	      description: ['Need to revisit'],
	      image: 'https://www.blogography.com/photos64/DavisonDay405.jpg'
	    },
	    
	  ],
}

// getters
const getters = {
	allProducts: state => state.all, // would need action/mutation if data fetched async
	getNumberOfProducts: state => (state.all) ? state.all.length : 0,
	testCategories: state => state.testCategories,
  userCategories: state => state.userCategories,
	cartProducts: state => {
		return state.added.map(({ id, quantity }) => {
			const product = state.all.find(p => p.id === id)

			return {
				name: product.name,
				price: product.price,
				quantity
			}
		})
	},
  ...userStore.getters,
}

// actions
const actions = {
	addToCart({ commit }, product){
		commit(types.ADD_TO_CART, {
			id: product.id
		})
	},
  ...userStore.actions,
}

// mutations
const mutations = {

	[types.ADD_TO_CART] (state, { id }) {
	    const record = state.added.find(p => p.id === id)

	    if (!record) {
	      state.added.push({
	        id,
	        quantity: 1
	      })
	    } else {
	      record.quantity++
	    }
	  },

  ...userStore.mutations
}

// one store for entire application
export default new Vuex.Store({
	state,
	strict: debug,
	getters,
	actions,
	mutations
})
