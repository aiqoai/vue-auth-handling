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
        state.wordCatagory = payload;
        state.wordList =
         [
            {
              "id": "001",
              "word": "Accessible",
              "category": "life science",
              "level": "1",
              "sound_url": "https://s3-us-west-1.amazonaws.com/aiqolearn-dev/accessible.m4a",
              "picture_url": "https://s3-us-west-1.amazonaws.com/aiqolearn-dev/accessible.png",
              "owner": "aiqo",
              "pronunciation": "Acce-ssi-ble",
              "root": [{"latin":"acce"},{"greek":"ac"}],
              "part_of_speech":[
                {
                  "type": "adj",
                  "definition": "Easy to reach or to approach",
                  "translation":[{"zh": "无障碍的"}],
                  "sentence": ["The introduction to the complex novel was, thankfully, written in clear accessible language."],
                  "synonyms": ["approachable", "attainable"],
                  "encoding": ["to be encoded"],
                },
                {
                  "type": "noun",
                  "definition": "Easy to reach or to approach",
                  "translation":[{"zh": "无障碍的"}],
                  "sentence": ["The introduction to the complex novel was, thankfully, written in clear accessible language."],
                  "synonyms": ["approachable", "attainable"],
                  "encoding": ["to be encoded"],
                }
              ]
           
            },
            {
             "id": "002",
             "word": "Head",
             "category": "life science",
             "level": "1",
             "sound_url": "https://s3-us-west-1.amazonaws.com/aiqolearn-dev/accessible.m4a",
             "picture_url": "https://s3-us-west-1.amazonaws.com/aiqolearn-dev/accessible.png",
             "owner": "aiqo",
             "pronunciation": "Acce-ssi-ble",
             "root": [{"latin":"acce"},{"greek":"ac"}],
             "part_of_speech":[
               {
                 "type": "adj",
                 "definition": "Easy to reach or to approach",
                 "translation":[{"zh": "无障碍的"}],
                 "sentence": ["The introduction to the complex novel was, thankfully, written in clear accessible language."],
                 "synonyms": ["approachable", "attainable"],
                 "encoding": ["to be encoded"],
               },
               {
                 "type": "noun",
                 "definition": "Easy to reach or to approach",
                 "translation":[{"zh": "无障碍的"}],
                 "sentence": ["The introduction to the complex novel was, thankfully, written in clear accessible language."],
                 "synonyms": ["approachable", "attainable"],
                 "encoding": ["to be encoded"],
               }
             ]
           
           },
           {
             "id": "003",
             "word": "House",
             "category": "life science",
             "level": "1",
             "sound_url": "https://s3-us-west-1.amazonaws.com/aiqolearn-dev/accessible.m4a",
             "picture_url": "https://s3-us-west-1.amazonaws.com/aiqolearn-dev/accessible.png",
             "owner": "aiqo",
             "pronunciation": "Acce-ssi-ble",
             "root": [{"latin":"acce"},{"greek":"ac"}],
             "part_of_speech":[
               {
                 "type": "adj",
                 "definition": "Easy to reach or to approach",
                 "translation":[{"zh": "无障碍的"}],
                 "sentence": ["The introduction to the complex novel was, thankfully, written in clear accessible language."],
                 "synonyms": ["approachable", "attainable"],
                 "encoding": ["to be encoded"],
               },
               {
                 "type": "noun",
                 "definition": "Easy to reach or to approach",
                 "translation":[{"zh": "无障碍的"}],
                 "sentence": ["The introduction to the complex novel was, thankfully, written in clear accessible language."],
                 "synonyms": ["approachable", "attainable"],
                 "encoding": ["to be encoded"],
               }
             ]
           
           },
           {
            "id": "004",
            "word": "Ship",
            "category": "life science",
            "level": "1",
            "sound_url": "https://s3-us-west-1.amazonaws.com/aiqolearn-dev/accessible.m4a",
            "picture_url": "https://s3-us-west-1.amazonaws.com/aiqolearn-dev/accessible.png",
            "owner": "aiqo",
            "pronunciation": "Acce-ssi-ble",
            "root": [{"latin":"acce"},{"greek":"ac"}],
            "part_of_speech":[
              {
                "type": "adj",
                "definition": "Easy to reach or to approach",
                "translation":[{"zh": "无障碍的"}],
                "sentence": ["The introduction to the complex novel was, thankfully, written in clear accessible language."],
                "synonyms": ["approachable", "attainable"],
                "encoding": ["to be encoded"],
              },
              {
                "type": "noun",
                "definition": "Easy to reach or to approach",
                "translation":[{"zh": "无障碍的"}],
                "sentence": ["The introduction to the complex novel was, thankfully, written in clear accessible language."],
                "synonyms": ["approachable", "attainable"],
                "encoding": ["to be encoded"],
              }
            ]
           
           }
           ]
        
           console.log(state);
    },
    
};
