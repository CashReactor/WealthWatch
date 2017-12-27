import React from 'react';


class CryptoCurrency extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1 className="header">
          Search Crypto Currency
        </h1>
        <input
          value={this.state.search}
          type="text"
          onChange={this.onChange}
          placeholder="Search Cryptocurrency"
        />
      </div>
    );
  }
}

export default CryptoCurrency;