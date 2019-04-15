import {fetchLoggedInUserData} from './Util';

// initial state
export const state = {
    currentUser:{},//fetchLoggedInUserData()
    currentProfile:{}
};

// getters
export const getters = {
    currentUser: state => state.currentUser
};

// actions
export const actions = {};

export const mutations = {
    setCurrentUserData (state, payload){
        console.log("[Profile] setCurrentUserData : ", payload);
        state.currentUser = payload;
    },
    updateUserData (state, payload){
        //update user data
    }
};
