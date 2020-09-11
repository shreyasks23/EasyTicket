$(function () {
    let Tickets = [];
    let Count = 0;   

    $.ajax({
        type: 'GET',
        url: '/AllTickets',
        success: (res) => {
            Tickets = res.Tickets;
            Count = res.Count;            
        },
        async: false
    });   
    let TicketCount = GetTicketCount(Tickets);
        CreateChart(TicketCount); 

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
        let TicketCount = GetTicketCount(FilteredTickets);
        CreateChart(TicketCount);
    });
});

function GetTicketCount(ticketList) {

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

    let ChartDataArray = [SRCount,QACount,BGCount,INCount,STCount,IMCount,CRCount]

    return ChartDataArray;

}

function CreateChart(ChartData)
{
    let labels = ['Service Request', 'Question/Query', 'Bug', 'Incident', 'Story', 'Improvement', 'Change Request']
    let ctx = $('#myChart');
    let myChart = new Chart(ctx, {
        type: 'bar',
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
            events:['click'],
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
                    gridLines: {
                        display: true
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: (v,i,arr) => {
                            return Number(v);
                        },
                        stepSize:1
                    }
                }]
            }
        }
    });
}


