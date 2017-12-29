import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class CryptoCurrencyNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log('stories: ', this.props.stories);
    return (
      <div>
        <ListGroup>
          {this.props.stories.map((story) => {
            return (
              <ListGroupItem key={story.id} header={story.title} href={story.link} target="_blank">
                { story.summary }
                <br />
                { 'Sentiment: ' + story.sentiment }
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default CryptoCurrencyNews;