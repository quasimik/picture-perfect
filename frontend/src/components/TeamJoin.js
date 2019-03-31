import React, { Component } from 'react';
import { Button, Card, List, Segment } from 'semantic-ui-react';

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
        teamList: {
            "Team 1" : [ new Member(0, "Jon"), new Member(1, "John"), new Member(2, "Juan"), new Member(3, "Justin") ],
            "Team 2" : [ new Member(4, "Alice"), new Member(5, "Bob"), new Member(6, "Eve"), new Member(7, "Mallory"), new Member(8, "Trent")]
        },
        timeRemaining: 500
    }

    joinTeam = (event, props) => {
        // Do something here to join the team
    }

    render() {
        const teams = this.state.teamList;
        const playerKey = this.props.playerKey;
        const playerName = this.props.playerName;

        const boxes = (Object.entries(teams)).map( ([team, members]) => <TeamJoinBox teamName={team} memberList={members} joinTeam={this.joinTeam}/> );
        return (
            <div>
                <h3>Time Remaining: {this.state.timeRemaining}</h3>
                <Segment>
                    <h2>Hello {playerName} ({playerKey}), join a team!</h2>
                    <div>{boxes}</div>
                 </Segment>
            </div>
        );
    }
}

class TeamJoinBox extends Component {
    render() {
        const teamName = this.props.teamName;
        const memberList = this.props.memberList;
        const TeamMemberList = memberList.map( (member) => <TeamMember memberName={member.name}/> );
        
        const button = <Button basic color='green' onClick={this.props.joinTeam}>Join {teamName}</Button>;

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