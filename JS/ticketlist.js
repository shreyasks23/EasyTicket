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
                ajax: '/AllTickets',
                data: Tickets,
                rowReorder: {
                    dataSrc: 'Subject',
                },

                columns: [

                    {
                        //title: "Project",
                        data: "Project",
                        edit: true

                    },
                    {
                        // title: "Ticket ID",
                        data: "TicketID"
                    },
                    {
                        //title: "Ticket Type",
                        data: "TicketType"
                    },
                    {
                        //title: "Subject",
                        data: "Subject",
                        sortable: false
                    },

                    {
                        // title: "Recieved Date",
                        data: "RecievedDate",
                        searchable: false,

                    },
                    {
                        //title: "Resolved Date",
                        data: "ResolvedDate",
                        searchable: false,
                    },
                    {
                        //title: "Status",
                        data: "Status"
                    },
                    {
                        //title: "Priority",
                        data: "Priority"
                    },
                    {
                        //title: "Severity",
                        data: "Severity"
                    },
                    {
                        // title: "Resolution Time",
                        data: "ResolutionTime",
                        searchable: false,
                    },
                    {
                        //title: "Handled By",
                        data: "HandledBy"
                    },
                    {
                        //title: "Handled By",
                        render: function (data, type, full, meta) {

                            return '<button id="editBtn" class="btn btn-wrang btn-flat edit" name="editBtn" type="button">Edit</button>' +
                                '&nbsp;&nbsp;<button id="deleteBtn" class="btn btn-danger btn-flat delete" name="deleteBtn" type="button" >Delete</button>';

                        }
                    }
                ]
            });
        },
        error: (err) => {
            console.log(err);
        }
    });
    $('#tblTickets').on('click', '.delete', function () {
        var table = $('#tblTickets').DataTable();
        table.row($(this).parents('tr')).remove().draw(false); //command for delete all that row
    });    
  


    $('#BtnExport').on('click', (event) => {
        ExportToExcel("tblTickets");
    });
});

