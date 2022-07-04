import { createStore } from 'vuex';

export default createStore({
    state: {
        uid: null,
    },

    getters: {
    },

    mutations: {
        setUserID (state, payload) {
            state.uid = payload;
        },
    },

    actions: {
    }

});
