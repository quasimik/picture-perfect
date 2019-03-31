import React, { Component } from 'react';
import { Button, Icon, Segment, Divider, Grid, Form, Input, Container, Card, List, Responsive, Dropdown } from 'semantic-ui-react';

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
        const teamName = this.props.teamName;
        const teamWord = this.props.teamWord;
        const teamWordList = this.props.teamWordList;
        const buttonType = this.state.buttonType; // or 'minus'
        //const dataList = Object.entries(teamWords).map( (name, word) => <GameListEntry name={name} word={word}/>);
        //*
        return (
            <Segment>
            <Card centered>
                <Card.Content>
                    <Card.Header>{teamName}</Card.Header>
                    <Card.Description>Target: {teamWord}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <List floated='left'>
                    <GameListEntry name="hi" word="word"/>
                    <GameListEntry name="hi" word="word"/>
                    <GameListEntry name="hi" word="word"/>
                    </List>
                </Card.Content>
                <Card.Content extra>
                    <WordSubmitter type={buttonType} flip={this.flipButtonState}/>
                </Card.Content>
            </Card>
            </Segment>
        );
    }
}

class GameListEntry extends Component {
   render() {
            return (
                <List.Item>
                    <List.Content>
                        <List.Header>{this.props.name}: {this.props.word}</List.Header>
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