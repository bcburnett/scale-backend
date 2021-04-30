/* eslint-disable require-jsdoc */
import produce from "../../node_modules/immer/dist/immer.esm.js";
import { INIT_APP, JSON_UPDATE, SCALE_TENWEIGHT } from "./scale-backend-actions.js";
const initialState = {
  myapp: 'test-data',
  json: {
    weight: 0
  },
  tenWeight: 1,
  count: 0
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

      default:
        return state;
    }
  });
}