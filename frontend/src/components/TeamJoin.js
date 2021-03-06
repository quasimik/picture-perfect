import React, { Component } from 'react';
import { Button, Card, List, Segment } from 'semantic-ui-react';

import db from '../db';

class Member {
  constructor(key, name) {
    this.key = key;
    this.name = name;
  }
}


// TeamJoin expects a prop with the player's key and name. Also requires dictionary for state.teamList (key=team name, value=array of Member objects)
// Also time is currently hardcoded to be just 500, will need up add an updater
class TeamJoin extends Component {    

  state = {
    teamList: {},
    timeRemaining: 500
  }

  joinTeam = (event, props) => {
    // Do something here to join the team
  }

  componentDidMount() {
    let { invite } = this.props.match.params;
    console.log("invite:", invite);
    if(this.props.data.player.id === 0) {
      db.game_status_invite(invite)
      .then((data) => {
        if(data.status !== 2) {
          console.log("joining", invite)
          this.props.joinGame(invite)
        }
        else {
          this.props.getGame(data.id);
        }
      });
    }
  }

  dataToMember = (data) => {
    return new Member(data.id, data.name);
  }

  getTeamData = (team) => {
    team && db.team_status(team)
      .then((data) => {
        let promises = [];
        for(var player in data.players) {
          promises.push(db.player_status(data.players[player].id).then(this.dataToMember));
        }
        return Promise.all(promises);
      })
      .then((memberList) => {
        var tmp = this.state;
        tmp.teamList[team] = memberList;
        this.setState(tmp);
      })
  }

  render() {
    let ts = this.props.data.game.teams
    for(var team in ts) {
      this.getTeamData(ts[team].id);
    }
    const teams = this.state.teamList;
    const playerName = this.props.data.player.name;

    const boxes = (Object.entries(teams)).map( ([team, members]) => <TeamJoinBox team={team} memberList={members} switchTeam={this.props.switchTeam}/> );
    return (
      <div>
        {/* <h3>Time Remaining: {this.state.timeRemaining}</h3> */}
        <Segment>
          <h2>Hello {playerName}, join a team!</h2>
          <div>{boxes}</div>
          <Button primary onClick={this.props.createTeam}>Create a new team</Button>
        </Segment>
      </div>
    );
  }
}

class TeamJoinBox extends Component {

  switchTeam = () => { 
    this.props.switchTeam(this.props.team)
  }

  render() {
    const team = this.props.team;
    const teamName = "Team " + team;
    const memberList = this.props.memberList;
    const TeamMemberList = memberList.map( (member) => <TeamMember memberName={member.name}/> );
    
    const button = <Button basic color='green' onClick={this.switchTeam}>Join {teamName}</Button>;

    return (
      <div>
      <Card centered>
        <Card.Content>
          <Card.Header>{teamName}</Card.Header>
        </Card.Content>
        <Card.Content>
          {TeamMemberList}
        </Card.Content>
        <Card.Content extra>
          {button}
        </Card.Content>
      </Card>
      <br/>
      </div>
    );
  }
}

class TeamMember extends Component {
  render() {
    return (
      <List.Item>
        <List.Content>
          <List.Header>{this.props.memberName}</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

// Add avatar with <Image avatar src={this.props.memberImage} />


export default TeamJoin;