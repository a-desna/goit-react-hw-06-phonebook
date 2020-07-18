import React, { Fragment, Component } from 'react';
import ThemeContext from '../context/ThemeContext';
import Container from '../common/Container';
import Phonebook from './Phonebook/Phonebook';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ThemeContext>
          <Container>
            <Phonebook />
          </Container>
        </ThemeContext>
      </Fragment>
    );
  }
}

export default App;
