import React from 'react';

import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input,
    Label, Card, CardHeader, CardBody, CardTitle, Col, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

class TextWidg extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            chart: true,
            //modal: false
        }
        this.modal = false;
        this.name = this.props.chartName;
        this.cont = this.props.cont;

        this.deleteWidget = false;
        this.updateState = this.updateState.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.changeSettings = this.changeSettings.bind(this);
    }
    componentDidMount() {
        this.count++;
    }

    updateModal() {
      this.modal = !this.modal
      this.forceUpdate();
    }

    changeSettings(name, cont) { // not Saving changes on localStorage!!
      this.modal = !this.modal
      if(name != "") {
          this.name = name;
      }
      if(cont != "") {
          this.cont = cont;
      }

      var oldObject = JSON.parse(localStorage.getItem(this.props.id));
      var objct = {id:this.props.id, type: this.props.chartType, name: this.name, cont: this.cont, position: oldObject.position,changed:true}
      localStorage.setItem(this.props.id, JSON.stringify(objct));
      this.forceUpdate();
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
                    <Card className="card-chart" style={{height:"100%"}}>
                        <CardHeader>
                            <CardTitle>{this.name}</CardTitle>
                            <UncontrolledDropdown className="cancel-drag">
                                <DropdownToggle className="btn-round btn-simple btn-icon" color="default">
                                    <i className="now-ui-icons loader_gear"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.updateModal}>Change Settings</DropdownItem>
                                      { this.modal ? <NoteModal className="cancel-drag" updateParent={this.updateModal} name={this.name} cont={this.cont} changeSettings={this.changeSettings} /> : null }
                                    <DropdownItem onClick={this.updateState} className="text-danger">Remove data</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </CardHeader>
                        <CardBody style={{height:"82%"}}>
                            <section className="cancel-drag" style={{overflowX: "hidden", overflowY:"scroll",height:"92%"}}>
                                <p>{this.cont}</p>
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

class NoteModal extends React.Component{

    constructor(props) {
      super (props);
      this.state = {
        modalIsOpen: true,
        name: this.props.name,
        cont: this.props.cont,
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.closeRequest = this.closeRequest.bind(this);
      this.closeRequestSubmit = this.closeRequestSubmit.bind(this)

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleNameChange = (event) => {
        this.setState({
            name:event.target.value
        });
    }
    handleTextChange = (event) => {
        this.setState({
            cont:event.target.value
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
        this.props.changeSettings(this.state.name, this.state.cont);
      });
    }

    render() {
      return (
        <Modal isOpen={this.state.modalIsOpen} closeRequest={this.closeRequest} className={this.props.className}>
                    <ModalHeader toggle={this.closeRequest}>Note Settings</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.name} onChange={this.handleNameChange} color="danger" placeholder="name of the plot" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="text" sm={2}>Text</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.cont} onChange={this.handleTextChange} placeholder="text to section" />
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
export default TextWidg;
