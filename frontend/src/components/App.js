import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import './App.css';
import db from '../db'

import StartPage from './StartPage';
import TeamJoin from './TeamJoin';
import GameRoom from './GameRoom';
import GameEnd from './GameEnd';
class App extends Component {

  state = {
    game: {
      id: 0,
      invite: "",
      timeout: 0,
      target: "",
      teams: []
    },
    team: {
      id: 0,
      game: 0,
      players: []
    },
    player: {
      id: 0,
      name: "",
      word: "",
      team: 0,
      add: false,
      master: false
    }
  };

  createGame = () => {
    db.new_game()
    .then((data) => {
      let tmp = this.state;
      tmp.player.id = data.id;
      this.setState(tmp);
      return data.id;
    })
    .then(this.getPlayer)
    .then(this.getTeam);
  }

  joinGame = (invite) => {
    db.join_game(invite)
    .then((data) => {
      let tmp = this.state;
      tmp.player.id = data.id;
      this.setState(tmp);
      return data.id;
    })
    .then(this.getPlayer)
    .then(this.getTeam);
  }

  getPlayer = (id) => {
    db.player_status(id)
    .then((data) => {
      console.log(data)
      let tmp = this.state;
      tmp.player.id = data.id;
      tmp.player.name = data.name;
      tmp.player.word = data.word;
      tmp.player.add = data.word_add;
      tmp.player.team = data.team;
      tmp.player.master = data.master;
      this.setState(tmp);
      return data.team;
    });
  }

  getTeam = (id) => {
    db.team_status(id)
    .then((data) => {
      console.log(data)
      let tmp = this.state;
      tmp.game = data.game;
      tmp.players = data.players;
      this.setState(tmp);
      return data.game;
    })
  }

  render() {
    return (
      <div className="App">
        <Menu fixed='top' inverted color="teal">
          <Container text>
            {this.props.history && 
              <Menu.Item icon="left arrow" onClick={this.props.history.goBack} />}
            <Menu.Item header as={Link} to="/">Pic Perfect</Menu.Item>
            <Menu.Item header>Room: </Menu.Item>
            <Menu.Item header>Time Remaining: 500</Menu.Item>
          </Container>
        </Menu>
        <Route exact path="/" render={(props) => <StartPage {...props} create={this.createGame} />}/>
        <Route path="/:room"  render={(props) => <TeamJoin {...props} playerName="Bobbeh" playerKey="9"/>} />
      </div>
    );
  }
}

export default withRouter(App);
