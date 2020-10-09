$(function () {

    BindProjectNames();    
    BindExecutiveNames();

    $("#ProjectForm").validate({
        rules: {
            ProjectName: "required"
        },
        messages: {
            ProjectName: "Invalid Project Name"
        },
        submitHandler: AddProjectData
    });

    $("#MemberForm").validate({
        rules: {
            ExecutiveName: "required"
        },
        messages: {
            ExecutiveName: "Invalid Executive Name"
        },
        submitHandler: AddExecutiveData
    });
      

});

function AddExecutiveData(form) {
    console.log(form);

    let TBExecutiveName = $("#TBExecutiveName");
    let TAExecutiveDescription = $("#TAExecutiveDescription");

    let Executive = {
        Name: TBExecutiveName.val(),
        Description: TAExecutiveDescription.val(),
        CreatedDate : new Date()
    }

    $.ajax({
        type: "POST",
        url: "/apis/AddExecutive",
        contentType:"application/json",
        data: JSON.stringify(Executive)
    }).done((res) => {
        if (res == "OK") {
            alert("Member added");
            TBExecutiveName.val("");
            TAExecutiveDescription.val("");
            BindExecutiveNames();
        }
    }).catch((err) => { console.log(err) });
}

function AddProjectData(form) {
    
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

    $("#DDLProjectList option").remove();
    
    $.get("/apis/GetProjects").done((res) => {       
        let str = "";
        $.each(res, (i, v) => {
            str += "<option>" + v.Project + "</option>";
        });
        $("#DDLProjectList").append(str);
    });    
}

function BindExecutiveNames() {

    $("#DDLExecutiveList option").remove();

    $.get("/apis/GetExecutives").done((res) => {
        let str = "";
        $.each(res, (i, v) => {
            str += "<option>" + v.Name + "</option>";
        });
        $("#DDLExecutiveList").append(str);
    }).catch((err) => { console.log(err) });
}

