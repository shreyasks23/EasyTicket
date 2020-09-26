Tabulator.prototype.extendModule("edit", "editors", {
    uppercaseInput:function(cell, onRendered, success, cancel, editorParams){

        //create and style input
        var cellValue = cell.getValue().toUpperCase(),
        input = document.createElement("input");

        input.setAttribute("type", "text");

        input.style.padding = "4px";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";

        input.value = cellValue;

        onRendered(function () {
            input.focus();
            input.style.height = "100%";
        });

        function onChange(e) {
            if (input.value != cellValue) {
                success(input.value.toUpperCase());
            } else {
                cancel();
            }
        }

        //submit new value on blur or change
        input.addEventListener("change", onChange);
        input.addEventListener("blur", onChange);

        //submit new value on enter
        input.addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                success(input.value);
            }

            if (e.keyCode == 27) {
                cancel();
            }
        });

        return input;
    },
});
var rowMenu = [
   
    {
        label:"<i class='fas fa-check-square'></i> Select Row",
        action:function(e, row){
            row.select();
        }
    },
    {
        separator:true,
    },
    {
        label:"<i class='fas fa-trash'></i> Delete Row",
        action:function(e, row){
            row.delete();
        }
    },
]

//define row context menu
var headerMenu = [
    {
        label:"<i class='fas fa-eye-slash'></i> Hide Column",
        action:function(e, column){
            column.hide();
        }
    }
]