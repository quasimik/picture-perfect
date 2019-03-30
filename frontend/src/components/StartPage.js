import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class StartPage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
        <div>
        <Button animated>
            <Button.content visible>Create a room!</Button.content>
            <Button.content hidden><Icon name='arrow right'/></Button.content>
        </Button>
        </div>
        )
    }
}