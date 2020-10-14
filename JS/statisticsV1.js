$(function () {
    let DDLProjectName = $("#DDLProjectName");
    let ctx = $("#Chart1");
    let Chart1 = new Chart(ctx, {
        type: "bar"
    });
    let ctx2 = $("#Chart2");
    let Chart2 = new Chart(ctx2, {
        type: "line"
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
            console.log(x,labels);            
            CreateDynamicChart(Chart1, x , labels);
        });

         
    });
});

function CreateDynamicChart(chartObj , dataset , labels) {
    
    console.log(chartObj);    

    let totalTickets = dataset.reduce((a, v) => {
        return a += v;
    });
    
    chartObj.data.labels = labels;    

    let chartData = {
        data: dataset,
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
            xAxes: [{
                display: true,
                gridLines: {
                    display: true
                },

            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }]
        }
    };
    chartObj.data.datasets[0]= (chartData);
    chartObj.update();
    console.log(chartObj);
}