$(function () {    
    $("#BtnSubmit").on('click', function () {

        var Project = $("#DDLProjectName").val();
        var TicketID = $("#TBTicketID").val();
        var Subject = $("#TBSubject").val();
        var RecievedDate = $("#TBReceivedDate").val();
        var ResolvedDate = $("#TBResolvedDate").val();
        var Status = $("#DDLStatus").val();
        var TicketType = $("#DDLTicketType").val();
        var Priority = $("#DDLPriority").val();
        var Severity = $("#DDLSeverity").val();
        var HandledBy = $("#DDLHandledBy").val();
        var ResolutionTime = "00:00:00";

        let ticket = {
            Project: Project,
            TicketID: TicketID,
            TicketType: TicketType,
            Subject: Subject,
            RecievedDate: RecievedDate,
            ResolvedDate: ResolvedDate,
            Status: Status,
            Priority: Priority,
            Severity: Severity,
            HandledBy: HandledBy,
            ResolutionTime: ResolutionTime
        };
        // SubmitForm.validate();

        let status = "";
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/apis/CheckTicket',
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
        }
        else if (status == "0") {
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/apis/AddTicket',
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
        else{
            console.log(status)
        }
    });
});

