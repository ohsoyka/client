import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from 'next/router';
import Error from './_error';
import { current } from '../config';
import AuthenticatablePage from './_authenticatable';

import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Content from '../components/Content';
import SearchResult from '../components/SearchResult';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import LoaderIcon from '../static/icons/oval.svg';

import API from '../services/api';
import { describeWordCount } from '../services/grammar';
import { getAllCookies } from '../services/cookies';

const SEARCH_DELAY = 700;

class SearchPage extends AuthenticatablePage {
  static async getInitialProps({ req, query }) {
    try {
      const parentProps = await super.getInitialProps({ req });
      const searchQuery = query.query;
      let searchResults = [];

      if (searchQuery) {
        const { docs } = await API.search({ query: searchQuery }, getAllCookies(req));

        searchResults = docs;
      }

      return {
        ...parentProps,
        searchResults,
        searchQuery,
        loading: false,
      };
    } catch (error) {
      return { error };
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: props.searchQuery,
    };
    this.search = this.search.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    this.setState({ loading });
  }

  search(query) {
    clearTimeout(this.state.searchTimeout);

    if (!query) {
      this.setState({
        searchQuery: query,
        loading: false,
      });

      Router.replace('/search');

      return;
    }

    const timeout = setTimeout(async () => {
      Router.replace(`/search?query=${query}`);
    }, SEARCH_DELAY);

    this.setState({
      loading: true,
      searchQuery: query,
      searchTimeout: timeout,
    });
  }

  getSearchResultsCountString() {
    const { searchResults } = this.props;

    if (!searchResults.length) {
      return 'Нічого не знайшлося.';
    }

    const articlesFound = searchResults.filter(searchResult => searchResult.searchResultType === 'article');
    const pagesFound = searchResults.filter(searchResult => searchResult.searchResultType === 'page');
    const projectsFound = searchResults.filter(searchResult => searchResult.searchResultType === 'project');
    const categoriesFound = searchResults.filter(searchResult => searchResult.searchResultType === 'category');

    const itemsFound = [
      { words: ['статтю', 'статті', 'статей'], count: articlesFound.length },
      { words: ['сторінку', 'сторінки', 'сторінок'], count: pagesFound.length },
      { words: ['проект', 'проекти', 'проектів'], count: projectsFound.length },
      { words: ['категорію', 'категорії', 'категорій'], count: categoriesFound.length },
    ]
      .filter(item => item.count);

    return itemsFound
      .map(item => describeWordCount(item.count, item.words, { gender: item.gender }))
      .reduce((result, item, index, collection) => {
        if (collection.length === 1) {
          return result + item;
        }

        if (index === collection.length - 1) {
          return `${result} і ${item}`;
        }

        if (index === 0) {
          return result + item;
        }

        return `${result}, ${item}`;
      }, 'Знайдено ');
  }

  render() {
    if (this.props.error) {
      return <Error statusCode={this.props.error.status} />;
    }

    const { searchResults } = this.props;
    const { searchQuery, loading } = this.state;

    const title = `Пошук / ${current.meta.title}`;

    const searchResultsCount = <h3>{this.getSearchResultsCountString()}</h3>;
    const searchResultsMarkup = searchResults ? (
      <div className="margin-top">
        {searchResults.map(searchResult => <SearchResult {...searchResult} key={searchResult.id} />)}
      </div>
    )
      : null;
    const loader = <p className="text-center"><LoaderIcon className="search-loader" /></p>;

    return (
      <Wrapper>
        <Head>
          <title>{title}</title>
        </Head>
        <Header />
        <Content className="container search-page">
          <h1 className="text-center">Пошук</h1>

          <Input
            lite
            compact
            label="Шукайте"
            value={searchQuery}
            onChange={query => this.search(query)}
            onEnter={this.search}
            className="search-field"
          />

          {!loading && searchQuery && searchResultsCount}
          {loading && loader}

          {searchResultsMarkup}
        </Content>
        <Footer />
      </Wrapper>
    );
  }
}

SearchPage.propTypes = {
  tag: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    status: PropTypes.number,
  }),
};

SearchPage.defaultProps = {
  articles: [],
  error: null,
};

export default SearchPage;
