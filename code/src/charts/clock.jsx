import React from 'react';

import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input,
    Label, Card, CardHeader, CardBody, Col, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import Clock from 'react-live-clock';
import { CardCategory } from '../components';

class ClockDateWidgt extends React.Component{

    constructor(props) {
        super (props);
        this.state = {
            chart: true,
        }
        this.modal = false;
        this.name = this.props.chartName;

        this.deleteWidget = false;
        this.updateState = this.updateState.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.changeSettings = this.changeSettings.bind(this);
    }

    componentDidMount() {
        this.count++;
    }

    updateState() {
        this.setState({chart: false},() => {
          this.deleteWidget = true;
          this.props.removeWidg(this.props.id);
        });
    }

    changeSettings(name) { // not Saving changes on localStorage!!
        this.modal = !this.modal;
        this.name = name;

        var oldObject = JSON.parse(localStorage.getItem(this.props.id));
        var objct = {id:this.props.id, type: this.props.chartType, name: this.name, position: oldObject.position, changed: true}
        localStorage.setItem(this.props.id, JSON.stringify(objct));

        this.forceUpdate();
    }

    updateModal() {
        this.modal = !this.modal
        this.forceUpdate();
    }

    static defaultProps = {
        chartName:'clock'
    }

    shouldComponentUpdate(nextProps, nextState) {
      if(this.deleteWidget===true) {
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
                            <br/>
                            <CardCategory>{this.name}</CardCategory>
                            <UncontrolledDropdown className="cancel-drag">
                                <DropdownToggle className="btn-round btn-simple btn-icon" color="default">
                                    <i className="now-ui-icons loader_gear"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                <DropdownItem onClick={this.updateModal}>Change Settings</DropdownItem>
                                  { this.modal ? <ClockModal className="cancel-drag" updateParent={this.updateModal} name={this.name}  changeSettings={this.changeSettings} /> : null }
                                    <DropdownItem onClick={this.updateState} className="text-danger">Remove data</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </CardHeader>
                        <CardBody>
                            <section>
                              <h1 align="center">
                                <Clock format={'HH:mm:ss'} ticking={true} />
                              </h1>
                              <h4 align="center">
                                <Clock format={'dddd, DD/MM/Y'} ticking={true} />
                              </h4>
                            </section>
                        </CardBody>
                    </Card>
            );
        }
        else {
            console.log("show " + this.props.chartName + ": " + this.state.chart);
            return (
                <div/>
            );
        }
    }
}

class ClockModal extends React.Component{

    constructor(props) {
      super (props);
      this.state = {
        modalIsOpen: true,
        name: ""
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.closeRequest = this.closeRequest.bind(this);
      this.closeRequestSubmit = this.closeRequestSubmit.bind(this)

      this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange = (event) => {
        this.setState({
            name:event.target.value
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
        this.props.changeSettings(this.state.name);
      });
    }

    render() {
      return (
        <Modal isOpen={this.state.modalIsOpen} closeRequest={this.closeRequest} className={this.props.className}>
                    <ModalHeader toggle={this.closeRequest}>Line Chart Settings</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.name} onChange={this.handleNameChange} color="danger" placeholder= { this.props.name } />
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

export default ClockDateWidgt;
