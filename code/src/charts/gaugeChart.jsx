import React from 'react';

import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input,
    Label, Card, CardHeader, CardBody, CardTitle, Col, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import GaugeCh from '../mqtt/Gauge/GaugeChart.js';


class GaugeChart extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            chart: true,
            modal: false,
            name: false,
            min: false,
            max: false
        }
        this.modal = false;
        this.newSettings = false;
        this.name = this.props.chartName;
        this.minVal = this.props.minVal;
        this.maxVal = this.props.maxVal;
        this.url = this.props.url;
        this.topic = this.props.topic;
        this.deleteWidget = false;
        this.keyCount = 0;

        this.updateState = this.updateState.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.changeSettings = this.changeSettings.bind(this);
        this.getName = this.getName.bind(this);
        this.getMin = this.getMin.bind(this);
        this.getMax = this.getMax.bind(this);
        this.getKey = this.getKey.bind(this);
    }

    getName(name) {
        this.name = name;
        var oldObject = JSON.parse(localStorage.getItem(this.props.id));
        var objct = {id:this.props.id, type: this.props.chartType, name: this.name,
             minVal: this.minVal, maxVal: this.maxVal, url: this.url, topic: this.topic,
              auth:this.props.authentication, user: this.props.user, password: this.props.password, position: oldObject.position,
              changed: false}

        localStorage.setItem(this.props.id, JSON.stringify(objct));
        this.setState({name: !this.state.name},() => {
            //this.refs.shouldUpdateChild.checkForUpdate();
        });
    }

    getMin(value) {
        this.minVal = value;

        var oldObject = JSON.parse(localStorage.getItem(this.props.id));
        var objct = {id:this.props.id, type: this.props.chartType, name: this.name,
             minVal: this.minVal, maxVal: this.maxVal, url: this.url, topic: this.topic,
              auth:this.props.authentication, user: this.props.user, password: this.props.password, position: oldObject.position,
              changed: false}

        localStorage.setItem(this.props.id, JSON.stringify(objct));
        this.setState({min: !this.state.min},() => {
            //this.refs.shouldUpdateChild.checkForUpdate();
        });
    }

    getMax(value) {
        this.maxVal = value;

        var oldObject = JSON.parse(localStorage.getItem(this.props.id));
        var objct = {id:this.props.id, type: this.props.chartType, name: this.name,
             minVal: this.minVal, maxVal: this.maxVal, url: this.url, topic: this.topic,
              auth:this.props.authentication, user: this.props.user, password: this.props.password, position: oldObject.position,
              changed: false}

        localStorage.setItem(this.props.id, JSON.stringify(objct));
        this.setState({max: !this.state.max},() => {
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
        //console.log("show " + this.props.chartName);
    }

    updateModal() {
        this.setState({modal: !this.state.modal},() => {
            //this.refs.shouldUpdateChild.checkForUpdate();
        });
    }

    changeSettings(name, minVal, maxVal, url, topic) {
        if(name != "") {
            this.name = name;
        }

        if(typeof minVal == 'undefined') {
            minVal = this.minVal;
        }
        if(this.minVal != minVal && typeof minVal !== 'undefined') {
            this.minVal = minVal;
            this.newSettings=true;
        }
        if(typeof maxVal == 'undefined') {
            maxVal = this.maxVal;
        }
        if(this.maxVal != maxVal && typeof maxVal !== 'undefined') {
            this.maxVal = maxVal;
            this.newSettings=true;
        }
        if(this.url != url) {
            this.url = url;
            this.newSettings=true;
        }
        this.topic = topic;

        var oldObject = JSON.parse(localStorage.getItem(this.props.id));
        var objct = {id:this.props.id, type: this.props.chartType, name: this.name,
                minVal: this.minVal, maxVal: this.maxVal, url: this.url, topic: this.topic,
                auth:this.props.authentication, user: this.props.user, password: this.props.password,
                position:oldObject.position, changed:true }

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
        if(this.deleteWidget===true || this.state.modal != nextState.modal || this.state.name != nextState.name
            || this.state.minVal != nextState.minVal || this.state.maxVal != nextState.maxVal) {
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
                                  { this.state.modal ? <GaugeModal className="cancel-drag" updateParent={this.updateModal} name={this.name} url={this.url} min={this.minVal} max={this.maxVal} topic={this.topic} changeSettings={this.changeSettings} /> : null }
                                <DropdownItem onClick={this.updateState} className="text-danger">Remove data</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </CardHeader>
                        <CardBody>
                        <section>
                            <div align="center" className="cancel-drag">
                                <GaugeCh key={this.getKey()} id={this.props.id} ref='shouldUpdateChild' name={this.name} url={this.url} topic={this.topic} authentication={this.props.authentication}
                                        min={this.minVal} max={this.maxVal} user={this.props.user} password={this.props.password} nameToFather={this.getName} minToFather={this.getMin} maxToFather={this.getMax} />
                            </div>
                        </section>
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

class GaugeModal extends React.Component{

    constructor(props) {
      super (props);
      this.state = {
        modalIsOpen: true,
        name: this.props.name,
        minVal: this.props.min,
        maxVal: this.props.max,
        url: this.props.url,
        topic:this.props.topic
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.closeRequest = this.closeRequest.bind(this);
      this.closeRequestSubmit = this.closeRequestSubmit.bind(this)

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleMinValChange = this.handleMinValChange.bind(this);
      this.handleMaxValChange = this.handleMaxValChange.bind(this);
      this.handleUrlChange = this.handleUrlChange.bind(this);
      this.handleTopicChange = this.handleTopicChange.bind(this);
    }

    handleNameChange = (event) => {
        this.setState({
            name:event.target.value
        });
    }
    handleMinValChange = (event) => {
        this.setState({
            minVal:event.target.value
        });
    }

    handleMaxValChange = (event) => {
        this.setState({
            maxVal:event.target.value
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
        this.props.changeSettings(this.state.name, this.state.minVal, this.state.maxVal, this.state.url, this.state.topic);
      });
    }

    render() {
      return (
        <Modal isOpen={this.state.modalIsOpen} closeRequest={this.closeRequest} className={this.props.className}>
                    <ModalHeader toggle={this.closeRequest}>Gauge Chart Settings</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.name} onChange={this.handleNameChange} color="danger" placeholder="name of the plot" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="minVal" sm={2}>Min. Value</Label>
                                <Col sm={10}>
                                    <Input type="number" value={this.state.minVal} onChange={this.handleMinValChange} placeholder="0" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="maxVal" sm={2}>Max. Value</Label>
                                <Col sm={10}>
                                    <Input type="number" value={this.state.maxVal} onChange={this.handleMaxValChange} placeholder="100" />
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
export default GaugeChart;
