import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { ProgressBar, Button, ButtonToolbar } from 'react-bootstrap';

class SentimentSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positive: 0,
      negative: 0,
      neutral: 0,
    };
    this.updateSentiments = this.updateSentiments.bind(this);
  }

  componentWillReceiveProps() {
    this.updateSentiments();
  }

  updateSentiments() {
    this.setState({
      positive: this.props.sentiments.positive,
      negative: this.props.sentiments.negative,
      neutral: this.props.sentiments.neutral,
    });
  }

  render() {
    // console.log('sentiments update states::: ', this.state);
    return (
      <div>
        Sentiments: <br />
        <ButtonToolbar>
          <Button bsSize="xsmall" bsStyle="info">Positive</Button>
          <Button bsSize="xsmall" bsStyle="danger">Negative</Button>
          <Button bsSize="xsmall" bsStyle="warning">Neutral</Button>
        </ButtonToolbar>
        <br />
        <ProgressBar>
          <ProgressBar active bsStyle="info" now={this.state.positive} key={1} />
          <ProgressBar active bsStyle="danger" now={this.state.negative} key={2} />
          <ProgressBar active bsStyle="warning" now={this.state.neutral} key={3} />
        </ProgressBar>
      </div>
    );
  }
}

export default SentimentSummary;

