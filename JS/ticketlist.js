$(function () {
    $.ajax({
        type: 'GET',
        url: '/AllTickets',
        success: (data) => {
            console.log(data);
            let Tickets = data.Tickets;
            let Count = data.Count;
            console.log(Tickets);
            $("#CountHolder").text(Count);
            $('#tblTickets').DataTable({
                data: Tickets,

                columns: [
                    {
                        title: "Project",
                        data: "Project",

                    },
                    {
                        title: "TicketID",
                        data: "TicketID"
                    },
                    {
                        title: "Summary",
                        data: "Summary"
                    },

                    {
                        title: "RecievedDate",
                        data: "RecievedDate",
                        'searchable': false,
                        
                    },
                    {
                        title: "ResolvedDate",
                        data: "ResolvedDate",
                        'searchable': false,
                    },
                    {
                        title: "Status",
                        data: "Status"
                    },
                    {
                        title: "Priority",
                        data: "Priority"
                    },
                    {
                        title: "Severity",
                        data: "Severity"
                    },
                    {
                        title: "ResolutionTime",
                        data: "ResolutionTime"
                    }
                ]
            });
            //constructTable(Tickets, "#tblTickets");
        },
        error: (err) => {
            console.log(err);
        }
    });
    $('#BtnExport').on('click', (event) => {
        ExportToExcel("tblTickets");
    });



});

$('#TBSearchBox').on('keyup', (event) => {
    let SearchIndex = $('input[name="RBSearch"]:checked').val();
    let SearchBoxID = event.target.id;
    Search(SearchBoxID, 'tblTickets', SearchIndex);
});

