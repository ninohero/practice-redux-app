import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Formsy from 'formsy-react';
import { Form, Checkbox, CheckboxGroup, File, Input, RadioGroup, Select, Textarea } from 'formsy-react-components';
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
      formIsValid: false,
      search: {
        query: ''
      }
    };

    this.getArticles = this.getArticles.bind(this);
    this.handleChangeArticleSearch = this.handleChangeArticleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listArticles = this.listArticles.bind(this);
  }

  createCell = (data) => {
    return (
      <Link to={data.web_url} className="col-3-lg">
        <p>{data.headline && data.headline.main ? data.headline.main : 'No Headline'}</p>
      </Link>
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

  searchNyt = (e) => {
    this.props.actions.searchNyt(this.state.search);
  }

  render() {
    return (
      <Row className='searchContainer'>
        <h3>Search Archives</h3>
        <Col className='col-6-lg col-12-sm'>
          <Form onValidSubmit={this.handleSubmit} onValid={this.formIsValid} onInvalid={this.formIsInvalid}>
            <Select
              className="float-l"
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
              className="float-l"
              label="Year"
              name="year"
              required={true}
              onChange={this.handleChangeArticleSearch} />

            <Button variant="primary"
              disabled={!this.state.formIsValid}
              onClick={this.handleSubmit}>Search</Button>
          </Form>
        </Col>
        <Col className='col-12-lg col-12-sm'>
          { this.props.articles && this.listArticles(this.props.articles) }
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.reducers.toJSON().articles
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(projectActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NytSearch);
