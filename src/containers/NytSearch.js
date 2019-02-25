import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Formsy from 'formsy-react';
import { Form, Checkbox, CheckboxGroup, File, Input, RadioGroup, Select, Textarea } from 'formsy-react-components';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/actions';

class NytSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: {
        vol: 'v1',
        year: '2016',
        month: '2'
      },
      search: {
        query: ''
      }
    };

    this.getArticles = this.getArticles.bind(this);
  }

  getArticles = (e) => {
    this.props.getArticles(this.state.articles);
  }

  getYears = () => {
    const yearsArray = [];
    const d = new Date();
    for(let year = 1970; year < d.getFullYear(); year++ ) {
      yearsArray.push({label: year, value: year});
    }
    return yearsArray;
  }

  searchNyt = (e) => {
    this.props.searchNyt(this.state.search);
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
              options={[
                {label: '1', value: 1},
                {label: '2', value: 2},
                {label: '3', value: 3},
                {label: '4', value: 4},
                {label: '5', value: 5},
                {label: '6', value: 6},
                {label: '7', value: 7},
                {label: '8', value: 8},
                {label: '9', value: 9},
                {label: '10', value: 10 },
                {label: '11', value: 11},
                {label: '12', value: 12}
              ]}/>

            <Select options={this.getYears()}
              className="float-l"
              label="Year"
              name="year" />

            <Button variant="primary">Search</Button>
          </Form>
        </Col>
        <Col className='col-6-lg col-12-sm'>

        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(NytSearch);
