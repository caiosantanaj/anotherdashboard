import React from 'react';
import { Bar } from 'react-chartjs-2';

var manyColors = []
function generateMultipleColors() {
    for(var i = 0; i < 100; i++) {
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',0.6)' ;
        if(!(manyColors.includes(color)))
            manyColors = manyColors.concat(color);
    }
    return manyColors;
}

// graphBar options
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

class BarMessageList extends React.Component {
    constructor(props) {
        super(props);
        this.hashmap = {};
        this.data = []
        this.labels = [];
        this.existsFlag = false;
        this.name = "";

        this.sendNameToFather = this.sendNameToFather.bind(this);
        this.useNameOnJson = this.useNameOnJson.bind(this);
    }

    sendNameToFather(name) {
        if (name != undefined || name != "")
            this.props.nameToFather(name);
    }

    useNameOnJson() {
        // if in json isn't "" and the name in form is default - True
        return this.name != this.props.data[0].name &&
            this.props.name == "BarChart";
    }

    render() {

        const valuesFromJson = this.props.data[0];

        if( valuesFromJson != null) {

            console.log(valuesFromJson.name);

            if(this.useNameOnJson()) {
                this.sendNameToFather(valuesFromJson.name);
                this.name = valuesFromJson.name;
            }

            var newElem = valuesFromJson.data.value;
            var newlabel = valuesFromJson.data.label;

            if(Object.keys(this.hashmap).length === 0) {
                this.hashmap[newlabel] = newElem;
            }
            else{
                var newElement = valuesFromJson.data.value;
                var new_label = valuesFromJson.data.label;

                for (var key in this.hashmap) {
                    if(key===new_label) {
                      this.hashmap[key] = newElement;
                      this.existsFlag = true;
                    }
                    if(this.existsFlag)
                        break;
                }
                if(!this.existsFlag) {
                    this.hashmap[new_label] = newElement;
                }
            }
            this.existsFlag = false;
            this.labels = Object.keys(this.hashmap);
            this.data = [];

            for(var key1 in this.hashmap) {
                this.data.push(this.hashmap[key1]);
            }
        }

        const dataSet = {
            labels: this.labels,
            datasets: [{
                label:"value",
                data: this.data,
                backgroundColor: generateMultipleColors(),
                fill:true
            }]
        }

        return(
            <div style={{position: "absolute", height:"73%", width:"95%"}}>
                <Bar data={dataSet} options={opts}/>
            </div>
        );
    }
}
export default BarMessageList;
