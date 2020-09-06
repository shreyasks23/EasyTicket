$(function () {
    $("#BtnSubmit").on('click', function () {
        var project = $("#DDLProjectName").val();
        var TicketID = $("#TBTicketID").val();
        var Summary = $("#TBSummary").val();
        var RecievedDate = $("#TBReceivedDate").val();
        var ResolvedDate = $("#TBResolvedDate").val();
        var Status = $("#DDLStatus").val();
        var Priority = $("#DDLPriority").val();
        var Severity = $("#DDLSeverity").val();
        var ResolutionTime = diff_minutes(ResolvedDate, RecievedDate);

        let ticket = {
            project: project
            , TicketID: TicketID
            , Summary: Summary
            , RecievedDate: RecievedDate
            , ResolvedDate: ResolvedDate
            , Status: Status
            , Priority: Priority
            , Severity: Severity
            , ResolutionTime: ResolutionTime
        };
        //console.log(ticket);
        let status = "";
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/CheckTicket',
            data: JSON.stringify({ 'TicketID': TicketID }),
            error: (err) => {
                alert(err);
            },
            success: (res) => {
                status = res;
                let response = res;
                console.log(response);
            },
            async:false
        })
        if (status == "1") {
            alert("ticket with same ID is already present");
        }
        else {
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/AddTicket',
                data: JSON.stringify(ticket),
                success: (data) => {
                    console.log(data);
                    if (data == "0") {
                        alert("Ticket added to the bottom");
                        window.location.href='/GetAllTickets';                    }
                },
                error: (err) => {
                    console.log(err);
                },
                async:false
            });
        } 
        
        
    });    
});

//#region helper methods
function diff_minutes(dt2, dt1) {

    let d1 = new Date(dt1);
    let d2 = new Date(dt2);

      
    var diff = d2.getTime() - d1.getTime();

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    return hh + ":" + mm + ":" + ss;
}
//#endregion

