import React from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import CryptoCurrencyDetails from './cryptoCurrencyDetails.jsx';

class CryptoCurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      showModal: false,
      cryptoData: {
        metaData: '',
        timeSeries: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.cryptoSearch = this.cryptoSearch.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.popOutSearch = this.popOutSearch.bind(this);
  }

  onChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  cryptoSearch() {
    const symbol = this.state.search;
    axios
      .get(`/api/crypto/getCrypto?code=${symbol}`)
      .then(response => {
        console.log('response::::', response);
        // console.log('response type: ', typeof response.data.data);
        this.setState({
          cryptoData: {
            metaData: response.data.data['Meta Data'],
            timeSeries: response.data.data['Time Series (Digital Currency Intraday)'],
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
    this.cryptoSearch();
  }

  popOutSearch() {
    return (
      <div className="modal">
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <div>
            <CryptoCurrencyDetails data={this.state.cryptoData} />
          </div>
          <button onClick={this.toggleModal}> Add </button>
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
