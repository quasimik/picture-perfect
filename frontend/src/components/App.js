import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import './App.css';

import StartPage from './StartPage';
class App extends Component {

  state = {

  };

  render() {
    return (
      <div className="App">
        <Menu fixed='top' inverted color="teal">
          <Container text>
            {this.props.history && 
              <Menu.Item icon="left arrow" onClick={this.props.history.goBack} />}
            <Menu.Item header as={Link} to="/">Pic Perfect
            </Menu.Item>
          </Container>
        </Menu>
        <Route exact path="/" render={(props) => <StartPage {...props}/>}/>
        <Route path="/:room"  render={(props) => <div/>} />
      </div>
    );
  }
}

export default withRouter(App);
