import Vuex from 'vuex'
import postModule from './postModule';

const store = new Vuex.Store({
  
  modules: {
    post : postModule
  }
})


export default store;