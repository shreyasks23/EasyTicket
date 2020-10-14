$(function () {

    //global ref variables
    let DDLProjectName = $("#DDLProjectName");    
    let Chart1 = new Chart($("#Chart1"), {
        type: "bar"
    });    
    let Chart2 = new Chart($("#Chart2"), {
        type: "pie"
    });

    $.getJSON("/apis/GetTicketDetails").done((res) => {
        let labels = [];
        let x = [];
        x = res.map((v) => {
            labels.push(v._id);
            return v.Count;
        });
        console.log(x, labels);
        CreateDynamicChart(Chart1, x, labels);
        CreateDynamicChart(Chart2, x, labels);
    });
    BindProjectsToDDL(DDLProjectName);

    DDLProjectName.on("change", () => {
        let query = "/apis/GetTicketDetails?Project=";

        query += DDLProjectName.val();
        console.log(query);

        $.getJSON(query).done((res) => {
            let labels = [];
            let x = [];
            x = res.map((v) => {
                labels.push(v._id);
                return v.Count;
            });
            console.log(x, labels);
            CreateDynamicChart(Chart1, x, labels);
            CreateDynamicChart(Chart2, x, labels);

        });
    });
});

function CreateDynamicChart(chartObj, dataset, labels) {

    console.log(chartObj);
    let xAxes;
    let yAxes;

    if (chartObj.config.type == 'bar' || chartObj.config.type == 'line') {

        xAxes = [{
            display: true,
            gridLines: {
                display: true
            },

        }];
        yAxes = [{
            display: true,
            gridLines: {
                display: false
            },
            ticks: {
                beginAtZero: true,
                stepSize: 1
            }
        }];
    }
    else if(chartObj.config.type == 'pie'){
        xAxes = [{
            display: false,
            gridLines: {
                display: false
            },

        }];
        yAxes = [{
            display: false,
            gridLines: {
                display: false
            },
            ticks: {
                beginAtZero: true,
                stepSize: 1
            }
        }];
    }

    let totalTickets;
    let RecDataSet;




    if (dataset.length > 0) {
        totalTickets = dataset.reduce((a, v) => {
            return a += v;
        });
        RecDataSet = dataset;
    } else {
        totalTickets = 0;
        RecDataSet = [];
    }

    chartObj.data.labels = labels;

    let chartData = {
        data: RecDataSet,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ]
    };
    

    chartObj.options = {
        events: ['click'],
        title: {
            display: true,
            text: ' total tickets: ' + totalTickets
        },
        legend: {
            display: false,
            labels: {
                fontColor: "Black"
            }
        },
        scales: {
            xAxes : xAxes,            
            yAxes: yAxes
        }
    };
    chartObj.data.datasets[0] = (chartData);
    chartObj.update();
    console.log(chartObj);
}