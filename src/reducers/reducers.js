import _ from 'lodash';
import * as types from '../actions/actionConsts';
import { fromJS } from 'immutable';

const initialState = fromJS({articles: [], reviews: []});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ARTICLES_REQUEST:
      return state;
    case types.GET_ARTICLES_SUCCESS:
      return {
        results: fromJS(action.payload)
      };
    case types.GET_ARTICLES_FAILURE:
      return action.payload.err;
    default:
      return state;
  }
}
