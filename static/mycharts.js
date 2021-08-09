'use strict';
class barchartnew {

    constructor() {
        console.log("amo mewwane constructors");
    }

    createchart(elementID, labelID, Unit, Label, StartVal) {
        this.labels = [
            this.gettime(),
        ];
        this.labelID = labelID;
        this.Unit = Unit;
        this.data = {
            labels: this.labels,
            datasets: [{
                label: Label,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [StartVal, ],
            }]
        };

        this.config = {
            type: 'line',
            data: this.data,
            options: {}
        };

        this.myChart = new Chart(document.getElementById(elementID), this.config);
    }

    gettime() {
        let time = new Date();
        let currtime = (time.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }));
        return currtime;
    }

    pushdata(y_data) {
        this.data.datasets[0].data.push(y_data);
        let current_time = this.gettime();
        this.labels.push(current_time);
        this.myChart.update();
        document.getElementById(this.labelID).innerHTML = y_data + this.Unit;
    }

}

//createchart(elementID, labelID, Unit, Label, StartVal)
var cpuchart = new barchartnew();
cpuchart.createchart("cpuchart", "usage_percentage", " %", "CPU Usage", 100);

var memorychart = new barchartnew();
memorychart.createchart("ramchart", "ram_percentage", " GB", "Memory Usage", 16.0);

var socket = io();

socket.emit('request usage', "ping");

/*
let response = {
    "LogicalProcessors": cpuCount,
    "CPUUsage": cpuusage,
    "TotalMemory": totmem,
    "UsedMemory": usedmem
}; */
socket.on('response usage', function(response) {

    console.log("Received usage -> " + JSON.stringify(response));
    cpuchart.pushdata(response.CPUUsage);
    memorychart.pushdata(response.UsedMemory);


});