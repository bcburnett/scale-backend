import "../../node_modules/redux-thunk/es/index.js";
export const INIT_APP = 'INIT_APP';
export const initApp = () => {
  return {
    type: INIT_APP,
    myapp: 'Scale Browser Interface'
  };
};
export const JSON_UPDATE = 'JSON_UPDATE';
export const jsonUpdate = (json, ten) => {
  console.log(state.tenWeight);
  console.log(json.weight);
  return {
    type: JSON_UPDATE,
    json,
    count: Number(json.weight) / (ten / 10)
  };
};
export const SCALE_TENWEIGHT = 'SCALE_TENWEIGHT';
export const scaleTenWeight = tenWeight => {
  return {
    type: SCALE_TENWEIGHT,
    tenWeight,
    count: Number(json.weight) / (tenWeight / 10)
  };
};
export const SAVE_RECIPE = 'SAVE_RECIPE';
export const saveRecipe = recipe => {
  return {
    type: SAVE_RECIPE,
    recipe
  };
};
export const ADD_TO_DATABASE = 'ADD_TO_DATABASE';
export const addToDatabase = recipe => {
  return dispatch => {
    fetch('http://192.168.1.177:2020/recipe', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    }).then(res => res.json()).then(res => {
      dispatch(saveRecipe(res));
    });
  };
};
export const UPDATE_DATABASE = 'UPDATE_DATABASE';
export const updateDatabase = recipe => {
  return dispatch => {
    fetch('http://192.168.1.177:2020/update', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    }).then(res => res.json()).then(res => {
      dispatch(saveRecipe(res));
    });
  };
};
export const SEARCH_DATABASE = 'SEARCH_DATABASE';
export const searchDatabase = searchString => {
  return dispatch => {
    fetch('http://192.168.1.177:2020/search', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchString)
    }).then(res => res.json()).then(res => {
      dispatch(saveSearch(res));
    });
  };
};
export const saveSearch = result => {
  return {
    type: SEARCH_DATABASE,
    result
  };
};