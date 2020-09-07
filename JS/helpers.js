function constructTable(list, selector) {

    // Getting the all column names 
    $(selector).empty();
    var cols = Headers(list, selector);
    var tbody = $('<tbody/>');

    // Traversing the JSON data 
    for (var i = 0; i < list.length; i++) {
        var row = $('<tr/>');
        for (var colIndex = 0; colIndex < cols.length; colIndex++) {
            var val = list[i][cols[colIndex]];
            // If there is any key, which is matching 
            // with the column name 
            if (val == null) val = "";
            row.append($('<td/>').html(val));
        }
        // Adding each row to the table     

        tbody.append(row);
    }
    $(selector).append(tbody);
}

function Headers(list, selector) {
    var columns = [];
    var header = $('<tr/>');

    for (var i = 0; i < list.length; i++) {
        var row = list[i];

        for (var k in row) {
            if ($.inArray(k, columns) == -1) {
                columns.push(k);

                // Creating the header 
                header.append($('<th/>').html(k));
            }
        }
    }
    var thead = $('<thead/>');
    thead.append(header);
    $(selector).append(thead);    
    return columns;
}

function ExportToExcel(mytblId){
    var htmltable= document.getElementById(mytblId);
    var html = htmltable.outerHTML;    
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
 }