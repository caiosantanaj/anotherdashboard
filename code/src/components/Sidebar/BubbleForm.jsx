import React from 'react';

import { Col, FormGroup, Label, Input, Button, Modal,
        ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BubbleForm extends React.Component {
    constructor (props) {
        super(props);
            this.state = {
                isActivate: true,
                type: "bubble",
                name: "BubbleChart",
                link: "",
                topic: "",
                auth: false,
                input_disabled: true,
                user: "",
                password: ""
            };

        this.closeRequest = this.closeRequest.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleAuthChange = this.handleAuthChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.isURL = this.isURL.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isURL(str) {
        var pattern = new RegExp('^(ws?:\\/\\/)?'+ '^(wss?:\\/\\/)?' +// protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?'+ // port
            '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
            '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        console.log(pattern.test(str))
        return pattern.test(str);
    }

    closeRequest() {
        this.setState({
          isActivate: !this.state.isActivate
        });
        this.props.updateSidebar();
    }

    handleNameChange = (event) => {
        this.setState({
            name:event.target.value
        });
    }

    handleLinkChange = (event) => {
        this.setState({
            link:event.target.value
        });
    }

    handleTopicChange = (event) => {
        this.setState({
            topic:event.target.value
        });
    }

    handleAuthChange = (event) => {
        this.setState({
            auth: !this.state.auth
        });
        this.setState({
            input_disabled: !this.state.input_disabled
        });
    }

    handleUserChange = (event) => {
        this.setState({
            user: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    onSubmit() {
        if(this.isURL(this.state.link)) {
            var values = [this.state.type, this.state.name, this.state.link, this.state.topic, this.state.auth, this.state.user, this.state.password];
            this.props.updateFather(values);
            this.closeRequest();
        }
        else{
            alert("invalid URL");
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isActivate} closeRequest={this.closeRequest} className={this.props.className}>
                    <ModalHeader value={this.state.name} toggle={this.closeRequest}>BubbleBar Chart Settings</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup row>
                                <Label for="name" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="name of the plot" />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="link" sm={2}>Link</Label>
                                <Col sm={10}>
                                    <Input type="url" value={this.state.link} onChange={this.handleLinkChange} placeholder="ws://example.com:9001" />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="topic" sm={2}>Topic</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.topic} onChange={this.handleTopicChange} placeholder="name of the topic" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                    <label><input value={this.state.auth} onChange={this.handleAuthChange} type="checkbox"/>&ensp; Authentication</label>
                            </FormGroup>
                        </form>
                        { !this.state.input_disabled ?
                                (
                                    <form>
                                        <FormGroup row>
                                        <Label for="user" sm={2}>Username</Label>
                                        <Col sm={10}>
                                            <Input type="text" value={this.state.user} onChange={this.handleUserChange} placeholder="username"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="password" sm={2}>Password</Label>
                                        <Col sm={10}>
                                            <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="password"/>
                                        </Col>
                                    </FormGroup>
                                    </form>
                                ) : null
                            }
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

export default BubbleForm;
