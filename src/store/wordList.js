// import {fetchLoggedInUserData} from './Util';

// initial state
export const state = {
    wordList: [],
    wordCatagory: ''
};

// getters
export const getters = {
    wordList: state => state.wordList,
    wordCatagory: state => state.wordCatagory
};

// actions
export const actions = {};

// mutations
export const mutations = {
    setWordList (state, payload){
        console.log("[Word] setWordList : ", payload);
        state.wordCatagory = payload.wordCatagory;
        state.wordList = payload.wordList;   
    }
};
