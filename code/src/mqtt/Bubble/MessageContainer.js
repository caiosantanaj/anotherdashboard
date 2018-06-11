import React from 'react';
import BubbleMessageList from './BubbleMessageList';

export default class MessageContainer extends React.Component {

    constructor(props) {
        super(props);

        this.getName = this.getName.bind(this);
    }

    getName(name) {
        ////funcão que envia o nome do json para o lineChart
        this.props.nameToFather(name);
    }

    render() {
        return (
            <div>
                <BubbleMessageList data={this.props.data} conf={this.props.conf} name={this.props.name} nameToFather={this.getName} />
            </div>
        )
    }
}
