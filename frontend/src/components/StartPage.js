import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class StartPage extends Component {
    render() {
        return (
            <div>
                <StartPageButton buttonText="Create a room!"/>
                <StartPageButton buttonText="Join an existing room!"/>
            </div>
        )
    }
}

class StartPageButton extends Component {
    render() {
        return (
            <div>
                <Button animated>
                    <Button.Content visible>{this.props.buttonText}</Button.Content>
                    <Button.Content hidden><Icon name='arrow right'/></Button.Content>
                </Button>
            </div>
        )
    }
}

export default StartPage;