import React from 'react';
import { Container } from 'reactstrap';
// used for making the prop types of this component
import PropTypes from 'prop-types';

import detiLogo from "../../assets/img/deti_logo.png";

class Footer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.changeStyle = this.changeStyle.bind(this);
    }

    changeStyle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <footer className="footer">
                <Container fluid={this.props.fluid ? true:false}>
                    <div className="copyright">
                        <img src={detiLogo} alt="Logo DETI" width="240px"/> &nbsp; &nbsp; &copy; {1900 + (new Date()).getYear()},
                        by Caio Jacobina, Fábio Ferreira and Manuel Gil.
                    </div>
                </Container>
            </footer>
        );
    }
}

Footer.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool
}

export default Footer;
