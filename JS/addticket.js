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


        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/apis/CheckTicket',
            data: JSON.stringify({
                'TicketID': TicketID
            })
        }).done((res) => {
            if (res == "1") {
                alert("ticket with same ID is already present");
            }
            else if (res == "0") {
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: '/apis/AddTicket',
                    data: JSON.stringify(ticket)
                }).done((data, status) => {
                    if (status == 'success') {
                        console.log(data);
                        alert("Ticket added");
                        window.location.replace('/Index');
                    }
                }).fail((err) => {
                    console.log(err);
                })
            }
            else {
                console.log(status)
            }
        }).fail((err) => {
            alert(err);
        });
    });
});

