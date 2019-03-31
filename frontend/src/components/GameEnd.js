import React, { Component } from 'react';
import { Icon, Segment, Card, List } from 'semantic-ui-react';

// Needs the target word along with all Teams, each Team's score, and each Team's closest word
class GameEnd extends Component {
    render() {
        const target = this.props.target;
        //const dataList = Object.entries(teamWords).map( (name, word) => <GameListEntry name={name} word={word}/>);
        //*
        return (
            <Segment>
                <h2>Target: {target}</h2>
                <TeamEntry teamName="Team 1" teamWord="Wine" teamScore={-1}/>
                <br/>
                <TeamEntry teamName="Team 2" teamWord="Coal" teamScore={10}/>   
                <br/>
                <TeamEntry teamName="Team 3" teamWord="Dirge" teamScore={7}/>   
                <br/>
                <TeamEntry teamName="Team 4" teamWord="Truck" teamScore={2}/>   
                <br/>
            </Segment>
        );
    }
}

class TeamEntry extends Component {
   render() {
    const teamName = this.props.teamName;
    const teamWord = this.props.teamWord;
    const teamScore = this.props.teamScore;        
    return (
            <Card centered>
                <Card.Content>
                    <Card.Header>{teamName}</Card.Header>
                    <Card.Description>Closest Word: {teamWord}</Card.Description>
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
            );
        }
}

export default GameEnd;