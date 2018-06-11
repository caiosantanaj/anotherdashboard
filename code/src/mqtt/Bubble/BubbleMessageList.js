import React from 'react';
import {Bubble} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

defaults.global.tooltips.enabled = true;

const opts = {
    legend: {
        display: true
    },
    responsive:true,
    maintainAspectRatio: false
}

// cores pre definidas
var colors = [
    'rgb(77, 166, 255, 0.6)',
    'rgb(255, 99, 132, 0.6)',
    'rgb(255, 204, 0, 0.6)',
    'rgb(0, 230, 0, 0.6)'
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

const randomColor = getRandomColor();

// ou array de cores random
var manyColors = []
function generateMultipleColors() {
    for(var i = 0; i < 100; i++) {
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',0.6)' ;
        if(!(manyColors.includes(color)))
            manyColors = manyColors.concat(color);
    }
    return manyColors;
}

class BubbleMessageList extends React.Component {
    constructor(props) {
        super(props);

        this.colors = generateMultipleColors();

        this.x = "";
        this.y = "";
        this.r = "";
        this.name = "";

        this.values = [];
        this.datasets = [];
        this.points = {};
        this.labels = [];
        this.sendNameToFather = this.sendNameToFather.bind(this);
    }

	sendNameToFather(name) {
        if (name != null || name != "")
            this.props.nameToFather(name);
    }

    getDatasets(label, data) {
        var setTmp = [];
        var colorTmp = this.colors[Math.floor(Math.random() * this.colors.length)];
        var index;

        if(label != undefined && data != undefined) {

            if(!(this.labels.includes(label)) ) {
                index = this.colors.indexOf(colorTmp);
                this.colors.splice(index, 1);
                setTmp = [{label: label, backgroundColor: colorTmp, data: data}];
                if(label != undefined)
                    this.labels = this.labels.concat(label);

                this.datasets = this.datasets.concat(setTmp);
            }
            else {
                for (index = 0; index < this.datasets.length; ++index) {
                    this.addDataToSet(this.datasets[index], label, data);
                }
            }
        }
        return this.datasets;
    }

    addDataToSet(dataset, label, newData) {
        var newSet = {}
        if(label == dataset.label) {
            var oldData = dataset.data;
            var newSet = {label: label, backgroundColor: dataset.backgroundColor, data:newData }
            var index = this.datasets.indexOf(dataset);
            this.datasets[index] = newSet;
        }
    }

    render() {

        const valuesFromJson = this.props.data[0];

        if(valuesFromJson != null) {

            if(this.name != valuesFromJson.name && this.props.name == "BubbleChart") {
                this.sendNameToFather(valuesFromJson.name);
                this.name = valuesFromJson.name;
            }

            this.x = valuesFromJson.data.values.x;
            this.y = valuesFromJson.data.values.y;
            this.r = valuesFromJson.data.values.r;
            var obj = { x: this.x, y: this.y, r:this.r };

            var label = valuesFromJson.data.label;
            if(!(label in this.points)) {
                this.points[label] = [obj];
            }
            else {
                var tmp = this.points[label];
                tmp = tmp.concat([obj]);
                this.points[label] = tmp;
            }
        }

        const dataSet = {
          datasets: this.getDatasets(label, this.points[label])
        };

        return(
            <div style={{position: "absolute", height:"73%", width:"95%"}}>
              <Bubble data={dataSet} options={opts}/>
            </div>
          );
        }
}

export default BubbleMessageList;
