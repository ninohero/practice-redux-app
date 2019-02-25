import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../actions/actions';

class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: {
        vol: 'v1',
        year: '2016',
        month: '2'
      },
      search: {

      }
    }

    this.getArticles = this.getArticles.bind(this);
  }

  getArticles = (e) => {
    this.props.getArticles(this.state.articles);
  }

  searchNyt = (e) => {
    this.props.searchNyt(this.state.search);
  }

  render() {
    return (

        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>

    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(People);
