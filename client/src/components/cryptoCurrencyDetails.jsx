import React from 'react';

class CryptoCurrencyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: '',
      timeSeries: '',
    };
  }

  render() {
    // console.log('props: ', this.props.data.metaData['3. Digital Currency Name']);
    console.log('props: ', this.props.data);
    return (
      <div>
        Hello
        <p>{this.props.data.metaData['3. Digital Currency Name']}</p>
      </div>
    );
  }
}

export default CryptoCurrencyDetails;

// Data:
/*
{
    "Meta Data": {
        "1. Information": "Intraday Prices and Volumes for Digital Currency",
        "2. Digital Currency Code": "BTC",
        "3. Digital Currency Name": "Bitcoin",
        "4. Market Code": "KRW",
        "5. Market Name": "South Korean Won",
        "6. Interval": "5min",
        "7. Last Refreshed": "2017-12-27 17:30:00",
        "8. Time Zone": "UTC"
    },
    "Time Series (Digital Currency Intraday)": {
        "2017-12-27 17:30:00": {
            "1a. price (KRW)": "21464951.10401826",
            "1b. price (USD)": "19985.05758951",
            "2. volume": "34804.64540125",
            "3. market cap (USD)": "695572842.72654998"
        },
        "2017-12-24 12:45:00": {
            "1a. price (KRW)": "18034767.36939404",
            "1b. price (USD)": "16733.87586003",
            "2. volume": "26049.13167346",
            "3. market cap (USD)": "435902935.68541002"
        }
    }
}
*/
