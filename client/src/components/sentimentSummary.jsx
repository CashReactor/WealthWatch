import React from 'react';

class SentimentSummary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    console.log(this.props.sentiments)
    return(
      <p>
        positive:
        {this.props.sentiments.positive}
        <br/>
        negative:
        {this.props.sentiments.negative}
      </p>
    )
  }
}

export default SentimentSummary;


// const SentimentSummary = (props) => {
//   showSentiments() {
//     const
//   }
//   return (
//     <div>
//       {props.}
//     </div>
//   );
// };