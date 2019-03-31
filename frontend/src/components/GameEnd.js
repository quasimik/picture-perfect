import React, { Component } from 'react';
import { Icon, Segment, Card, List } from 'semantic-ui-react';

// Needs the target word along with all Teams, each Team's score, and each Team's closest word
class GameEnd extends Component {
    render() {
        const { target, teamData } = this.props;
        const dataList = Object.entries(teamData).map( ([index, obj]) => <TeamEntry name={obj.name} word={obj.word} score={obj.score}/>);
        return (
            <Segment>
                <h2>Target: {target}</h2>
                {dataList}
            </Segment>
        );
    }
}

class TeamEntry extends Component {
   render() {
    const teamName = this.props.name;
    const teamWord = this.props.word;
    const teamScore = this.props.score;        
    return (
        <div>
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
            <br/>
         </div>
            );
        }
}

export default GameEnd;