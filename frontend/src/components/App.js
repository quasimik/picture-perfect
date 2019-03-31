import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';
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
      status: undefined,
      target: "",
      teams: []
    },
    team: {
      id: 0,
      game: 0,
      score: undefined,
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
      console.log(data.id)
      return data.id;
    })
    .then(this.getPlayer)
    .then(this.getTeam)
    .then(this.getGame)
    .then((game_id) => {
      this.props.history.push('/' + this.state.game.invite)
    });
  }

  joinGame = (invite) => db.join_game(invite)
    .then((data) => {
      let tmp = this.state;
      tmp.player.id = data.id;
      this.setState(tmp);
      return data.id;
    })
    .then(this.getPlayer)
    .then(this.getTeam)
    .then(this.getGame);

  createTeam = (id) => db.create_team(id)
    .then(this.parseTeam)
    .then(this.getGame)

  switchTeam = (player_id, team_id) => db.switch_team(player_id, team_id)
    .then(this.parseTeam)
    .then(this.getGame);

  getPlayer = (id) => db.player_status(id)
    .then((data) => {
      console.log(data)
      let tmp = this.state;
      tmp.player.id = id;
      tmp.player.name = data.name;
      tmp.player.word = data.word;
      tmp.player.add = data.word_add;
      tmp.player.team = data.team;
      tmp.player.master = data.master;
      this.setState(tmp);
      return data.team;
    });

  getTeam = (id) => db.team_status(id)
    .then(this.parseTeam);

  parseTeam = (data) => {
    console.log(data)
    let tmp = this.state;
    tmp.team.id = data.id;
    tmp.team.game = data.game;
    tmp.team.players = data.players;
    this.setState(tmp);
    return data.game;
  }

  getGame = (id) => db.game_status(id)
    .then((data) => {
      console.log(data)
      let tmp = this.state;
      tmp.game.id = id;
      tmp.game.target = data.target;
      tmp.game.invite = data.invite;
      tmp.game.teams = data.teams;
      tmp.game.status = data.state;
      this.setState(tmp);
      return data.game;
    });

  startGame = () => {db.start_game(this.state.game.id)};
  endGame = () => {db.end_game(this.state.game.id)};


  render() {
    // console.log("history", this.props.history);
    (this.state.game.id !== 0) && this.getGame(this.state.game.id);
    return (
      <div className="App">
        <Menu fixed='top' inverted color="teal">
          <Container text>
            {this.props.history && 
              <Menu.Item icon="left arrow" onClick={this.props.history.goBack} />}
            <Menu.Item header>Lexica</Menu.Item>
            <Menu.Item header>Room: {this.state.game.invite} </Menu.Item>
            {/* <Menu.Item header>Time Remaining: 500</Menu.Item> */}
            <Menu.Item>
              {this.state.game.status !== undefined && this.state.game.status !== 2 &&
              <Button primary 
                content={this.state.game.status === 0 ? "Start" : "End"}
                onClick={this.state.game.status === 0 ? this.startGame : this.endGame}
              />}
            </Menu.Item>
          </Container>
        </Menu>
        <Route exact path="/" render={(props) => <StartPage {...props} create={this.createGame} data={this.state}/>}/>
        <Route path="/:invite" 
          render={(props) => {
            switch(this.state.game.status) {
              case 1:
                return <GameRoom {...props} data={this.state}/>;
              case 2:
                return <GameEnd {...props} data={this.state} />;
              default:
                return <TeamJoin {...props} 
                  data={this.state} 
                  joinGame={this.joinGame} 
                  joinTeam={this.switchTeam}
                  createTeam={this.createTeam}
                  switchTeam={this.switchTeam}/>;
            }}
          }
        />
      </div>
    );
  }
}

export default withRouter(App);

// GameRoom requires teamWordList=[ {name: word}, ... ] where name and word are strings
// GameEnd  requires teamData=[ {name: teamName, word: teamWord, score: teamScore }, ... ] where name, word, and score are object fields, teamName and teamWord are strings, and teamScore is an integer (can also be string)
// Both require target=targetWord where targetWord is a string