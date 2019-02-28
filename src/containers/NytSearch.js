import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Formsy from 'formsy-react';
import { Form, Checkbox, CheckboxGroup, File, Input, RadioGroup, Select, Textarea } from 'formsy-react-components';
import ErrorModal from '../components/ErrorModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../actions/actions';

class NytSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: {
        vol: 'v1',
        year: '',
        month: ''
      },
      critics: [],
      errorIsOpen: false,
      formIsValid: false,
      search: {
        query: ''
      }
    };

    this.getArticles = this.getArticles.bind(this);
    this.handleChangeArticleSearch = this.handleChangeArticleSearch.bind(this);
    this.handleClearError = this.handleClearError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listArticles = this.listArticles.bind(this);
  }

  componentDidMount = () => {
    this.props.actions.getMovieCritics();
    this.props.actions.getPicks();
  }

  createCell = (data) => {
    return (
      <li>
        <a href={data.web_url} target="_outerWin" className="col-3-lg">
          {data.headline && data.headline.main ? data.headline.main : 'No Headline'}
        </a>
      </li>
    );
  }

  createPickCell = (data, i) => {
    return (
      <li>
        <a href={data.link.url} target="_outerWin">
          <img src={data.multimedia.src} />
          <strong>{data.display_title}</strong>
        </a>
      </li>
    );
  }
  /*
  byline: "MANOHLA DARGIS"
  critics_pick: 1
  date_updated: "2019-02-28 17:44:26"
  display_title: "Transit"
  headline: "‘Transit’ Review: An Existential Puzzler With Jackboots and Terror"
  link: {
    suggested_link_text: "Read the New York Times Review of Transit"
    type: "article"
    url: "http://www.nytimes.com/2019/02/28/movies/transit-review.html"
  }
  mpaa_rating: ""
  multimedia: {
    height: 140
    src: "https://static01.nyt.com/images/2019/03/01/arts/01transit-1/merlin_151114074_8ed6b18b-cd05-4722-bc05-f8106c8c547d-mediumThreeByTwo210.jpg"
    type: "mediumThreeByTwo210"
    width: 210
  }
  opening_date: "2019-03-01"
  publication_date: "2019-02-28"
  summary_short: "In the latest from the German director Christian Petzold, a German refugee dodges bullets as German soldiers swarm into present-day Paris."
  */

  displayErrorModal = (message) => {
    //this.setState({ errorIsOpen: true });
    return (
      <ErrorModal errorMessage={message}
        handleCloseModal={this.handleClearError} />
    );
  }

  formIsValid = () => {
    this.setState({ formIsValid: true });
  }

  formIsInvalid = () => {
    this.setState({ formIsValid: false });
  }

  getArticles = (e) => {
    this.props.actions.getArticles(this.state.articles);
  }

  getCriticOptions = (opts) => {
    const options = [];
    _.map(opts, (critic, i) => {
      options.push({ label: critic.display_name, value: critic.seo_name });
    });
    return options;
  }

  getPicks = () => {
    this.props.actions.getPicks();
  }

  getYears = () => {
    const yearsArray = [{label: 'Year', value: ''}];
    const d = new Date();
    for (let year = 1970; year < d.getFullYear(); year++ ) {
      yearsArray.push({label: year, value: year});
    }
    return yearsArray;
  }

  handleChangeArticleSearch = (name, value) => {
    const vals = _.cloneDeep(this.state.articles);
    vals[name] = value;
    this.setState({ articles: vals });
  }

  handleClearError = () => {
    this.setState({ errorIsOpen: false });
    this.props.actions.clearErrors();
  }

  handleSubmit = (e) => {
    this.props.actions.getArticles(this.state.articles);
  }

  listArticles = (articles) => {
    const cells = [];
    if (articles.toJSON) {
      articles = articles.toJSON();
    }
    _.map(articles, (article, i) => {
      if (i <= 49) {
        cells.push(this.createCell(article));
      }
    });
    return cells;
  }

  listResults = (results) => {

  }

  listPicks = (picks) => {
    const cells = [];
    if (picks.toJSON) {
      picks = picks.toJSON();
    }
    _.map(picks, (pick, i) => {
      cells.push(this.createPickCell(pick, i));
    });
    return (cells);
  }

  searchNyt = (e) => {
    this.props.actions.searchNyt(this.state.search);
  }

  render() {
    return (
      <div className='search-container'>
        { this.props.error ?
          this.displayErrorModal(this.props.error)
          : [] }
        <Row>
          <Col className="col-12-lg">
            <h3 className="text-align-center">Search Archives</h3>
          </Col>
        </Row>
        <Row>
          <Col className='col-6-lg'>
            <Form onValidSubmit={this.handleSubmit} onValid={this.formIsValid} onInvalid={this.formIsInvalid}>
              <Select
                className="col-6-lg"
                label="Month"
                name="month"
                onChange={this.handleChangeArticleSearch}
                placeholder="select"
                required={true}
                options={[
                  {label: 'Month', value: ''},
                  {label: '1', value: '1'},
                  {label: '2', value: '2'},
                  {label: '3', value: '3'},
                  {label: '4', value: '4'},
                  {label: '5', value: '5'},
                  {label: '6', value: '6'},
                  {label: '7', value: '7'},
                  {label: '8', value: '8'},
                  {label: '9', value: '9'},
                  {label: '10', value: '10' },
                  {label: '11', value: '11'},
                  {label: '12', value: '12'}
                ]} />

              <Select options={this.getYears()}
                className="col-6-lg"
                label="Year"
                name="year"
                required={true}
                onChange={this.handleChangeArticleSearch} />

              <Button variant="primary"
                disabled={!this.state.formIsValid}
                onClick={this.handleSubmit}>Search</Button>
            </Form>
          </Col>

          <Col className='col-6-lg results'>
            { this.props.articles && this.listArticles(this.props.articles) }
          </Col>
        </Row>

        <Row>
          <Col className="col-12-lg">
            <h3 className="text-align-center">Movie Reviews</h3>
          </Col>
        </Row>

        <Row>
          <Col className='col-6-lg'>
            <Form onValidSubmit={this.handleSubmit} onValid={this.formIsValid} onInvalid={this.formIsInvalid}>
              <Select
                className="col-6-lg"
                label="Critics"
                name="critic"
                onChange={this.handleChangeCritics}
                placeholder="select"
                required={true}
                options={this.state.critics ? this.getCriticOptions(this.props.critics) : [{ label: 'Loading', value: ''}]} />

              <Select options={this.getYears()}
                className="col-6-lg"
                label="Year"
                name="year"
                required={true}
                onChange={this.handleChangeArticleSearch} />

              <Button variant="primary"
                disabled={!this.state.formIsValid}
                onClick={this.handleSubmit}>Search</Button>
            </Form>
          </Col>

          <Col className='col-6-lg results'>
            { this.props.results && this.listResults(this.props.results) }
          </Col>
        </Row>
        <Row>
          <Col className="col-12-lg">
            { this.props.picks ?
              <ul className="picks-list">{this.listPicks(this.props.picks)}</ul>
              : [] }
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.reducers.toJSON().articles,
    critics: state.reducers.toJSON().critics,
    picks: state.reducers.toJSON().picks,
    error: state.reducers.toJSON().error
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(projectActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NytSearch);
