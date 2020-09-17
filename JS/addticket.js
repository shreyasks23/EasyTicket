$(function () {
    let SubmitForm = $('#SubmitForm');
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
        var ResolutionTime = diff_minutes(ResolvedDate, RecievedDate);

        let ticket = {
            Project: Project,
            TicketID: TicketID,
            TicketType : TicketType,
            Subject: Subject,
            RecievedDate: RecievedDate,
            ResolvedDate: ResolvedDate,
            Status: Status,
            Priority: Priority,
            Severity: Severity,
            HandledBy : HandledBy,
            ResolutionTime: ResolutionTime
        };
        // SubmitForm.validate();
        if (SubmitForm.valid()) {
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
        }

    });
});

