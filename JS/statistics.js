$(function () {
    let Tickets = [];
    let Count = 0;

    $.ajax({
        type: 'GET',
        url: '/apis/AllTickets',
        success: (res) => {
            console.log(res);
            Tickets = res;
            //Count = res.Count;
        },
        async: false
    });
    let ChartObj = GetTicketCountTypeWise(Tickets);
    //console.log(ChartObj);
    CreatePieChart("pie", ChartObj.ChartData, ChartObj.labels, 'myChart');
    CreateRadarChart(Tickets);

    $("#DDLProjectName").on('change', () => {

        let ProjectName = $("#DDLProjectName").val();
        let FilteredTickets = [];

        if (ProjectName == 'All') {
            FilteredTickets = Tickets;
        }
        else if (ProjectName == 'GMAC') {
            FilteredTickets = Tickets.filter((val) => {
                return val.Project == 'GMAC';
            });
        }
        else if (ProjectName == 'OUPI') {
            FilteredTickets = Tickets.filter((val) => {
                return val.Project == 'OUPI';
            });
        }
        else if (ProjectName == 'IMU') {
            FilteredTickets = Tickets.filter((val) => {
                return val.Project == 'IMU';
            });
        }
        else if (ProjectName == 'CLP') {
            FilteredTickets = Tickets.filter((val) => {
                return val.Project == 'CLP';
            });
        }
        let ChartObj = GetTicketCountTypeWise(FilteredTickets);
        CreatePieChart("pie", ChartObj.ChartData, ChartObj.labels, 'myChart');
    });

    //GetTicketCountExecutiveWise(Tickets);

    $("#DDLExecutiveName").on('change', () => {
        let ExecutiveName = $("#DDLExecutiveName").val();
        let FilteredTicketsExecutiveWise = [];

        if (ExecutiveName == "Shreyas") {
            FilteredTicketsExecutiveWise = Tickets.filter((val) => {
                return val.HandledBy == "Shreyas";
            });
        }
        else if (ExecutiveName == "Antony") {
            FilteredTicketsExecutiveWise = Tickets.filter((val) => {
                return val.HandledBy == "Antony";
            });
        }
        else if (ExecutiveName == "Samatha") {
            FilteredTicketsExecutiveWise = Tickets.filter((val) => {
                return val.HandledBy == "Samatha";
            });
        }
        else if (ExecutiveName == "Sheethal") {
            FilteredTicketsExecutiveWise = Tickets.filter((val) => {
                return val.HandledBy == "Sheethal";
            });
        }
        else if (ExecutiveName == "Ajay") {
            FilteredTicketsExecutiveWise = Tickets.filter((val) => {
                return val.HandledBy == "Ajay";
            });
        }
        else if (ExecutiveName == "Dhanush") {
            FilteredTicketsExecutiveWise = Tickets.filter((val) => {
                return val.HandledBy == "Dhanush";
            });
        }
        else if (ExecutiveName == "Rony") {
            FilteredTicketsExecutiveWise = Tickets.filter((val) => {
                return val.HandledBy == "Rony";
            });
        }

        let ChartObj = GetTicketCountTypeWise(FilteredTicketsExecutiveWise);
        CreateChart("bar", ChartObj.ChartData, ChartObj.labels, 'myChart2');
        //console.log(ChartObj);
        // let ChartObj = GetTicketCountExecutiveWise(FilteredTicketsExecutiveWise);
        // //console.log(ChartObj);
        // CreateChart("bar", ChartObj.ChartData, ChartObj.Labels , 'myChart2');
    });

});

function GetTicketCountTypeWise(ticketList) {

    let SRCount = 0, BGCount = 0, QACount = 0, INCount = 0,
        IMCount = 0, CRCount = 0, STCount = 0;

    ticketList.forEach((val, index) => {

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



function CreateRadarChart(ChartData, elementID = 'MyChart', type = 'radar') {


    var label1 = "label1";
    var label2 = "label2";
    var label3 = "label3";

    let GMAC, OUPI, CLP, IMU, GMACCount, OUPICount, CLPCount, IMUCount;

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


    //console.log(GMAC, OUPI, CLP, IMU);

    let ElementID = '#' + elementID;
    let ctx = $(ElementID);
    let myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ['Service Request', 'Question/Query', 'Bug', 'Incident', 'Story', 'Improvement', 'Change Request'],
            datasets: [{
                label: "GMAC",
                backgroundColor: 'rgba(255, 99, 71, 0.6)',
                borderColor: 'rgba(255, 99, 71, 0.6)',
                pointBackgroundColor: 'rgba(255, 99, 71, 1)',
                data: GMACCountObj.ChartData,
                notes: ["This is from GMAC"]
            }, {
                label: "OUPI",
                backgroundColor: 'rgba(219, 124, 12, 0.4)',
                borderColor: 'rgba(219, 124, 12, 0.4)',
                pointBackgroundColor: 'rgba(219, 124, 12, 1)',
                data: OUPICountObj.ChartData,
                notes: ["This is from OUPI"]
            }, {
                label: "CLP",
                backgroundColor: 'rgba(90, 124, 12, 0.5)',
                borderColor: 'rgba(90, 124, 12, 0.5)',
                pointBackgroundColor: 'rgba(90, 124, 12, 1)',
                data: CLPCountObj.ChartData,
                notes: ["Data from CLP"]

            },
            {
                label: "IMU",

                backgroundColor: 'rgba(90, 57, 32, 0.5)',
                borderColor: 'rgba(90, 57, 32, 0.5)',
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

