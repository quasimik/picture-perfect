import React, { Component } from 'react';
import { Button, Icon, Segment, Divider, Grid, Form, Input, Container } from 'semantic-ui-react';

class StartPage extends Component {
    render() {
        return (
            <Container>
            <Segment placeholder>
                <Grid columns={2} rows={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <h2>Create a new game</h2>
                        </Grid.Column>
                        <Grid.Column>
                            <h2>Join an existing game</h2>
                            <Form>
                                <StartPageField label="Room ID"></StartPageField>
                                <StartPageField label="Player Name"></StartPageField>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <StartPageButton buttonText="Create" color="red"/>
                        </Grid.Column>
                        <Grid.Column>
                            <StartPageButton buttonText="Join" color="green"/>
                        </Grid.Column>
                    </Grid.Row>        
                </Grid>
                <Divider vertical></Divider>
            </Segment></Container>
        )
    }
}

class StartPageButton extends Component {
    render() {
        const buttonColor = (this.props.color) ? this.props.color : "white";
        return (
            <div>
                <Button animated color={buttonColor}>
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
                <label>{this.props.label}</label>
                <Input placeholder={this.props.placeholder}></Input>
            </Form.Field>
        )
    }
}

export default StartPage;