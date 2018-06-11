import React from 'react';
import GaugeMessageList from './GaugeMessageList';

export default class MessageContainer extends React.Component {

    constructor(props) {
        super(props);
        this.min = this.props.min;
        this.max = this.props.max;
        this.getName = this.getName.bind(this);
        this.getMin = this.getMin.bind(this);
        this.getMax = this.getMax.bind(this);
    }

    getName(name) {
        ////funcão que envia o nome do json para o pai
        this.props.nameToFather(name);
    }

    getMin(value) {
        ////funcão que envia o min do json para o pai
        this.props.minToFather(value);
    }

    getMax(value) {
        ////funcão que envia o max do json para o pai
        this.props.maxToFather(value);
    }

    render() {

        return (

            <div>
                <GaugeMessageList data={this.props.data} conf={this.props.conf}
                    min={this.min} max={this.max} name={this.props.name}
                    nameToFather={this.getName} minToFather={this.getMin} maxToFather={this.getMax} />
            </div>
        )
    }
}
