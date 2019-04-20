import {fetchLoggedInUserData} from './Util';

// initial state
export const state = {
    currentUser:{},
    currentProfile:{}
};

// getters
export const getters = {
    currentUser: state => state.currentUser,
    currentProfile: state => state.currentProfile
};

// actions
export const actions = {};

export const mutations = {
    setCurrentUserData (state, payload){
        console.log("[Profile] setCurrentUserData : ", payload);
        state.currentUser = payload;
    },
    setUserProfile (state, payload){
        //update user data
      console.log(" set profile",payload)
      state.currentProfile=payload
    },
};
