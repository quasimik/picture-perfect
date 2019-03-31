import React, { Component } from 'react';
import { Button, Icon, Segment, Form, Input, Card, List } from 'semantic-ui-react';

import db from '../db';

// Needs the player's teamName and the target word. Also needs some list of players and their submitted words ("" if no submission)
class GameRoom extends Component {
    state = {
        buttonType: 'plus',
        teamList: []
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

    updateWord = (word) => {
        var add = this.state.buttonType === 'plus'
        db.update_word(this.props.data.player.id, word, add)
    }

    getTeamData = (team) => {
        team && db.team_status(team)
        .then((data) => {
            let promises = [];
            for(var player in data.players) {
            promises.push(db.player_status(data.players[player].id).then(this.parsePlayer));
            }
            return Promise.all(promises);
        })
        .then((memberList) => {
            var tmp = this.state;
            tmp.teamList = memberList;
            this.setState(tmp);
        })
    }

    parsePlayer = (data) => {
        // console.log("parseplayer", data)
        return {name: data.name, word: data.word, add: data.word_add}
    }

    render() {
        const teamName = "Team " + this.props.data.team.id;
        const target = this.props.data.game.target;
        const buttonType = this.state.buttonType; // or 'minus'
        this.getTeamData(this.props.data.team.id);
        //const dataList = Object.entries(teamWords).map( (name, word) => <GameListEntry name={name} word={word}/>);
        //*
        return (
            <Segment>
            <Card centered>
                <Card.Content>
                    <Card.Header>{teamName}</Card.Header>
                    <Card.Description>Target: {target}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <List floated='left'>
                        {this.state.teamList.map((p) => {return <GameListEntry name={p.name} word={p.word} add={p.add}/>})}
                    </List>
                </Card.Content>
                <Card.Content extra>
                    <WordSubmitter type={buttonType} flip={this.flipButtonState} submit={this.updateWord} />
                </Card.Content>
            </Card>
            <br/>
            <Button color='orange'>End Game</Button>
            </Segment>
        );
    }
}

class GameListEntry extends Component {
   render() {
            return (
                <List.Item>
                    <List.Content>
                        <List.Header>{this.props.name}: {this.props.add? "":"- "} {this.props.word}</List.Header>
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

    state = {
        word: ""
    }

    textInput = (e, data) => {
        this.setState({word: data.value});
    }

    submitWord = () => {
        this.props.submit(this.state.word);
    }

    render() {
        const buttonType = this.props.type;
        const buttonColor = (this.props.type === "plus") ? "green" : "red";
        const typeFlipper = this.props.flip;
        return (
            <Button.Group>
            <Button icon onClick={typeFlipper} color={buttonColor}>
                <Icon name={buttonType}/>
            </Button>
                <Form>
                    <Input placeholder="Enter a word" onChange={this.textInput}></Input>
                </Form>
            <Button color='blue' onClick={this.submitWord}>Submit</Button>
            </Button.Group>
        );
    }
}

export default GameRoom;