import React from 'react';

import {
    Row, Col
} from 'reactstrap';

import {Line} from 'react-chartjs-2';

import upIcon from "../../assets/img/upgreen.svg"
import downIcon from "../../assets/img/downred.svg"
import equalIcon from "../../assets/img/equalIcon.svg"

const opts = {
     elements: {
          point:{
              radius: 0
          }
      },
      legend: {
          display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          xAxes: [{
              ticks: {
                  display: false
              },
              gridLines: {
                  display:false
              }
          }],
          yAxes: [{
              ticks: {
                  display: false
              },
              gridLines: {
                  display:false
              }
          }]
      }

  }

class ValueMessageList extends React.Component {

    constructor(props) {
        super(props);
        this.val = 0;
        this.x = [];
        this.t = [];
        this.oldVal = 0;
        this.arrow = "";
        this.name = "";

        this.copyValues = this.copyValues.bind(this);
        this.getHour = this.getHour.bind(this);
        this.sendNameToFather = this.sendNameToFather.bind(this);
        this.useNameOnJson = this.useNameOnJson.bind(this);
    }

    didIncreased(old, current) {
        if(old < current) {
            this.arrow = upIcon;
        }
        else if(old == current) {
            this.arrow = equalIcon;
        }
        else {
            this.arrow = downIcon;
        }
    }

    copyValues() {
        this.x = this.x.slice(1, this.x.length);
        this.t = this.t.slice(1, this.t.length);
    }

    getHour() {
        var time = new Date();

        var h = time.getHours();
        var m = "";

        if(time.getHours() < 10)
            h = "0" + time.getHours();
        else
            h = time.getHours();

        if(time.getMinutes() < 10)
            m = "0" + time.getMinutes();
        else
            m = time.getMinutes();

        return h + ":" + m;
    }

    sendNameToFather(name) {
        if (name != undefined || name != "")
            this.props.valuesToFather(name);
    }

    useNameOnJson() {
        return this.name != this.props.data[0].name &&
            this.props.name == "ValueChart";
    }

    render() {
        //Se a informação não for nula mostramos o novo valor recebido
        //O valor também é adicionada ao array 'x' para mostrar os valores ao
        //longo do tempo
        const valuesFromJson = this.props.data[0];

        if(valuesFromJson != null) {
            if(this.useNameOnJson()) {

                this.sendNameToFather(valuesFromJson.name);
                this.name = valuesFromJson.name;

                //var objct = {name:this.name}
                //localStorage.setItem(this.props.id, JSON.stringify(objct))
            }

            //Busca os valores do json
            var newElem = valuesFromJson.data.value;
            if(!(newElem == null)) {

                if (this.x.length == this.props.conf.numberOfValues) {
                    this.copyValues();
                }

                this.val = newElem;
                //Adiciona o novo valor ao array
                this.x = this.x.concat(newElem);

                //Busca a hora atual para ver os valores recebidos
                this.t = this.t.concat(this.getHour());
            }
        }

        this.didIncreased(this.old, this.val);
        this.old = this.val;

        const dataSet = {
            labels: this.t,
            datasets: [{
                data: this.x,
                backgroundColor:'rgb(208, 225, 225)',
                borderColor: '#2E2E2E',
                borderWidth: 2,
                fill:true,
                responsive: true
            }]
        }
        return(
            <div style={{position: "absolute", height:"85%", width:"98%"}}>
                <Row>
                  <Col align="right">
                    <img src={this.arrow} alt="upIcon" width="50"/>
                  </Col>
                  <Col align="left">
                    <h1>{this.val}</h1>
                  </Col>
                </Row>
                <Row style={{position: "absolute", height:"45%", width:"98%"}}>
                <Line height={50} data={dataSet}
                    options={opts} />
                </Row>
            </div>
        );
    }
}


export default ValueMessageList;
