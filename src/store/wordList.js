import { stat } from "fs";
import {HTTP} from '../store/httpcommon';

// import {fetchLoggedInUserData} from './Util';

// initial state
export const state = {
    wordList: [],
    problems: [],
    wordCatagory: '',
    wordLevel: '',
    favorites: []
};

// getters
export const getters = {
    wordList: state => state.wordList,
    problems: state => state.problems,
    wordCatagory: state => state.wordCatagory,
    wordLevel: state => state.wordLevel
};

// actions
export const actions = {
};

// mutations
export const mutations = {
    markFavorite(state, word) {
        console.log("[Word] markFavorite", word);
        word.favorite = !word.favorite;
    },
    setWordCategory(state, payload) {
        console.log("[Word] setWordCategory : ", payload);
        state.wordCatagory = payload;
    },
    setWordLevel(state, payload) {
        console.log("[Word] setWordCategory : ", payload);
        state.wordCatagory = payload;
    },
    setWordList(state, payload){
        console.log("[Word] setWordList : ", payload);
        state.wordList = payload;   
    },
    setProblems(state, payload) {
        console.log("[Word] setProblems : ", payload);
        state.problems = payload;
    },
    setFavorites(state, payload) {
        console.log("[Word] setFavorites : ", payload);
        state.favorites = payload;
    }
};
