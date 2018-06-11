import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Stringify from 'react-stringify';

// javascript plugin used to create scrollbars on windows

class Documentation extends React.Component{
    constructor (props) {
        super(props);
            this.state = {
                isActivate: true
            };

        this.closeRequest = this.closeRequest.bind(this);
    }

    closeRequest() {
        this.setState({
          isActivate: !this.state.isActivate
        });
        //funcão que envia os valores do formulário para o sidebar->Dashboard(layout)->DashboardView
        this.props.updateSidebar();
    }

    render() {
        return (
            <div>
                <Modal size="lg" isOpen={this.state.isActivate} closeRequest={this.closeRequest}>
                    <ModalHeader value={this.state.name} toggle={this.closeRequest}></ModalHeader>
                    <ModalBody>
                        <h1 align="Center">Documentation</h1>
                        <hr/>
                        <br/>

                        <p>Welcome to our Dashboard - a simple yet highly flexible way to read
                            and visualize your data in real-time and attractively.</p>

                        <p>With a few number of clicks, you can create a pane containing one
                            widget and immediately be ready to start using it.</p>

                        <p>To do this, you just need to go on the sidebar, choose the
                             type of widget you pretend and before conclude, fill the
                              form as indicated below.</p>

                        <p>Besides what must be filled in the forms, is also specified
                             the format Json expected in order to exist a right interpretation of our code.</p>

                        <br/>
                            <div>
                                <h2 align="Center">Pie Chart</h2>
                                    <p>On PieChart the form must be filled as follows:</p>
                                <ul>
                                    <li>You can change the name of pieChart or leave the default name (PieChart)</li>
                                    <li>In the url (Link) you have to put:</li>
                                    <ul>
                                        <li>The protocol (ws or wss); </li>
                                        <li>Url to MQTT Broker</li>
                                        <li>Listening port</li>
                                        <li>E.g. of full url: <b>ws://example.com:9001</b></li>
                                    </ul>
                                    <li>In "Topic" you have to put the topic you want to subscribe.</li>
                                    <li>The authentication is optional, but if you want to connect in your private
                                        brokers you have to fill you username and your password.</li>
                                </ul>
                                <h4 align="Center">Json Format</h4>
                                <Stringify value={{ type: 'pie', data: {field: "value",label: "value"} }} space="    " />
                            </div>
                        <hr/>

                        <hr/>
                            <h2 align="Center">Bar Chart</h2>
                                <p>On BarChart the form must be filled as follows:</p>
                            <ul>
                                <li>You can change the name of barChart or leave the default name (BarChart)</li>
                                <li>In the url (Link) you have to put:</li>
                                <ul>
                                    <li>The protocol (ws or wss); </li>
                                    <li>Url to MQTT Broker</li>
                                    <li>Listening port</li>
                                    <li>E.g. of full url: <b>ws://example.com:9001</b></li>
                                </ul>
                                <li>In "Topic" you have to put the topic you want to subscribe.</li>
                                <li>The authentication is optional, but if you want to connect in your private
                                    brokers you have to fill you username and your password.</li>
                            </ul>
                            <h4 align="Center">Json Format</h4>
                            <Stringify value={{ type: 'bar', data: {field: "value",label: "value"} }} space="    " />
                        <hr/>

                        <hr/>
                            <h2 align="Center">Line Chart</h2>
                                <p>On LineChart the form must be filled as follows:</p>
                            <ul>
                                <li>You can change the name of lineChart or leave the default name (lineChart)</li>
                                <li>In the url (Link) you have to put:</li>
                                <ul>
                                    <li>The protocol (ws or wss); </li>
                                    <li>Url to MQTT Broker</li>
                                    <li>Listening port</li>
                                    <li>E.g. of full url: <b>ws://example.com:9001</b></li>
                                </ul>
                                <li>In "Topic" you have to put the topic you want to subscribe.</li>
                                <li>The authentication is optional, but if you want to connect in your private
                                    brokers you have to fill you username and your password.</li>
                            </ul>
                            <h4 align="Center">Json Format</h4>
                            <Stringify value={{ type: 'bar', data: {field: "value"} }} space="    " />
                        <hr/>

                        <hr/>
                            <h2 align="Center">Gauge</h2>
                                <p>On Gauge the form must be filled as follows:</p>
                            <ul>
                                <li>You can change the name of Gauge or leave the default name (Gauge)</li>
                                <li>In the url (Link) you have to put:</li>
                                <ul>
                                    <li>The protocol (ws or wss); </li>
                                    <li>Url to MQTT Broker</li>
                                    <li>Listening port</li>
                                    <li>E.g. of full url: <b>ws://example.com:9001</b></li>
                                </ul>
                                <li>In "Topic" you have to put the topic you want to subscribe.</li>
                                <li>In "Min. Value" you have to put the minimal value expected.</li>
                                <li>In "Max.Value" you have to put the maximal value expected.</li>
                                <li>The authentication is optional, but if you want to connect in your private
                                    brokers you have to fill you username and your password.</li>
                            </ul>
                            <h4 align="Center">Json Format</h4>
                            <Stringify value={{ type: 'gauge', data: {field: "value"} }} space="    " />
                        <hr/>

                        <hr/>
                            <h2 align="Center">Bubble Chart</h2>
                                <p>On Bubble Chart the form must be filled as follows:</p>
                            <ul>
                                <li>You can change the name of Bubble Chart or leave the default name (BubbleChart)</li>
                                <li>In the url (Link) you have to put:</li>
                                <ul>
                                    <li>The protocol (ws or wss); </li>
                                    <li>Url to MQTT Broker</li>
                                    <li>Listening port</li>
                                    <li>E.g. of full url: <b>ws://example.com:9001</b></li>
                                </ul>
                                <li>In "Topic" you have to put the topic you want to subscribe.</li>
                                <li>The authentication is optional, but if you want to connect in your private
                                    brokers you have to fill you username and your password.</li>
                            </ul>
                            <h4 align="Center">Json Format</h4>
                            <Stringify value={{ type: 'bar', data: {field1: "value",field2: "value",field3: "value"} }} space="    " />
                        <hr/>

                        <hr/>
                            <h2 align="Center">Value Evolution</h2>
                                <p>On Value Evolution the form must be filled as follows:</p>
                            <ul>

                                <li>You can change the name of Value Evolution or leave the default name (ValueChart)</li>
                                <li>In the url (Link) you have to put:</li>
                                <ul>
                                    <li>The protocol (ws or wss); </li>
                                    <li>Url to MQTT Broker</li>
                                    <li>Listening port</li>
                                    <li>E.g. of full url: <b>ws://example.com:9001</b></li>
                                </ul>
                                <li>In "Topic" you have to put the topic you want to subscribe.</li>
                                <li>The authentication is optional, but if you want to connect in your private
                                    brokers you have to fill you username and your password.</li>
                            </ul>
                            <h4 align="Center">Json Format</h4>
                            <Stringify value={{ type: 'value', data: {field: "value"} }} space="    " />
                        <hr/>

                        <hr/>
                            <h2 align="Center">Text</h2>
                            <p>In the Text we show you a note to remember late or some texto
                                to be present in dashboard. The Form must be filled as follows:</p>
                            <ul>
                                <li>You can change the name of Text or leave the default name (Note).</li>
                                <li>In “Text” you have to put the text you want to show.</li>
                            </ul>
                        <hr/>

                        <hr/>
                            <h2 align="Center">Date/Clock</h2>
                            <p>This widget show the date and hour of current local.</p>
                        <hr/>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeRequest}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Documentation;
