$(function () {
    let table;
    $.ajax({
        type: 'GET',
        url: '/apis/AllTickets',
        success: (data) => {            
            let Tickets = data;
            let Count = data.length;
            
            $("#CountHolder").text(Count);

            table = new Tabulator("#tblTickets", {
                tooltipsHeader: true,
                tooltips: true,
                paginationSizeSelector:true,
                layout: "fitDataFill",
                cellEdited: function (cell) {
                    let data = {};
                    data = cell.getRow().getData();
                    $.ajax({
                        url: '/apis/UpdateTicket',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        success: (data, status) => {
                            if (status == 'success') {
                                alert(data);
                            }
                            else {
                                alert(data);
                            }
                        },
                        error: (err) => {
                            console.log(err);
                        }
                    });                    
                },

                rowContextMenu: rowMenu,
                data: Tickets,
                pagination: "local",
                paginationSize: 10,
                movableColumns: true,
                columns: [

                    { title: "Project", field: "Project", headerMenu: headerMenu },
                    { title: "Ticket ID", field: "TicketID" },
                    { title: "Ticket Type", field: "TicketType" },
                    { title: "Subject", field: "Subject", headerMenu: headerMenu, editor: true },
                    { title: "Recieved Date", field: "RecievedDate", headerMenu: headerMenu, editor: true },
                    { title: "Resolved Date", field: "ResolvedDate", editor: 'input', headerMenu: headerMenu },
                    {
                        title: "Status", field: "Status", editor: "select", editorParams: {
                            listItemFormatter: function (value, title) {
                                return title;
                            },
                            values: true, //create list of values from all values contained in this column
                            sortValuesList: "asc", //if creating a list of values from values:true then choose how it should be sorted

                        }
                    },
                    {
                        title: "Priority", field: "Priority", editor: "select", editorParams: {
                            listItemFormatter: function (value, title) { 
                                return title;
                            },
                            values: true, //create list of values from all values contained in this column
                            sortValuesList: "asc", //if creating a list of values from values:true then choose how it should be sorted

                        }
                    },
                    { title: "Resolution Time", field: "ResolutionTime", headerMenu: headerMenu, mutator: customMutator },
                    { title: "Handled By", field: "HandledBy", editor: 'input' },
                    { title: "Summary", field: "Summary", editor: 'input',headerMenu: headerMenu }
                ],
            });
        },
        error: (err) => {
            console.log(err);
        }
    });
    $('#BtnExport').on('click', (event) => {
        table.download("xlsx", "ticketlist.xlsx", { sheetName: "tickets" });
    });
    $("#select-row").on('click', () => {
        var selectedRows = table.getSelectedRows();
        table.deleteRow(selectedRows);
    });
    $("#TBSearch").on("keyup", () => {        
        var filters = [];       
        var SelectedColumns = [];
        SelectedColumns.push(table.getColumn("Project"));
        SelectedColumns.push(table.getColumn("TicketID"));
        SelectedColumns.push(table.getColumn("TicketType"));
        SelectedColumns.push(table.getColumn("Subject"));
        SelectedColumns.push(table.getColumn("HandledBy"));        

        var search = $("#TBSearch").val();

        SelectedColumns.forEach(function (column) {
            filters.push({
                field: column.getField(),
                type: "like",
                value: search,
            });
            console.log(filters);
        });

        table.setFilter([filters]);
    })
});

var customMutator = (value, data, type, params, component) => {
    //value - original value of the cell
    //data - the data for the row
    //type - the type of mutation occurring  (data|edit)
    //params - the mutatorParams object from the column definition
    //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column

    value = diff_minutes(data.ResolvedDate, data.RecievedDate);
    if (value == 'NaN:NaN:NaN' || value == "")
        value = '00:00:00'

    //console.log(value);
    return value; //return the new value for the cell data.
}