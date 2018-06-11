import React from 'react';
import {
    Navbar, NavbarToggler, NavbarBrand, Container
} from 'reactstrap';

import dashboardRoutes from '../../routes/dashboard.jsx';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.changeStyle = this.changeStyle.bind(this);
    }

    openSidebar() {
        document.documentElement.classList.toggle('nav-open');
        this.refs.sidebarToggle.classList.toggle('toggled');
        this.changeStyle();
    }

    changeStyle() {
        this.props.updateFather();
    }

    // navbar-absolute fixed-top navbar-transparent  navbar navbar-expand-lg bg-transparent

    render() {
        return (
            // add or remove classes depending if we are on full-screen-maps page or not
            <Navbar className={"navbar-absolute fixed-top navbar"}>
                <Container fluid>
                    <div className="navbar-wrapper">
                        <button type="button" ref="sidebarToggle" className="navbar-toggler" onClick={() => this.openSidebar()}>
                            <span className="navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </button>

                        <NavbarBrand href="/">{"Dashboard"}</NavbarBrand>
                    </div>

                </Container>
            </Navbar>
        );
    }
}

export default Header;
