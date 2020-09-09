$(function () {
    $.ajax({
        type: 'GET',
        url: '/AllTickets',
        success: (data) => {
            console.log(data);
            let Tickets = data.Tickets;
            let Count = data.Count;
            $("#CountHolder").text(Count);
            constructTable(Tickets, "#tblTickets");
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

