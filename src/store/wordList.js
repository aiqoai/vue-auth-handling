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
export const actions = {

};

// mutations
export const mutations = {
    markFavorite(state, word) {
        console.log("markFavorite", state.wordList[0].favorite);
        word.favorite = !word.favorite;
        console.log("markFavorite", state.wordList[0].favorite);
    },
    setWordList (state, payload){
        console.log("[Word] setWordList : ", payload);
        state.wordCatagory = payload.wordCatagory;
        state.wordList = payload.wordList;   
    }
};
