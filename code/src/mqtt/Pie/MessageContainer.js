import React from 'react';
import PieMessageList from './PieMessageList';

export default class MessageContainer extends React.Component {

    constructor(props) {
        super(props);

        this.getName = this.getName.bind(this);
    }

    getName(name) {
        ////funcão que envia o nome do json para o lineChart
        this.props.valuesToFather(name);
    }

    render() {
        return (
            <div>
                <PieMessageList data={this.props.data} conf={this.props.conf}
                    name={this.props.name} valuesToFather={this.getName} />
            </div>
        )
    }
}
