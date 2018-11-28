import React, { Component } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: '',
      artist: '',
      lyricss: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getalllyrics = () => {
    axios
      .get('https://guarded-bayou-73178.herokuapp.com/getalllyrics')
      .then(result => {
        this.setState({ lyricss: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getalllyrics();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://guarded-bayou-73178.herokuapp.com/getlyrics?title=${
      this.state.title
    }&artist=${this.state.artist}`;

    console.log('onsubmit:', query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getalllyrics();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.title]: e.target.value,
      [e.target.artist]: e.target.value
    });
    // console.log('onchange:', [e.target.title]);
  }

  removeLyrics(title) {
    this.setState({
      lyricss: this.state.lyricss.filter(lyrics => {
        if (lyrics.title !== title) return lyrics;
      })
    });
    const query = `https://guarded-bayou-73178.herokuapp.com/deletelyrics?title=${title}`;
    axios
      .get(query)
      .then(result => {
        this.getalllyrics();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let movieCards = this.state.lyricss.map(lyrics => {
      return (
        <Col sm="4" key={lyrics.title}>
          <MovieCard
            removeLyrics={this.removeLyrics.bind(this)}
            lyrics={lyrics}
          />
        </Col>
      );
    });
    return (
      <div className="App">
        <Jumbotron id="jumboheader">
          <h1 className="display-4 wordcolor">Lyrics Search</h1>
          <p className="lead wordcolor">Search For Lyrics</p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Lyrics not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Enter Artist and Songs Name</Label>
                  <Input
                    title="artist"
                    placeholder="Enter Artist Name Here..."
                    onChange={this.onChange}
                  />
                  <Input
                    title="title"
                    placeholder="Songs Name Here..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Search</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{movieCards}</Row>
        </Container>
        <footer className="footer">
          <p>Copyright &copy; CGL Company. All Right Reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
