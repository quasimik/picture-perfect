import React, { Component } from 'react';
import { Icon, Segment, Card, List } from 'semantic-ui-react';

import db from '../db';

// Needs the target word along with all Teams, each Team's score, and each Team's closest word
class GameEnd extends Component {

    state = {
        teamData: []
    }

    componentDidMount() {
        let { invite } = this.props.match.params;
        db.game_status_invite(invite)
        .then((data) => {
            let promises = [];
            for(var i in data.teams) {
                promises.push(this.getTeamScore(data.teams[i].id))
            }
            return Promise.all(promises)
        })
        .then((teams) => {
            this.setState({teamData: teams});
        });
    }

    getTeamScore = (team) => {
        team && db.team_status(team)
        .then((data) => {
            return {name: "Team " + team, score: data.score};
        })
    }

    render() {
        var teamData = {name:"lol", word:"laslfddg", score: 0};
        const dataList = Object.entries(teamData).map( ([index, obj]) => <TeamEntry name={obj.name} word={obj.word} score={obj.score}/>);
        return (
            <Segment>
                {/* <h2>Target: {target}</h2> */}
                {dataList}
            </Segment>
        );
    }
}

class TeamEntry extends Component {
   render() {
    const teamName = this.props.name;
    const teamScore = this.props.score;
    return (
        <div>
            <Card centered>
                <Card.Content>
                    <Card.Header>{teamName}</Card.Header>
                    {/* <Card.Description>Closest Word: {teamWord}</Card.Description> */}
                </Card.Content>
                <Card.Content>
                    <List>
                        <List.Item>
                            <Icon name="right triangle"/>
                            <List.Content>
                            <List.Header verticalAlign className='GameEnd'>Score: {teamScore}</List.Header>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
            <br/>
         </div>
            );
        }
}

export default GameEnd;