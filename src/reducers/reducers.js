import _ from 'lodash';
import * as types from '../actions/actionConsts';
import { fromJS } from 'immutable';

const initialState = fromJS({articles: [], reviews: []});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ARTICLES_REQUEST:
      return state.setIn(['loading'], true);
    case types.GET_ARTICLES_SUCCESS:
      const articles = action.payload.response.response.docs && action.payload.response.response.docs.length ? action.payload.response.response.docs : [{headline: 'Nothing found'}];
      return state.setIn(['articles'], articles); //setIn(['loading'], false);
    case types.GET_ARTICLES_FAILURE:
      return state.setIn(['errors'], action.payload);
    default:
      return state;
  }
}
