import React from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import CryptoCurrencyDetails from './cryptoCurrencyDetails.jsx';
import CryptoCurrencyNews from './cryptoCurrencyNews.jsx';
import SentimentSummary from './sentimentSummary.jsx';
import Autosuggest from 'react-autosuggest';
import ModalGraph from './modalGraph.jsx'

class CryptoCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      cryptoCurrencyCode: '',
      cryptoCurrencyList: [],
      suggestions: [],
      showModal: false,
      cryptoData: {
        metaData: '',
        timeSeries: '',
      },
      cryptoNews: [],
      sentiments: {},
    };

    this.onChange = this.onChange.bind(this);
    this.getSentiment = this.getSentiment.bind(this);
    this.newsSearch = this.newsSearch.bind(this);
    this.cryptoSearch = this.cryptoSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.popOutSearch = this.popOutSearch.bind(this);
    this.close = this.close.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
  }

  componentDidMount() {
    axios
      .get('/api/crypto/getAllCryptoCurrencies')
      .then((response) => {
        // console.log('all crypto currencies::: ', response.data);
        this.setState({
          cryptoCurrencyList: response.data,
        });
        console.log('Auto Complete Search ', this.state.cryptoCurrencyList);
      });
  }

  onChange(event, { newValue, method }) {
    this.setState({
      search: newValue,
    });
  }

  getSentiment() {
    const { search } = this.state;
    axios
      .get(`/api/crypto/getSentiment?value=${search}`)
      .then((response) => {
        console.log('response:  ', response);
        this.setState({
          sentiments: response.data,
        });
      });
  }

  newsSearch() {
    const { search } = this.state;
    axios
      .get(`api/crypto/getNews?value=${search}`)
      .then((response) => {
        // console.log('news response::::', response);
        this.setState({
          cryptoNews: response.data,
        });
      });
  }

  cryptoSearch() {
    const { cryptoCurrencyCode } = this.state;
    axios
      .get(`/api/crypto/getCrypto?code=${cryptoCurrencyCode}`)
      .then((response) => {
        this.setState({
          cryptoData: {
            metaData: response.data.data['Meta Data'],
            timeSeries: response.data.data['Time Series (Digital Currency Daily)'],
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
    this.cryptoSearch();
    this.newsSearch();
    this.getSentiment();
  }

  close() {
    this.setState({
      showModal: false,
    });
  }

  popOutSearch() {
    return (
      <div className="modal">
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header>
            This is Modal Header
          </Modal.Header>
          <Modal.Body>
            <ModalGraph />
            <CryptoCurrencyDetails data={this.state.cryptoData} />
            <SentimentSummary sentiments={this.state.sentiments} />
            <CryptoCurrencyNews stories={this.state.cryptoNews} />
          </Modal.Body>
          <Modal.Footer>
            <button> Add </button>
            <button onClick={this.close}> Cancel </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  getSuggestions(value) {
    console.log('getSuggestions value: ', value);
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.state.cryptoCurrencyList.filter(currency => currency.name.toLowerCase().slice(0, inputLength) === inputValue);
  }



  getSuggestionValue(suggestion) {
    this.setState({
      cryptoCurrencyCode: suggestion.code
    });
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion.name}
      </div>
    );
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: [],
    });
  }

  render() {
    const inputProps = {
      placeholder: 'Type it!',
      value: this.state.search,
      onChange: this.onChange,
    };

    console.log('state:::', this.state);

    return (
      <div>
        <h1 className="header">Search Crypto Currency</h1>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <button onClick={this.toggleModal}>Search</button>
        {this.popOutSearch()}
      </div>
    );
  }
}

export default CryptoCurrency;
