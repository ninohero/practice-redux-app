import * as types from './actionConsts';
import axios from 'axios';

const uri = 'https://api.nytimes.com/';
const appId = 'e7417f1b-d25e-4c23-b20d-ea0fca9cc8af';
const key = 'jBspI9S6yoBRGB1JbdGmW5pHKUldsilM';

export const getArticles = (params) => {
  return dispatch => {
    dispatch(getArticlesRequest());

    // /2019/1 => year, month?
    axios.get(uri + 'svc/archive/v1/' + params.year + '/' + params.month + '.json?api-key=' + key,{
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

const getArticlesSuccess = response => ({
  type: types.GET_ARTICLES_SUCCESS,
  payload: {
    response
  }
});

const getArticlesFailure = response => ({
  type: types.GET_ARTICLES_FAILURE,
  payload: {
    response
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
