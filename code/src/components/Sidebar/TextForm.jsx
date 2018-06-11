import React from 'react';

import { Col, FormGroup, Label, Input, Button, Modal,
        ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// javascript plugin used to create scrollbars on windows

class TextForm extends React.Component{
    constructor (props) {
        super(props);
            this.state = {
                isActivate: true,
                type: "text",
                name: "Note",
                cont: ""
            };

        this.closeRequest = this.closeRequest.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    closeRequest() {
        this.setState({
          isActivate: !this.state.isActivate
        });
        //funcão que envia os valores do formulário para o sidebar->Dashboard(layout)->DashboardView
        this.props.updateSidebar();
    }

    handleNameChange = (event) => {
        this.setState({
            name:event.target.value
        });
    }

    handleContentChange = (event) => {
        this.setState({
            cont:event.target.value
        });
    }

    onSubmit() {
        var values = [this.state.type, this.state.name, this.state.cont];
        this.props.updateFather(values);
        this.closeRequest();
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isActivate} closeRequest={this.closeRequest} className={this.props.className}>
                    <ModalHeader value={this.state.name} toggle={this.closeRequest}>Text Form Settings</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="name of the plot" />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="cont" sm={2}>Text</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.cont} onChange={this.handleContentChange} placeholder="content of form" />
                                </Col>
                            </FormGroup>

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                        <Button color="secondary" onClick={this.closeRequest}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default TextForm;
