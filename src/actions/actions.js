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

// movie critics: /critics/all.json
export const getMovieCritics = (params) => {
  return dispatch => {
    dispatch(getMovieCriticsRequest());

    // /critics/all.json
    axios.get(uri + 'svc/movies/v2/critics/all.json?api-key=' + key,{
      ...params
    })
      .then(res => {
        dispatch(getMovieCriticsSuccess(res.data));
      })
      .catch(err => {
        dispatch(getMovieCriticsFailure(err));
      });
  };
};

const getMovieCriticsRequest = () => ({
  type: types.GET_CRITICS_REQUEST
});

const getMovieCriticsSuccess = results => ({
  type: types.GET_CRITICS_SUCCESS,
  payload: {
    ...results
  }
});

const getMovieCriticsFailure = err => ({
  type: types.GET_CRITICS_FAILURE,
  payload: {
    ...err
  }
});

// movie picks: /reviews/picks.json
export const getPicks = (params) => {
  return dispatch => {
    dispatch(getPicksRequest());

    // /2019/1 => year, month?
    axios.get(uri + '/svc/movies/v2/reviews/picks.json?api-key=' + key)
      .then(res => {
        dispatch(getPicksSuccess(res.data));
      })
      .catch(err => {
        dispatch(getPicksFailure(err));
      });
  };
};

const getPicksRequest = () => ({
  type: types.GET_PICKS_REQUEST
});

const getPicksSuccess = results => ({
  type: types.GET_PICKS_SUCCESS,
  payload: {
    ...results
  }
});

const getPicksFailure = err => ({
  type: types.GET_PICKS_FAILURE,
  payload: {
    ...err
  }
});


// search reviews: /reviews/search.json?query=lebowski
// /svc/movies/v2/reviews/search.json?
export const searchReviews = (params) => {
  return dispatch => {
    dispatch(searchReviewsRequest());

    // /2019/1 => year, month?
    axios.get(uri + 'svc/movies/v2/reviews/search.json?' + params.query,{
      ...params
    })
      .then(res => {
        dispatch(searchReviewsSuccess(res.data));
      })
      .catch(err => {
        dispatch(searchReviewsFailure(err));
      });
  };
};

const searchReviewsRequest = () => ({
  type: types.SEARCH_REVIEWS_REQUEST
});

const searchReviewsSuccess = results => ({
  type: types.SEARCH_REVIEWS_SUCCESS,
  payload: {
    ...results
  }
});

const searchReviewsFailure = err => ({
  type: types.SEARCH_REVIEWS_FAILURE,
  payload: {
    ...err
  }
});

export const clearErrors = () => ({
  type: types.CLEAR_ERRORS
});
