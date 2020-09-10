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
            Project: project,
            TicketID: TicketID,
            Summary: Summary,
            RecievedDate: RecievedDate,
            ResolvedDate: ResolvedDate,
            Status: Status,
            Priority: Priority,
            Severity: Severity,
            ResolutionTime: ResolutionTime
        };

        let status = "";
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/CheckTicket',
            data: JSON.stringify({
                'TicketID': TicketID
            }),
            error: (err) => {
                alert(err);
            },
            success: (res) => {
                status = res;
                let response = res;
                console.log(response);
            },
            async: false
        })
        if (status == "1") {
            alert("ticket with same ID is already present");
        } else {
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/AddTicket',
                data: JSON.stringify(ticket),
                success: (data, status) => {
                    if (status == 'success') {
                        console.log(data);
                        alert("Ticket added");
                        window.location.href = '/Index';
                    }
                },
                error: (err) => {
                    console.log(err);
                }
              
            });
        }


    });
});

