/* eslint-disable require-jsdoc */
import produce from 'immer';
import {INIT_APP} from './scale-backend-actions';

const initialState = {
  myapp: 'test-data',
};

export function app(state=initialState, action) {
  return produce(state, (newState) =>{
    switch (action.type) {
      case INIT_APP:
        newState.myapp = action.myapp;
        break;

      default:
        return state;
    }
  });
}
