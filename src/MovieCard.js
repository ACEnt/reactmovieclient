//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export class MovieCard extends Component {
  constructor(props) {
    super(props);
  }

  buttonHandler = () => {
    window.open(this.props.lyrics.link);
  };

  render() {
    let { title, lyrics, link, artist, tubeimg } = this.props.lyrics;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={tubeimg} alt={title} />
          <CardBody>
            <CardTitle>
              {artist} - {title}
            </CardTitle>
            <CardSubtitle>{lyrics}</CardSubtitle>
            <br />
            <CardSubtitle>
              <button onClick={this.buttonHandler}>Go To Youtube</button>
            </CardSubtitle>
            <br />
            <Button
              color="primary"
              onClick={() => this.props.removeLyrics(title)}
            >
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MovieCard;
