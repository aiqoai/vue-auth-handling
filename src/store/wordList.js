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
    setWordList (state, payload, wordList){
        console.log("[Word] setWordList : ", payload, wordList);
        state.wordCatagory = payload;
        state.wordList = wordList;   
    }
};
