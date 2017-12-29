import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class CryptoCurrencyNews extends React.Component {
  constructor(props){
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
              <ListGroupItem>{story.title}</ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default CryptoCurrencyNews;