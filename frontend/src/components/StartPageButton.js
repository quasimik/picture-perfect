import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

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

export default StartPageButton;