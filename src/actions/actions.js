import * as types from './actionConsts';
import axios from 'axios';

export const simpleAction = () => dispatch => {
  dispatch({
   type: 'SIMPLE_ACTION',
   payload: 'result_of_simple_action'
  })
}

const uri = '';
const key = 'e7417f1b-d25e-4c23-b20d-ea0fca9cc8af';

export const getArticles = (params) => {
  return dispatch => {
    dispatch(getArticlesRequest());

    // /2019/1 => year, month?
    axios.get(uri + '/v1/svc/archive/' + params.join('/') + '.json?api-key=' + key,{
      ...params
    })
      .then(res => {
        dispatch(getArticlesSuccess(res.data));
      })
      .catch(err => {
        dispatch(getArticlesFailure(err));
      });
  };
};

const getArticlesRequest = () => ({
  type: types.GET_ARTICLES_REQUEST
});

const getArticlesSuccess = results => ({
  type: types.GET_ARTICLES_SUCCESS,
  payload: {
    ...results
  }
});

const getArticlesFailure = err => ({
  type: types.GET_ARTICLES_FAILURE,
  payload: {
    ...err
  }
});

export const searchNyt = (params) => {
  return dispatch => {
    dispatch(searchNytRequest());

    // /2019/1 => year, month?
    axios.get(uri + '/v2/svc/search/' + params.join('/') + '.json?api-key=' + key,{
      ...params
    })
      .then(res => {
        dispatch(searchNytSuccess(res.data));
      })
      .catch(err => {
        dispatch(searchNytFailure(err));
      });
  };
};

const searchNytRequest = () => ({
  type: types.SEARCH_NYT_REQUEST
});

const searchNytSuccess = results => ({
  type: types.SEARCH_NYT_SUCCESS,
  payload: {
    ...results
  }
});

const searchNytFailure = err => ({
  type: types.SEARCH_NYT_FAILURE,
  payload: {
    ...err
  }
});
