import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

class CryptoCurrencyNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.props.stories.map((story) => {
            const color = {
              neutral: 'warning',
              positive: 'info',
              negative: 'danger',
            };
            return (
              <ListGroupItem key={story.id} header={story.title} href={story.link} target="_blank">
                { story.summary }
                <br />
                <Button bsSize="xsmall" bsStyle={color[story.sentiment]}>{story.sentiment}</Button>
                <br/>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
// { 'Sentiment: ' + story.sentiment }
export default CryptoCurrencyNews;