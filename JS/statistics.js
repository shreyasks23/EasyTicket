$(function () {
    let Tickets = [];         
    let ProjectNames = [];
    let ExecutiveNames = []; 


    BindProjectsToDDL($("#DDLProjectName"));
    BindExecutiveNamesToDDL($("#DDLExecutiveName"));       


    $.get("/apis/GetExecutives").then((res) => {
        Executives = res;
        res.forEach((v, i) => {
            ExecutiveNames.push(v.Name);
        }); 
    });

    $.get("/apis/GetProjects").then((res) => {
        Projects = res;
        res.forEach((v, i) => {            
            ProjectNames.push(v.Project);
        });
    });  

    $.get('/apis/GetSelectedTicketDetails').then((res) => {
        Tickets = res;
        let ChartObj = GetTicketCountTypeWise(res);
        CreatePieChart("pie", ChartObj.ChartData, ChartObj.labels, 'myChart');
         CreateRadarChart(res);
    });    

    $("#DDLProjectName").on('change', () => {    
        
        let ProjectName = $("#DDLProjectName").val();
        let FilteredTickets = [];

        
        FilteredTickets = Tickets.filter((val) => {
            return val.Project == ProjectName;
        });
        
        let ChartObj = GetTicketCountTypeWise(FilteredTickets);
        CreatePieChart("pie", ChartObj.ChartData, ChartObj.labels, 'myChart');
    });   

    $("#DDLExecutiveName").on('change', () => {
        let ExecutiveName = $("#DDLExecutiveName").val();
        let FilteredTicketsExecutiveWise = [];
        FilteredTicketsExecutiveWise = Tickets.filter((val) => {
            return val.HandledBy == ExecutiveName;
        });       

        let ChartObj = GetTicketCountTypeWise(FilteredTicketsExecutiveWise);
        CreateChart("bar", ChartObj.ChartData, ChartObj.labels, 'myChart2');        
    });

});

function CreateChart(type, ChartData, labels, elementID) {
    let ElementID = '#' + elementID;
    let ctx = $(ElementID);
    let myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'no. of tickets',
                data: ChartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            events: ['click'],
            title: {
                display: true,
                text: 'All tickets'
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'green'
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    // gridLines: {
                    //     display: false
                    // }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        // callback: (v,i,arr) => {
                        //     return Number(v);
                        // },
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

function CreatePieChart(type, ChartData, labels, elementID) {
    let ElementID = '#' + elementID;
    let ctx = $(ElementID);
    let myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'no. of tickets',
                data: ChartData,
                backgroundColor: [
                    'rgba(256, 100, 133, 0.3)',
                    'rgba(54, 163, 236, 0.3)',
                    'rgba(255, 207, 87, 0.3)',
                    'rgba(75, 193, 193, 0.3)',
                    'rgba(153, 103, 256, 0.3)',
                    'rgba(255, 160, 65, 0.3)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            events: ['click'],
            title: {
                display: true,
                text: 'All tickets'
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'black'
                }
            },
            scales: {
                xAxes: [{
                    display: false,
                    // gridLines: {
                    //     display: false
                    // }
                }],
                yAxes: [{
                    display: false,
                    gridLines: {
                        display: false
                    },
                    // ticks: {
                    //     beginAtZero: true,
                    //     // callback: (v,i,arr) => {
                    //     //     return Number(v);
                    //     // },
                    //     stepSize:1
                    // }
                }]
            }
        }
    });
}

//needs changing
function CreateRadarChart(ChartData, elementID = 'MyChart', type = 'radar') {    
    
    
    $.get("/apis//GetTicketDetails?Project=GMAC").then((res) => {
        console.log(res);
        res.forEach((v) => {
            ///console.log(v);
        });
    });

    let GMAC, OUPI, CLP, IMU;

    GMAC = ChartData.filter((val) => {
        return val.Project == 'GMAC';
    });

    CLP = ChartData.filter((val) => {
        return val.Project == 'CLP';
    });
    OUPI = ChartData.filter((val) => {
        return val.Project == 'OUPI';
    });
    IMU = ChartData.filter((val) => {
        return val.Project == 'IMU';
    });

    GMACCountObj = GetTicketCountTypeWise(GMAC);
    OUPICountObj = GetTicketCountTypeWise(OUPI);
    IMUCountObj = GetTicketCountTypeWise(IMU);
    CLPCountObj = GetTicketCountTypeWise(CLP);
    

    let ElementID = '#' + elementID;
    let ctx = $(ElementID);
    let myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ['Service Request', 'Question/Query', 'Bug', 'Incident', 'Story', 'Improvement', 'Change Request'],
            datasets: [{
                label: "GMAC",
                backgroundColor: 'rgba(255, 99, 71, 0.3)',
                borderColor: 'rgba(255, 99, 71, 1)',
                pointBackgroundColor: 'rgba(255, 99, 71, 0.7)',
                data: GMACCountObj.ChartData,
                notes: ["This is from GMAC"]
            }, {
                label: "OUPI",
                backgroundColor: 'rgba(219, 124, 12, 0.3)',
                borderColor: 'rgba(219, 124, 12, 0.7)',
                pointBackgroundColor: 'rgba(219, 124, 12, 1)',
                data: OUPICountObj.ChartData,
                notes: ["This is from OUPI"]
            }, {
                label: "CLP",
                backgroundColor: 'rgba(90, 124, 12, 0.3)',
                borderColor: 'rgba(90, 124, 12,0.7)',
                pointBackgroundColor: 'rgba(90, 124, 12, 1)',
                data: CLPCountObj.ChartData,
                notes: ["Data from CLP"]

            },
            {
                label: "IMU",
                backgroundColor: 'rgba(90, 57, 32, 0.3)',
                borderColor: 'rgba(90, 57, 32, 0.7)',
                pointBackgroundColor: 'rgba(90, 57, 32, 1)',
                data: IMUCountObj.ChartData,
                notes: ["Data from IMU"]

            }]
        },
        options: {
            title: {
                display: true,
                text: 'All tickets across projects'
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'black'
                }
            }
        }
    });
}

//needs changing
function GetTicketCountExecutiveWise(ticketList) {
    let shr = 0, sam = 0, ant = 0, ron = 0, dan = 0, ajay = 0, sht = 0;
    ticketList.forEach((v) => {
        if (v.HandledBy == "Shreyas") {
            shr++;
        }
        else if (v.HandledBy == "Samatha") {
            sam++;
        }
        else if (v.HandledBy == "Antony") {
            ant++;
        }
        else if (v.HandledBy == "Sheethal") {
            sht++;
        }
        else if (v.HandledBy == "Dhanush") {
            dan++;
        }
        else if (v.HandledBy == "Rony") {
            ron++;
        }
        else if (v.HandledBy == "Ajay") {
            ajay++;
        }
    })
    let ChartObj = {
        'ChartData': [shr, sam, ant, ron, dan, ajay, sht],
        'Labels': ['Service Request', 'Question/Query', 'Bug', 'Incident', 'Story', 'Improvement', 'Change Request']
        //'Labels': ["shreyas", "Samatha", "Antony", "Rony", "Dhanush", "Ajay", "Sheethal"]
    }
    return ChartObj;
    //console.log(ticketCount);
}

//needs changing
function GetTicketCountTypeWise(ticketList) {

    let SRCount = 0, BGCount = 0, QACount = 0, INCount = 0,
        IMCount = 0, CRCount = 0, STCount = 0;

    ticketList.forEach((val) => {

        if (val.TicketType == 'Question/Query') {
            QACount++;
        }
        else if (val.TicketType == 'Service Request') {
            SRCount++;
        }
        else if (val.TicketType == 'Bug') {
            BGCount++;
        }
        else if (val.TicketType == 'Incident') {
            INCount++;
        }
        else if (val.TicketType == 'Story') {
            STCount++;
        }
        else if (val.TicketType == 'Improvement') {
            IMCount++;
        }
        else if (val.TicketType == 'Change Request') {
            CRCount++;
        }
    });
    let ChartObj = {
        'ChartData': [SRCount, QACount, BGCount, INCount, STCount, IMCount, CRCount],
        'labels': ['Service Request', 'Question/Query', 'Bug', 'Incident', 'Story', 'Improvement', 'Change Request']
    }

    return ChartObj;

}


