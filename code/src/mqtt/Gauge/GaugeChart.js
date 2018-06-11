import React, { Component } from 'react';
import { Connector } from 'mqtt-react';
import { Col, FormGroup, Input, Button} from 'reactstrap';
import _MessageContainer from './MessageContainer.js';
import { subscribe } from 'mqtt-react';

class GaugeChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: this.props.password
        }

        this.pass = this.props.password;
        this.exists_password = false; // boolean verifica se deve conectar ou não
        this.noPasswordNeeded = false;
        this.min = this.props.min;
        this.max = this.props.max;
        this.checkForUpdate = this.checkForUpdate.bind(this);
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

    checkForUpdate() {
        this.shouldComponentUpdate();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.url != this.props.url || nextProps.topic != this.props.topic ||
            nextState.password != this.state.password) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        let options = null;
        let connection = null;

        if (this.props.authentication) {
            this.exists_password = true;

            //PARSING (ainda nao faz parse de um caminho especifico.) -- Separar isto numa função
            var url = new URL(this.props.url);

            var protocol_spliter = url.protocol.split(":")
            var protocol = protocol_spliter[0];

            var hostname = url.hostname;

            var port = parseInt(url.port);

            var pathname = url.pathname;
            if(pathname=="/") {
                pathname="";
            }
            ////////

            options = {
                host: hostname + pathname, //"m23.cloudmqtt.com",
                port: port,  //35826,
                clientId: 'clientNo_' + Math.random().toString(16).substr(2, 8),
                protocol: protocol, //'wss',
                username: this.props.user,
                password: this.state.password,
            }
            connection =  options;
        }
        else {
            connection = this.props.url;
        }

        let conf = {
            id: this.props.id,
            url: this.props.url,
            topic: this.props.topic,
        }

        const Messages = subscribe({topic: this.props.topic})(_MessageContainer);
        return (
            <Connector mqttProps={connection}>
                <div>
                    <Messages conf={conf} min={this.min} max={this.max} name={this.props.name}
                        nameToFather={this.getName} minToFather={this.getMin} maxToFather={this.getMax} />
                </div>
            </Connector>
        );
    }
}

export default GaugeChart;
