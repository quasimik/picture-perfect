import React, { Component } from 'react';
import { Button, Card, List, Image } from 'semantic-ui-react';

class Member {
    constructor(key, name) {
        this.key = key;
        this.name = name;
    }
}


// TeamJoin expects a prop with the client's name
class TeamJoin extends Component {    

    state = {
        teamList: [
            { name: "Team 1", members: [ new Member(0, "Jon"), new Member(1, "John"), new Member(2, "Juan"), new Member(3, "Justin") ] },
            { name: "Team 2", members: [ new Member(4, "Alice"), new Member(5, "Bob"), new Member(6, "Eve"), new Member(7, "Mallory"), new Member(8, "Trent")]}
        ]
    }

    joinTeam = (event, props) => {
        let teams = this.state.teamList[props.teamName];
        teams = teams.concat(new Member(this.props.playerKey, this.props.playerName));
        const newState = {
            teamList: teams
        }
        this.setState(newState);
    }

    leaveTeam = (event, props) => {

    }

    render() {
        const teams = this.state.teamList;
        const playerKey = this.props.playerKey;
        const playerName = this.props.playerName;

        const boxes = teams.map( (team) => <TeamJoinBox teamName={team.name} memberList={team.members} joinTeam={this.joinTeam}/> );
        return (
            <div>
                <h2>Hello {playerName} ({playerKey}), join a team!</h2>
                {boxes}
            </div>
        );
    }
}

class TeamJoinBox extends Component {
    render() {
        const teamName = this.props.teamName;
        const memberList = this.props.memberList;
        const TeamMemberList = memberList.map( (member) => <TeamMember memberName={member.name}/> );
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{teamName}</Card.Header>
                </Card.Content>
                <Card.Content>
                    {TeamMemberList}
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='green' onClick={this.props.joinTeam}>
                        Join Team!
                    </Button>
                </Card.Content>
            </Card>
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