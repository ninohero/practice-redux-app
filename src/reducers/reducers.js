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
      return state.setIn(['articles'], articles).setIn(['loading'], false); //setIn(['loading'], false);
    case types.GET_ARTICLES_FAILURE:
      return state.setIn(['errors'], action.payload).setIn(['loading'], false);
    case types.GET_CRITICS_REQUEST:
      return state;
    case types.GET_CRITICS_SUCCESS:
      return state.setIn(['critics'], action.payload.response);
    case types.GET_CRITICS_FAILURE:
      const error = action.payload.response && action.payload.response.data && action.payload.response.data.fault ? 'GetCritics Error: ' + action.payload.response.data.fault.faultstring : 'General non-specific error';
      return state.setIn(['error'], error);
    case types.CLEAR_ERRORS:
      return state.delete('error');
    default:
      return state;
  }
}
