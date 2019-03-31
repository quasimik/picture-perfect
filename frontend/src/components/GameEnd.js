import React, { Component } from 'react';
import { Icon, Segment, Card, List } from 'semantic-ui-react';

import db from '../db';

// Needs the target word along with all Teams, each Team's score, and each Team's closest word
class GameEnd extends Component {

    state = {
        teamData: []
    }

    componentDidMount() {
        console.log(this.props.data)
        let promises = [];
        for(var i in this.props.data.game.teams) {
            promises.push(this.getTeamScore(this.props.data.game.teams[i].id))
        }
        Promise.all(promises)
        .then((teams) => {
            console.log("teamscores", teams);
            // this.setState({teamData: teams});
        });
    }

    getTeamScore = (team) => {
        team && db.team_status(team)
        .then((data) => {
            console.log("teamscore", {name: "Team " + team, score: data.score});
            let tmp = this.state;
            tmp.teamData.push({name: "Team " + team, score: Math.round(data.score * 10000)});
            this.setState(tmp);
            // return {name: "Team " + team, score: data.score};
        })
    }

    render() {
        // for(var i in this.props.data.game.teams) {
        //     this.getTeamScore(this.props.data.teams[i].id)
        // }
        var { teamData } = this.state;
        var target = this.props.data.game.target;
        const dataList = Object.entries(teamData).map( ([index, obj]) => <TeamEntry name={obj.name} word={obj.word} score={obj.score}/>);
        return (
            <Segment>
                <h1>Game Over!</h1>
                <h3>Target: {target}</h3>
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
                                <List.Header className='GameEnd'>Score: {teamScore}</List.Header>
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