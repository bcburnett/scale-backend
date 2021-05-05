/* eslint-disable require-jsdoc */
import produce from "../../node_modules/immer/dist/immer.esm.js";
import { INIT_APP, JSON_UPDATE, SCALE_TENWEIGHT, SAVE_RECIPE, SEARCH_DATABASE } from "./scale-backend-actions.js";
const initialState = {
  myapp: 'test-data',
  json: {
    weight: 0
  },
  tenWeight: 1,
  count: 0,
  recipe: {
    "name": "Recipe Name",
    "description": "none",
    "cuisine": "Choose",
    "type": "Choose",
    "priingredient": "none",
    "ingredients": [],
    "instructions": "none",
    "ptime": "10",
    "ctime": "10",
    "servings": "10",
    "source": "none",
    "website": "none",
    "_id": ""
  },
  searchResult: []
};
export function app(state = initialState, action) {
  return produce(state, newState => {
    switch (action.type) {
      case INIT_APP:
        newState.myapp = action.myapp;
        break;

      case JSON_UPDATE:
        newState.json = action.json;
        newState.count = action.count;
        break;

      case SCALE_TENWEIGHT:
        newState.tenWeight = action.tenWeight;
        newState.count = action.count;
        break;

      case SAVE_RECIPE:
        newState.recipe = action.recipe;
        break;

      case SEARCH_DATABASE:
        newState.searchResult = action.result;
        break;

      default:
        return state;
    }
  });
}