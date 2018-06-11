import React from 'react';
import {Line} from 'react-chartjs-2';

const opts = {
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false,
                color:'rgb(140, 140, 140)'
            }
        }],
        yAxes: [{
            gridLines: {
                display: false,
                color:'rgb(140, 140, 140)'
            }
        }]
    },
    responsive:true,
    maintainAspectRatio: false
}

const colors = [
    'rgb(77, 166, 255, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgb(255, 204, 0, 0.6)',
    'rgb(0, 230, 0, 0.6)'
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

const randomColor = getRandomColor();

class LineMessageList extends React.Component{

    constructor(props) {
        super(props);
        this.x = [];
        this.t = [];
        this.name = "";

        this.getHour = this.getHour.bind(this);
        this.copyValues = this.copyValues.bind(this);
        this.sendNameToFather = this.sendNameToFather.bind(this);
        this.useNameOnJson = this.useNameOnJson.bind(this);
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

    copyValues() {
        this.x = this.x.slice(1, this.x.length);
        this.t = this.t.slice(1, this.t.length);
    }

    sendNameToFather(name) {
        if (name != undefined || name != "")
            this.props.valuesToFather(name);
    }

    useNameOnJson() {
        return this.name != this.props.data[0].name &&
            this.props.name == "LineChart";
    }

    render() {

        const valuesFromJson = this.props.data[0]

        if(valuesFromJson != null) {

            if(this.name != this.props.data[0].name && this.props.name == "LineChart") {
                this.sendNameToFather(valuesFromJson.name);
                this.name = valuesFromJson.name;
            }

            //Busca os valores do json
            var newElem = valuesFromJson.data.value;
            if(!(newElem == null)) {

            if (this.x.length == this.props.conf.numberOfValues) {
                this.copyValues();
            }
                //Adiciona o novo valor ao array
                this.x = this.x.concat(newElem);

                //Busca a hora atual para ver os valores recebidos
                this.t = this.t.concat(this.getHour());
            }
        }

        const dataSet = {
            labels: this.t,
            datasets: [{
                    label:"point",
                    data: this.x,
                    backgroundColor: randomColor,
                    fill:true
                }]
        }

        return(
            <div style={{position: "absolute", height:"73%", width:"95%"}} >
                <Line data={dataSet} options={opts}/>
            </div>
            );
    }
}
export default LineMessageList;
