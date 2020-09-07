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

function Search(inputElement , tableName , SelectedIndex) {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputElement);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableName);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[SelectedIndex];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }