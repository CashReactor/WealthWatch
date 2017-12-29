import React from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import CryptoCurrencyDetails from './cryptoCurrencyDetails.jsx';
import CryptoCurrencyNews from './cryptoCurrencyNews.jsx'
import SentimentSummary from './sentimentSummary.jsx'

class CryptoCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      symbol: '',
      showModal: false,
      cryptoData: {
        metaData: '',
        timeSeries: '',
      },
      cryptoNews: [],
      sentiments: {},
    };
    this.onChange = this.onChange.bind(this);
    this.cryptoSearch = this.cryptoSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.popOutSearch = this.popOutSearch.bind(this);
    this.getSymbol = this.getSymbol.bind(this);
    this.close = this.close.bind(this);
    this.getSentiment = this.getSentiment.bind(this);
  }

  onChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  getSymbol() {

  }

  newsSearch() {
    axios
      .get('api/crypto/getNews')
      .then((response) => {
        // console.log('news response::::', response);
        this.setState({
          cryptoNews: response.data,
        });
      });
  }

  getSentiment() {
    axios
      .get(`/api/crypto/getSentiment`)
      .then((response) => {
        console.log('response:  ', response);
        this.setState({
          sentiments: response.data,
        })
      });
  }

  cryptoSearch() {
    const symbol = this.state.search;
    axios
      .get(`/api/crypto/getCrypto?code=${symbol}`)
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
    // this.cryptoSearch();
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

  render() {
    // console.log('cryptoData: ', this.state.cryptoData);
    return (
      <div>
        <h1 className="header">Search Crypto Currency</h1>
        <input value={this.state.search} type="text" onChange={this.onChange} placeholder="Search Cryptocurrency" />
        <button onClick={this.toggleModal}>Search</button>
        <p>Result: </p>
        {this.popOutSearch()}
      </div>
    );
  }
}

export default CryptoCurrency;
