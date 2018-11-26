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
    let { title, lyrics, link } = this.props.lyrics;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={title} alt="Card image cap" />
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{lyrics}</CardSubtitle>
            <CardText>{link}</CardText>

            <Button
              color="primary"
              onClick={() => this.props.deletelyrics(title)}
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
