import React, { Component } from 'react';
import { Button, Icon, Segment, Form, Input, Card, List } from 'semantic-ui-react';

// Needs the player's teamName and the target word. Also needs some list of players and their submitted words ("" if no submission)
class GameRoom extends Component {
    state = {
        buttonType: 'plus'
    }

    flipButtonState = (event, data) => {
        let type = this.state.buttonType;
        if (type === 'plus') {
            type = 'minus';
        }
        else {
            type = 'plus';
        }
        const newState = {
            buttonType: type
        }
        this.setState(newState);
    }

    render() {
        const { teamName, target, teamWordList } = this.props;
        const buttonType = this.state.buttonType; // or 'minus'
        const dataList = (Object.entries(teamWordList)).map( ([index, keyValuePair]) =>
        {
            let data = <div></div>;
            for (let key in keyValuePair) {
                data=<GameListEntry name={key} word={keyValuePair[key]}/>            
            }
            return data;
        });
        return (
            <Segment>
            <Card centered>
                <Card.Content>
                    <Card.Header>{teamName}</Card.Header>
                    <Card.Description>Target: {target}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <List floated='left'>
                    {dataList}
                    </List>
                </Card.Content>
                <Card.Content extra>
                    <WordSubmitter type={buttonType} flip={this.flipButtonState}/>
                </Card.Content>
            </Card>
            <br/>
            <Button color='red'>End Game</Button>
            </Segment>
        );
    }
}

class GameListEntry extends Component {
   render() {
            return (
                <List.Item>
                    <List.Content>
                        <List.Header className='GameRoom'>{this.props.name}: {this.props.word}</List.Header>
                    </List.Content>
                </List.Item>
            );
        }
}

class WordSubmitter extends Component {
    options=[
        { key: "plus", name: "Add", value: "plus" },
        { key: "minus", name: "Sub", value: "minus" }
    ];

    render() {
        const buttonType = this.props.type;
        const typeFlipper = this.props.flip;
        return (
            <Button.Group>
            <Button icon onClick={typeFlipper}>
                <Icon name={buttonType}/>
            </Button>
                <Form>
                    <Input placeholder="Enter a word"></Input>
                </Form>
            <Button>Submit</Button>
            </Button.Group>
        );
    }
}

export default GameRoom;