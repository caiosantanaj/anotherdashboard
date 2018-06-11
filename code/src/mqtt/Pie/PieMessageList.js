import React from 'react';
import {Pie} from 'react-chartjs-2';

var manyColors = []
function generateMultipleColors() {
    for(var i = 0; i < 100; i++) {
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',0.6)' ;
        if(!(manyColors.includes(color)))
            manyColors = manyColors.concat(color);
    }
    return manyColors;
}

class PieMessageList extends React.Component {
    constructor(props) {
        super(props);
        this.name = "";
        this.hashmap = {};
        this.data = [] ;
        this.labels = [];
        this.existsFlag = false;

        this.sendNameToFather = this.sendNameToFather.bind(this);
        this.useNameOnJson = this.useNameOnJson.bind(this);
    }

    sendNameToFather(name) {
        if (name != undefined || name != "")
            this.props.valuesToFather(name);
    }

    useNameOnJson() {
        return this.name != this.props.data[0].name &&
            this.props.name == "PieChart";
    }

    render() {

        const valuesFromJson = this.props.data[0];

        if(valuesFromJson != null) {

            if(this.useNameOnJson()) {
                this.sendNameToFather(valuesFromJson.name);
                this.name = valuesFromJson.name;

                //var objct = {name:this.name}
                //localStorage.setItem(this.props.id, JSON.stringify(objct))
            }

            var newElem = valuesFromJson.data.value;
            var newlabel = valuesFromJson.data.label;
            if(Object.keys(this.hashmap).length === 0) {
                this.hashmap[newlabel] = newElem;
            }
            else{
                var newElement = valuesFromJson.data.value;
                var new_label = valuesFromJson.data.label;

                for(var key in this.hashmap) {
                    if(key === new_label) {
                        this.hashmap[key] = newElement;
                        this.existsFlag = true;
                    }
                    if(this.existsFlag) {
                        break;
                    }
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
            datasets: [
                {
                    label:"pie",
                    data: this.data,
                    backgroundColor: generateMultipleColors(),
                    fill:true
                }
            ]
        }

        return(
            <div style={{position: "absolute", height:"73%", width:"95%"}}>
                <Pie data={dataSet} options={{responsive:true, maintainAspectRatio: false }}/>
            </div>
        );
    }
}

export default PieMessageList;
