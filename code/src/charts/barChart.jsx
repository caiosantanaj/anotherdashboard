import React from 'react';

import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input,
    Label, Card, CardHeader, CardBody, CardTitle, Col, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import BarCh from '../mqtt/Bar/BarChart.js';

class BarChart extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            chart: true,
            modal: false,
            name: false
        }
        this.modal = false;
        this.newSettings = false;
        this.name = this.props.chartName;
        this.url = this.props.url;
        this.topic = this.props.topic;
        this.deleteWidget = false;
        this.keyCount = 0;

        this.updateState = this.updateState.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.changeSettings = this.changeSettings.bind(this);
        this.getName = this.getName.bind(this);
        this.getKey = this.getKey.bind(this);
    }

    getName(name) {
        this.name = name;

        var oldObject = JSON.parse(localStorage.getItem(this.props.id));
        var objct = {id:this.props.id, type: this.props.chartType, name: this.name,
            url: this.url, topic: this.topic, numberOfValues: this.numberOfValues,
            auth:this.props.authentication, user: this.props.user, password: this.props.password, position: oldObject.position,
            changed: false}

        localStorage.setItem(this.props.id, JSON.stringify(objct));

        this.setState({name: !this.state.name},() => {
            //this.refs.shouldUpdateChild.checkForUpdate();
        });
    }

    getKey() {
        if(this.newSettings == false) {
            return this.keyCount;
        }
        else {
            this.newSettings=false;
            this.keyCount++
            return this.keyCount;
        }
    }

    componentDidMount() {
        //alert(this.state.chart)
        //console.log("show " + this.props.chartName + " (" + this.props.chartType + " chart) : " + this.state.chart);
    }

    updateState() {
        this.setState({chart: false},() => {
            this.deleteWidget = true;
            this.props.removeWidg(this.props.id);
        });
    }

    static defaultProps = {
        chartName:'chart',
        chartType:'type'
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.deleteWidget === true || this.state.modal != nextState.modal ||
            this.state.name != nextState.name) {
            return true;
        }
        else {
            return false;
        }
    }

    updateModal() {
        this.setState({modal: !this.state.modal},() => {
              //this.refs.shouldUpdateChild.checkForUpdate();
        });
    }

    changeSettings(name,url,topic) {
        this.name = name;
        if(this.url != url) {
            this.url = url;
            this.newSettings=true
        }
        this.topic = topic
        var oldObject = JSON.parse(localStorage.getItem(this.props.id));
        var objct = {id:this.props.id, type: this.props.chartType, name: this.name,
            url: this.url, topic: this.topic, auth:this.props.authentication,
            user: this.props.user, password: this.props.password, position: oldObject.position,
            changed: true}
        localStorage.setItem(this.props.id, JSON.stringify(objct));

        this.setState({modal: !this.state.modal},() => {
            //this.refs.shouldUpdateChild.checkForUpdate();
        });
    }

    render() {
        //console.log("rendering widget")
        if(this.state.chart) {
            return (
                    <Card className="card-chart">
                        <CardHeader>
                            <CardTitle>{this.name}</CardTitle>
                            <UncontrolledDropdown className="cancel-drag">
                                <DropdownToggle className="btn-round btn-simple btn-icon" color="default">
                                    <i className="now-ui-icons loader_gear"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.updateModal}>Change Settings</DropdownItem>
                                      { this.state.modal ? <BarModal className="cancel-drag" updateParent={this.updateModal} name={this.name} url={this.url} topic={this.topic} changeSettings={this.changeSettings} /> : null }
                                    <DropdownItem onClick={this.updateState} className="text-danger">Remove data</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </CardHeader>
                        <CardBody>
                            <div align="center" className="cancel-drag">
                                <BarCh key={this.getKey()} id={this.props.id} ref='shouldUpdateChild' name={this.name}
                                    url={this.url} topic={this.topic} authentication={this.props.authentication}
                                    user={this.props.user} password={this.props.password} nameToFather={this.getName} />
                            </div>
                        </CardBody>
                    </Card>
            );
        }
        else {
            //console.log("show " + this.props.chartName + ": " + this.state.chart);
            return (
                <div/>
            );
        }
    }
}


class BarModal extends React.Component{

    constructor(props) {
        super (props);
        this.state = {
            modalIsOpen: true,
            name: this.props.name,
            url: this.props.url,
            topic:this.props.topic
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.closeRequest = this.closeRequest.bind(this);
        this.closeRequestSubmit = this.closeRequestSubmit.bind(this)

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
    }

    handleNameChange = (event) => {
        this.setState({
            name:event.target.value
        });
    }

    handleUrlChange = (event) => {
        this.setState({
            url:event.target.value
        });
    }

    handleTopicChange = (event) => {
        this.setState({
            topic:event.target.value
        });
    }

    onSubmit() {
      this.closeRequestSubmit();
    }

    closeRequest() {
      this.setState({modalIsOpen: false}, () => {
        this.props.updateParent();
      });
    }

    closeRequestSubmit() {
      this.setState({modalIsOpen: false}, () => {
        this.props.changeSettings(this.state.name, this.state.url, this.state.topic);
      });
    }

    render() {
      return (
        <Modal isOpen={this.state.modalIsOpen} closeRequest={this.closeRequest} className={this.props.className}>
                    <ModalHeader toggle={this.closeRequest}>Bar Chart Settings</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.name} onChange={this.handleNameChange} color="danger" placeholder= { this.props.name } />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="url" sm={2}>Url</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.url} onChange={this.handleUrlChange} color="danger" placeholder= { this.props.url } />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="topic" sm={2}>Topic</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.topic} onChange={this.handleTopicChange} color="danger" placeholder= { this.props.topic } />
                                </Col>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSubmit} >Submit</Button>
                        <Button color="secondary" onClick={this.closeRequest}>Cancel</Button>
                    </ModalFooter>
                </Modal>
      );
    }
}

export default BarChart;
