import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

import { Header, Footer, Sidebar } from '../../components';

import MyFirstGrid from '../../views/Dashboard/Dashboard.jsx';

var ps;

class Dashboard extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
        };
        this.getInfo = this.getInfo.bind(this);
        this.changeStyle = this.changeStyle.bind(this);

    }

    componentDidMount() {
        if(navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(this.refs.mainPanel);
            document.body.classList.toggle("perfect-scrollbar-on");
        }
    }
    componentWillUnmount() {
        if(navigator.platform.indexOf('Win') > -1) {
            ps.destroy();
            document.body.classList.toggle("perfect-scrollbar-on");
        }
    }
    componentDidUpdate(e) {
      if(e.history.action === "PUSH") {
        this.refs.mainPanel.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
      }
    }

    getInfo(values) {
        ////funcão que envia os valores do formulário para o DashboardView
        this.refs.dash.setValues(values);
    }

    changeStyle() {
        this.refs.dash.changeStyle();
        this.refs.foot.changeStyle();
    }


    render() {
        console.log("re rendered")
        return (
            <div className="wrapper">
                <Sidebar {...this.props} valuesToFather={this.getInfo} routes={"views/Dashboard/Dashboard.jsx"}/>

                <div className="main-panel" ref="mainPanel" >
                    <Header {...this.props} updateFather={this.changeStyle}/>
                    <MyFirstGrid ref='dash' />
                    <Footer ref='foot'/>
                </div>
            </div>
        );
    }
}

export default Dashboard;
