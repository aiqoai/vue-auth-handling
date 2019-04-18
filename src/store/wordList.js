import { stat } from "fs";
import {HTTP} from '../store/httpcommon';

// import {fetchLoggedInUserData} from './Util';

// initial state
export const state = {
    wordList: [],
    problems: [],
    wordCatagory: '',
    wordLevel: ''
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
    getProblems : async (context, query) => {
        let { data } = await HTTP.get('/api/problem/query_problems');
        console.log(data);
        if(data.status == 200){
            context.dispatch('setWordList', data.data.data);
        }
    }
};

// mutations
export const mutations = {
    markFavorite(state, word) {
        console.log("markFavorite", state.wordList[0].favorite);
        word.favorite = !word.favorite;
        console.log("markFavorite", state.wordList[0].favorite);
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
    }
};
