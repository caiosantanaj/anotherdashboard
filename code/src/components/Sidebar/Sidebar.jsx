import React from 'react';
import PieChartForm from './PieForm';
import BarChartForm from './BarForm';
import LineChartForm from './LineForm';
import GaugeChartForm from './GaugeForm';
import BubbleChartForm from './BubbleForm';
import ValueChartForm from './ValueForm';
import TextForm from './TextForm';
import ClockForm from './Clock';
import { Nav } from 'reactstrap';

// javascript plugin used to create scrollbars on windows

import logo from "../../assets/img/new_logo.svg";
import pieIcon from "../../assets/img/piechart-icon.svg"
import barIcon from "../../assets/img/barchart-icon.svg"
import lineIcon from "../../assets/img/linechart-icon.svg"
import gaugeIcon from "../../assets/img/gauge-icon.svg"
import bubbleIcon from "../../assets/img/bubblechart-icon.svg"
import updownIcon from "../../assets/img/updown.svg"
import settingIcon from "../../assets/img/settings-icon.svg"
import clockIcon from "../../assets/img/clock-date-icon.svg"
import textIcon from "../../assets/img/note-icon.svg"

class Sidebar extends React.Component{
    constructor (props) {
        super(props);
            this.state = {
                showPieModal: false,
                showBarModal: false,
                ShowLineModal: false,
                ShowGaugeModal: false,
                ShowBubbleModal: false,
                showValueModal: false,
                showTextModal: false,
                showClockModal: false,
                pieInfo: {},
                barInfo: {},
                lineInfo: {},
                gaugeInfo: {},
                bubbleInfo: {},
                valueInfo: {},
                textInfo: {},
                clockInfo: {}
            };

        this.onClickPieModal = this.onClickPieModal.bind(this);
        this.onClickBarModal = this.onClickBarModal.bind(this);
        this.onClickLineModal = this.onClickLineModal.bind(this);
        this.onClickGaugeModal = this.onClickGaugeModal.bind(this);
        this.onClickBubbleModal = this.onClickBubbleModal.bind(this);
        this.onClickValueModal = this.onClickValueModal.bind(this);
        this.onClickTextModal = this.onClickTextModal.bind(this);
        this.onClickClockModal = this.onClickClockModal.bind(this);
        this.onClickDocumentationModal = this.onClickDocumentationModal.bind(this);

        this.getTheChildrenValueFromPie = this.getTheChildrenValueFromPie.bind(this);
        this.getTheChildrenValueFromBar = this.getTheChildrenValueFromBar.bind(this);
        this.getTheChildrenValueFromLine = this.getTheChildrenValueFromLine.bind(this);
        this.getTheChildrenValueFromGauge = this.getTheChildrenValueFromGauge.bind(this);
        this.getTheChildrenValueFromBubble = this.getTheChildrenValueFromBubble.bind(this);
        this.getTheChildrenValueFromValue = this.getTheChildrenValueFromValue.bind(this);
        this.getTheChildrenValueFromText = this.getTheChildrenValueFromText.bind(this);
        this.getTheChildrenValueFromClock = this.getTheChildrenValueFromClock.bind(this);
    }

    onClickPieModal() {
        this.setState({
          showPieModal: !this.state.showPieModal
        });
    }

    onClickBarModal() {
        this.setState({
          showBarModal: !this.state.showBarModal
        });
    }

    onClickLineModal() {
        this.setState({
          showLineModal: !this.state.showLineModal
        });
    }

    onClickGaugeModal() {
        this.setState({
          showGaugeModal: !this.state.showGaugeModal
        });
    }

    onClickBubbleModal() {
        this.setState({
          showBubbleModal: !this.state.showBubbleModal
        });
    }

    onClickValueModal() {
        this.setState({
          showValueModal: !this.state.showValueModal
        });
    }

    onClickTextModal() {
        this.setState({
          showTextModal: !this.state.showTextModal
        });
    }

    onClickClockModal() {
        this.setState({
          showClockModal: !this.state.showClockModal
        });
    }

    onClickDocumentationModal() {
        window.open("https://github.com/caiosantanaj/anotherdashboard/wiki");
    }


    getTheChildrenValueFromPie(values) {
        this.setState.pieInfo = values;
        //funcão que envia os valores do formulário para o Dashboard(layout)->DashboardView
        this.props.valuesToFather(values);
    }

    getTheChildrenValueFromBar(values) {
        this.setState.barInfo = values;

        //funcão que envia os valores do formulário para o Dashboard(layout)->DashboardView
        this.props.valuesToFather(values);
    }

    getTheChildrenValueFromLine(values) {
        this.setState.lineInfo = values;

        //funcão que envia os valores do formulário para o Dashboard(layout)->DashboardView
        this.props.valuesToFather(values);
    }

    getTheChildrenValueFromGauge(values) {
        this.setState.gaugeInfo = values;

        //funcão que envia os valores do formulário para o Dashboard(layout)->DashboardView
        this.props.valuesToFather(values);
    }

    getTheChildrenValueFromBubble(values) {
        this.setState.BubbleInfo = values;

        //funcão que envia os valores do formulário para o Dashboard(layout)->DashboardView
        this.props.valuesToFather(values);
    }

    getTheChildrenValueFromValue(values) {
        this.setState.valueInfo = values;

        //funcão que envia os valores do formulário para o Dashboard(layout)->DashboardView
        this.props.valuesToFather(values);
    }

    getTheChildrenValueFromText(values) {
        this.setState.textInfo = values;

        //funcão que envia os valores do formulário para o Dashboard(layout)->DashboardView
        this.props.valuesToFather(values);
    }

    getTheChildrenValueFromClock(values) {
        this.setState.clockInfo = values;

        //funcão que envia os valores do formulário para o Dashboard(layout)->DashboardView
        this.props.valuesToFather(values);
    }

    render() {
        return (
            <div className="sidebar" data-color="blue">
                <div className="logo">
                	<a className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={logo} alt="react-logo" />
                        </div>
                	</a>
                	<a className="simple-text logo-normal">
                		Another Dashboard
                	</a>
                </div>
                <div className="sidebar-wrapper" ref="sidebar">
                    <Nav>
                        <button className="btn btn-info btn-lg" onClick={this.onClickPieModal}> <img src={pieIcon} alt="pieImage" width="20"/>&ensp; Pie Chart</button>
                            { this.state.showPieModal ? <PieChartForm updateSidebar={this.onClickPieModal} updateFather={this.getTheChildrenValueFromPie} /> : null }

                        <button className="btn btn-info btn-lg" onClick={this.onClickBarModal}> <img src={barIcon} alt="barImage" width="20"/>&ensp; Bar Chart</button>
                            { this.state.showBarModal ? <BarChartForm updateSidebar={this.onClickBarModal} updateFather={this.getTheChildrenValueFromBar} getValues /> : null }

                        <button className="btn btn-info btn-lg" onClick={this.onClickLineModal}> <img src={lineIcon} alt="lineImage" width="20"/>&ensp; Line Chart</button>
                            { this.state.showLineModal ? <LineChartForm updateSidebar={this.onClickLineModal} updateFather={this.getTheChildrenValueFromLine} /> : null }

                        <button className="btn btn-info btn-lg" onClick={this.onClickGaugeModal}> <img src={gaugeIcon} alt="gaugeImage" width="20"/>&ensp; Gauge Chart</button>
                            { this.state.showGaugeModal ? <GaugeChartForm updateSidebar={this.onClickGaugeModal} updateFather={this.getTheChildrenValueFromGauge} /> : null }

                        <button className="btn btn-info btn-lg" onClick={this.onClickBubbleModal}> <img src={bubbleIcon} alt="bubbleImage" width="20"/>&ensp; Bubble Chart</button>
                            { this.state.showBubbleModal ? <BubbleChartForm updateSidebar={this.onClickBubbleModal} updateFather={this.getTheChildrenValueFromBubble} getValues /> : null }

                        <button className="btn btn-info btn-lg" onClick={this.onClickValueModal}> <img src={updownIcon} alt="valueImage" width="20"/>&ensp; Value Evolution</button>
                            { this.state.showValueModal ? <ValueChartForm updateSidebar={this.onClickValueModal} updateFather={this.getTheChildrenValueFromValue} getValues /> : null }

                        <button className="btn btn-info btn-lg" onClick={this.onClickTextModal}> <img src={textIcon} alt="textImage" width="20"/>&ensp; Text</button>
                            { this.state.showTextModal ? <TextForm updateSidebar={this.onClickTextModal} updateFather={this.getTheChildrenValueFromText} /> : null }

                        <button className="btn btn-info btn-lg" onClick={this.onClickClockModal}> <img src={clockIcon} alt="clockImage" width="20"/>&ensp; Date/Clock</button>
                            { this.state.showClockModal ? <ClockForm updateSidebar={this.onClickClockModal} updateFather={this.getTheChildrenValueFromClock} /> : null }

                        <button className="btn btn-info btn-lg" onClick={this.onClickDocumentationModal}> <img src={settingIcon} alt="DocumentationImage" width="20"/>&ensp; Documentation</button>
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;
