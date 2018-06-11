import React from 'react';
import {Doughnut} from 'react-chartjs-2';

function getHexColor(value) {
	var string = value.toString(16);
	return (string.length === 1) ? '0' + string : string;
}

const opts = {
    legend: {
        display: false
    },
	responsive: true,
	maintainAspectRatio: false,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
	tooltips: {
		enabled: false
	}
}

class GaugeMessageList extends React.Component {

    constructor(props) {
        super(props);
        this.val = "";
        this.vals = [];
        this.maximum = "";
		this.minimum = "";
		this.count = 0;
		this.name = "";

		this.filled = "";
		this.empty = "";
        this.min = this.props.min;
        this.max = this.props.max;

        this.getMaximum = this.getMaximum.bind(this);
        this.getCompleteHex = this.getCompleteHex.bind(this);
		this.sendNameToFather = this.sendNameToFather.bind(this);
		this.sendMinToFather = this.sendMinToFather.bind(this);
		this.sendMaxToFather = this.sendMaxToFather.bind(this);
		this.useNameOnJson = this.useNameOnJson.bind(this);
		this.useMinOnJson = this.useMinOnJson.bind(this);
		this.useMaxOnJson = this.useMaxOnJson.bind(this);
    }

	sendNameToFather(name) {
        if (name != undefined || name != "")
            this.props.nameToFather(name);
    }

	sendMinToFather(min) {
        if (min != undefined || min != "")
            this.props.minToFather(min);
    }

	sendMaxToFather(max) {
        if (max != undefined || max != "")
            this.props.maxToFather(max);
    }

    getCompleteHex(value, max) {
        var factor = 255/max;

        var r = Math.floor(value * factor);
		var g = Math.floor(255 - (value * factor));
        var b = 0;

		var rgb = 'rgb(' + r + ',' + g + ',' + b + ',' + 0.8 + ')';

        return rgb;
    }

	// adaptar min e max se o val ultrapassar esses limites
	checkMinMax(count) {
		if(this.val > this.max && count > 1) {
			this.max = this.val;
		}
		else if(this.val < this.min && count > 1) {
			this.min = this.val;
		}
	}

	getGaugeValues(count) {
		if(count <= 1) {
			this.filled = this.val;
			this.empty = this.max - this.min;
		}
		else {
			this.filled = this.val - parseInt(this.min);
			this.empty = this.max - this.val;
		}
	}

	getPrintValue() {
		if(this.val == "") {
			var print = "__";
		}
		else {
			var print = this.val;
		}
		return print;
	}

	getMinimum(vals) {
        var min;
        min = Math.min(...vals);
        if(isFinite(min)) {
            this.minimum = min;
        }
        else {
            this.minimum = "__";
        }
    }

	getMaximum(vals) {
        var max;
        max = Math.max(...vals);
        if(isFinite(max)) {
            this.maximum = max;
        }
        else {
            this.maximum = "__";
        }
    }

	useNameOnJson() {
        // if in json isn't "" and the name in form is default - True
        return this.name != this.props.data[0].name &&
            this.props.name == "Gauge";
    }

	useMinOnJson() {
        // if in json isn't "" and the name in form is default - True
        return this.min != this.props.data[0].min &&
			this.props.min == 0;
    }

	useMaxOnJson() {
        // if in json isn't "" and the name in form is default - True
        return this.min != this.props.data[0].max &&
			this.props.max == 100;
    }

    render() {

		const valuesFromJson = this.props.data[0];

        if(valuesFromJson!=null) {

			if(this.useNameOnJson()) {
                this.sendNameToFather(valuesFromJson.name);
                this.name = valuesFromJson.name;
            }

			if(this.useMinOnJson()) {
                this.sendMinToFather(valuesFromJson.min);
                this.min = valuesFromJson.min;
            }

			if(this.useMaxOnJson()) {
                this.sendMaxToFather(valuesFromJson.max);
                this.max = valuesFromJson.max;
            }

            var newElem = valuesFromJson.data.value;
            this.vals = [newElem].concat(this.vals);

            this.val = valuesFromJson.data.value;
        }

		this.checkMinMax(this.count);
		this.getGaugeValues(this.count);
		this.getMinimum(this.vals);
		this.getMaximum(this.vals);
		this.count++;

		const data = {
			datasets: [{
				data: [this.filled, this.empty],
				backgroundColor: [
				this.getCompleteHex(this.val, this.max),
				'#F2F2F2'
				],
				hoverBackgroundColor: [
				this.getCompleteHex(this.val, this.max),
				'#F2F2F2'
		        ],
		        borderColor:'#737373'
			}],

		};

        return(
            <div style={{position: "absolute", height:"80%", width:"100%"}}>
				<div align="center" style={{position: "absolute", height:"65%", width:"90%"}}>
					<Doughnut data={data} options={opts} />
					<h5><b>{this.getPrintValue()}</b></h5>
					<div align='left'>
						<h8>&emsp;Min: <b>{this.minimum}</b> &emsp; Max: <b>{this.maximum}</b> (so far)</h8>
					</div>
				</div>
        	</div>
        );
    }
}

export default GaugeMessageList;
