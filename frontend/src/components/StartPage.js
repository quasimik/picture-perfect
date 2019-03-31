import React, { Component } from 'react';
import { Button, Icon, Segment, Divider, Grid, Form, Input, Container } from 'semantic-ui-react';

// Component requires no props
class StartPage extends Component {
    render() {
        return (
            <Container>
            <Segment placeholder>
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <Divider horizontal>Create a new game</Divider>
                        <br/><br/><br/><br/>
                        <StartPageButton buttonText="Create" color="red" onClick={this.props.create}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Divider horizontal>Join an existing game</Divider>
                        <Grid.Row>
                            <Form>
                                <StartPageField label="Room ID"></StartPageField>
                                <StartPageField label="Player Name"></StartPageField>
                            </Form>
                        </Grid.Row>
                        <br/>
                        <Grid.Row>
                            <StartPageButton buttonText="Join" color="green"/>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Segment></Container>
        )
    }
}

class StartPageButton extends Component {
    render() {
        const buttonColor = (this.props.color) ? this.props.color : "white";
        return (
            <div>
                <Button animated color={buttonColor} onClick={this.props.onClick}>
                    <Button.Content visible>{this.props.buttonText}</Button.Content>
                    <Button.Content hidden><Icon name='arrow right'/></Button.Content>
                </Button>
            </div>
        )
    }
}

class StartPageField extends Component {
    render() {
        return (
            <Form.Field>
                <label className="StartLabel">{this.props.label}</label>
                <Input placeholder={this.props.placeholder}></Input>
            </Form.Field>
        )
    }
}

export default StartPage;