import React from 'react';

import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input,
    Label, Card, CardHeader, CardBody, CardTitle, Col, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem, Row
} from 'reactstrap';

import ValueCh from '../mqtt/Value/ValueChart.js';

class ValueChart extends React.Component{

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
        this.numberOfValues = 15
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
            auth:this.props.authentication, user: this.props.user,
            password: this.props.password, position: oldObject.position,
            changed: false}

        localStorage.setItem(this.props.id, JSON.stringify(objct));

        this.setState({name: !this.state.name},() => {
            //this.refs.shouldUpdateChild.checkForUpdate();
        });
    }

    getKey() {
        console.log(this.newSettings)
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
        console.log("show " + this.props.chartName);
    }

    updateModal() {
        this.setState({modal: !this.state.modal},() => {
            //this.refs.shouldUpdateChild.checkForUpdate();
        });
    }

    changeSettings(name, url, topic, numberOfValues) { // not Saving changes on localStorage!!
        if(name != "") {
            this.name = name;
        }

        if(this.url != url) {
            this.url = url;
            this.newSettings=true
        }

        if(this.numberOfValues != numberOfValues) {
            this.numberOfValues = numberOfValues;
            this.newSettings=true;
        }

        this.topic = topic;

        var oldObject = JSON.parse(localStorage.getItem(this.props.id));
        var objct = {id:this.props.id,type: this.props.chartType, name: this.name,
                        url: this.url, topic: this.topic,numberOfValues: this.numberOfValues,
                        auth:this.props.authentication, user: this.props.user, password: this.props.password,
                        position: oldObject.position, changed: true}

        localStorage.setItem(this.props.id, JSON.stringify(objct));

        this.setState({modal: !this.state.modal},() => {
            //this.refs.shouldUpdateChild.checkForUpdate();
        });
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
        if(this.deleteWidget===true || this.state.modal != nextState.modal ||
            this.state.name != nextState.name) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
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
                                        { this.state.modal ? <ValueModal className="cancel-drag" updateParent={this.updateModal} name={this.name} url={this.url} topic={this.topic} numberOfValues={this.numberOfValues} changeSettings={this.changeSettings} /> : null }
                                    <DropdownItem onClick={this.updateState} className="text-danger">Remove data</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </CardHeader>
                        <CardBody>
                        <div align="center" className="cancel-drag">
                            <ValueCh key={this.getKey()} id={this.props.id} ref='shouldUpdateChild' name={this.name} url={this.url} topic={this.topic} authentication={this.props.authentication} user={this.props.user} password={this.props.password} numberOfValues={this.numberOfValues} valuesToFather={this.getName} />
                        </div>
                        </CardBody>
                    </Card>
            );
        }
        else {
            return (
                <div/>
            );
        }
    }
}

class ValueModal extends React.Component{

    constructor(props) {
      super (props);
      this.state = {
        modalIsOpen: true,
        name: this.props.name,
        url: this.props.url,
        topic:this.props.topic,
        numberOfValues: this.props.numberOfValues
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.closeRequest = this.closeRequest.bind(this);
      this.closeRequestSubmit = this.closeRequestSubmit.bind(this)

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleUrlChange = this.handleUrlChange.bind(this);
      this.handleTopicChange = this.handleTopicChange.bind(this);
      this.handleNumberOfValuesChange = this.handleNumberOfValuesChange.bind(this);
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

    handleNumberOfValuesChange = (event) => {
        this.setState({
            numberOfValues:event.target.value
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
            this.props.changeSettings(this.state.name, this.state.url, this.state.topic, this.state.numberOfValues);
        });
    }

    render() {
        return (
            <Modal isOpen={this.state.modalIsOpen} closeRequest={this.closeRequest} className={this.props.className}>
                <ModalHeader toggle={this.closeRequest}>Value Evolution Pane Settings</ModalHeader>
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
                            <FormGroup row>
                                <Label for="values" sm={2}>N° of Values</Label>
                                <Col sm={10}>
                                    <Input type="number" value={this.state.numberOfValues} onChange={this.handleNumberOfValuesChange} color="danger" placeholder= { this.props.numberOfValues } />
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

export default ValueChart;
