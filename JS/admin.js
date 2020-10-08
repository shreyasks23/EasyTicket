$(function () {

    BindProjectNames();        

    $("#ProjectForm").validate({
        rules: {
            ProjectName: "required"
        },
        messages: {
            ProjectName: "Invalid Project Name"
        },
        submitHandler: AddProjectData
    });


    // $("#BtnAddProject").on("click", (e) => {
    //     AddProjectData(TBProjectName, TAProjectDescription);
    // });   

});

function AddProjectData(form) {
    var dummy = form;
    //console.log(form);
    let TBProjectName = $("#TBProjectName");
    let TAProjectDescription = $("#TAProjectDescription");
    let Project = {
        Project: form[0].value,
        Description: form[1].value,
        CreatedDate: new Date()
    }
    $.ajax({
        type: "POST",
        url: "/apis/AddProject",
        contentType: "application/json",
        data: JSON.stringify(Project)
    }).done((res) => {
        if (res == "OK") {
            alert("Project added");
            TBProjectName.val("");
            TAProjectDescription.val("");
            BindProjectNames();
        };
    }).fail((err) => {
        alert(err);
    });
}

function BindProjectNames() {
    
    $.get("/apis/GetProjects").done((res) => {       
        let str = "";
        $.each(res, (i, v) => {
            str += "<option>" + v.Project + "</option>";
        });
        $("#DDLProjectList").append(str);
    });    
}

