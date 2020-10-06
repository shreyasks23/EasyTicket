$(function () {
    $('#SubmitForm').validate({
        rules: {
            ProjectName: "required",
            TicketType : "required",
            TicketID: "required",
            Subject: "required",
            ReceivedDate: "required"
        },
        messages: {
            ProjectName: "Invalid project name",
            TicketType : "Invalid Tracker",
            TicketID: "Invalid Ticket ID",
            Subject: "Invalid Subject",
            ReceivedDate: "Invalid Received date"
        },
        submitHandler: postFormData
    })
});

function postFormData() {   
    

    var TicketID = $("#TBTicketID").val();

    let ticket = {
        Project: $("#DDLProjectName").val(),
        TicketID: TicketID,
        Subject: $("#TBSubject").val(),
        RecievedDate: $("#TBReceivedDate").val(),
        ResolvedDate: $("#TBResolvedDate").val(),
        Status: $("#DDLStatus").val(),
        TicketType: $("#DDLTicketType").val(),
        Priority: $("#DDLPriority").val(),
        Severity: $("#DDLSeverity").val(),
        HandledBy: $("#DDLHandledBy").val(),
        ResolutionTime: "00:00:00"
    };

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
}
