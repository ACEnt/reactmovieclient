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
            <CardText>Youtube Link: {link}</CardText>

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
