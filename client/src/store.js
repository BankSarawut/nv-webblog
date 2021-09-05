import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict:true,
    Plugins:[
        createPersistedState()
    ],
    state:{
        token:null,
        user:null,
        isUserLoggedIn:false,
    },
    mutations:{
        setToken(stae,token){
            stae.token = token
            stae.isUserLoggedIn = !!(token)
        },
        setUser(state,user){
            state.user = user
        }
    },
    actions:{
        setToken({ commit},token){
            commit('setToken',token)
        },
        setUser({commit},user){
            commit('setUser',user)
        }
    } 
})