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
                        title: "Ticket ID",
                        data: "TicketID"
                    },
                    {
                        title: "Ticket Type",
                        data: "TicketType"
                    },
                    {
                        title: "Subject",
                        data: "Subject",                        
                        sortable : false
                    },

                    {
                        title: "Recieved Date",
                        data: "RecievedDate",
                        searchable: false,
                        
                    },
                    {
                        title: "Resolved Date",
                        data: "ResolvedDate",
                        searchable: false,
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
                        title: "Resolution Time",
                        data: "ResolutionTime",
                        searchable: false,
                    },
                    {
                        title: "Handled By",
                        data: "HandledBy"
                    }
                ]
            });           
        },
        error: (err) => {
            console.log(err);
        }
    }); 
    

    $('#BtnExport').on('click', (event) => {
        ExportToExcel("tblTickets");
    });
});

