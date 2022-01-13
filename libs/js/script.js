$("#employeesPage").on("click", function() {
    $(this).addClass("d");
    $("#departmentsPage").removeClass("d");
    $("#locationsPage").removeClass("d");
    $("#allEmployeesPage").removeClass("d-none");
    $("#allDepartmentsPage").addClass("d-none");
    $("#allLocationsPage").addClass("d-none");
    $(".navbar-collapse.show").collapse("hide");
    getEmployeesTable();
});

$("#departmentsPage").on("click", function() {
    $(this).addClass("d");
    $("#employeesPage").removeClass("d");
    $("#locationsPage").removeClass("d");
    $("#allDepartmentsPage").removeClass("d-none");
    $("#allEmployeesPage").addClass("d-none");
    $("#allLocationsPage").addClass("d-none");
    $(".navbar-collapse.show").collapse("hide");
});

$("#locationsPage").on("click", function() {
    $(this).addClass("d");
    $("#employeesPage").removeClass("d");
    $("#departmentsPage").removeClass("d");
    $("#allLocationsPage").removeClass("d-none");
    $("#allDepartmentsPage").addClass("d-none");
    $("#allEmployeesPage").addClass("d-none");
    $(".navbar-collapse.show").collapse("hide");
});

function getEmployeesTable() {
    $.ajax({
        url: "libs/php/getAll.php",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            if (result.status.name == "ok") {    
                const employees = result.data;
                let employeeTable = $("#employeeTbody");
                employeeTable.html("");
                employees.forEach(employee => {
                employeeTable.append($(`<tr role="button" data-id="${employee.id}">
                                            <td>${employee.firstName}</td>
                                            <td>${employee.lastName}</td>
                                            <td>${employee.department}</td>
                                            <td>${employee.location}</td>
                                        </tr>`));
                });   
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
}

getEmployeesTable();

function getDepartmentsTable() {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            if (result.status.name == "ok") {
                const departments = result.data;
                let departmentCards = $("#departmentCards");
                departmentCards.html("");
                let selectDepAddEmpModal = $("#selectDepAddEmpModal");
                selectDepAddEmpModal.html("");
                let selectDepEditEmpModal = $("#selectDepEditEmpModal");
                selectDepEditEmpModal.html("");
                departments.forEach(department => {
                    departmentCards.append($(`<div class="departmentDisplay">
                                                <div>
                                                    <img src="images/departments.png" class="card-img-top">
                                                </div>
                                                    <div class="card-body">
                                                        <h6 class="card-title department-name text-center mb-3"><strong>${department.name}</strong></h6>
                                                        <h6 class="card-title text-center mb-3"><strong>Location: ${department.location}</strong></h6>
                                                        <div class="text-center">
                                                            <button class="btn btn-outline-info editDep" type="button"
                                                                data-departmentid="${department.id}"
                                                                data-name="${department.name}"
                                                                data-location="${department.location}"
                                                                data-locationID="${department.locationID}">
                                                                Edit
                                                            </button>
                                                            <button class="btn btn-outline-danger deleteDep" type="button" data-departmentid="${department.id}">
                                                                Delete
                                                            </button>
                                                        </div>  
                                                    </div>    
                                            </div>`));
                    selectDepAddEmpModal.append($(`<option data-departmentid="${department.id}" value="${department.locationID}">${department.name}</option>`));
                    selectDepEditEmpModal.append($(`<option data-departmentid="${department.id}" value="${department.locationID}">${department.name}</option>`));
                });
                selectDepAddEmpModal.prepend($(`<option selected disabled value="0">Select Department</option>`));
                selectDepEditEmpModal.prepend($(`<option value="0"></option>`));
                $(".editDep").on("click", function() {
                    let id = $(this).attr("data-departmentid");
                    let name = $(this).attr("data-name");
                    let locationName = $(this).attr("data-location");
                    let locationID = $(this).attr("data-locationID");
                    
                    $("#id_ud").val(id);
                    $("#departmentName_ud").val(name);
                    $("#selectLocEditDepModal option:first").replaceWith(($(`<option selected disabled value="${locationID}">${locationName}</option>`))); 
                    $("#updateDepartmentModal").modal("show");   
                });
                $(".deleteDep").on("click", function() {
                    let id = $(this).attr("data-departmentid");
                    $("#id_dd").val(id);
                    $("#deleteDepartmentModal").modal("show");
                });   
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
}

getDepartmentsTable();

function getLocationsTable() {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'GET',
        dataType: 'json',
        success: function(result) {            
            if (result.status.name == "ok") {
                const locations = result.data;
                let locationCards = $("#locationsCards");
                locationCards.html("");
                let selectLocAddEmpModal = $("#selectLocAddEmpModal");
                selectLocAddEmpModal.html(""); 
                let selectLocAddDepModal = $("#selectLocAddDepModal");
                selectLocAddDepModal.html("");
                let selectLocEditEmpModal = $("#selectLocEditEmpModal");  
                selectLocEditEmpModal.html("");
                let selectLocEditDepModal = $("#selectLocEditDepModal"); 
                selectLocEditDepModal.html("");
                locations.forEach(location => {
                    locationCards.append($(`<div class="locationDisplay">
                                                        <div>
                                                            <img src="images/locations.png" class="card-img-top" alt="location-foto">
                                                        </div>
                                                        <div class="card-body">
                                                            <h5 class="card-title location-name text-center mb-3"><strong>${location.name}</strong></h5>
                                                            <div class="text-center">
                                                                <button class="btn btn-outline-danger deleteLoc" type="button" data-id="${location.id}">
                                                                    Delete
                                                                </button>
                                                            </div>  
                                                        </div>    
                                                    </div>`));
                    selectLocAddEmpModal.append($(`<option value="${location.id}">${location.name}</option>`));
                    selectLocAddDepModal.append($(`<option value="${location.id}">${location.name}</option>`));     
                    selectLocEditEmpModal.append($(`<option value="${location.id}">${location.name}</option>`));
                    selectLocEditDepModal.append($(`<option value="${location.id}">${location.name}</option>`));                      
                });
                selectLocAddEmpModal.prepend($(`<option selected disabled value="0"></option>`));
                selectLocAddDepModal.prepend($(`<option selected disabled value="0">Select Location</option>`));
                $(".deleteLoc").on("click", function() {
                    let id = $(this).attr("data-id");
                    $("#id_dl").val(id);
                    $("#deleteLocationModal").modal("show");
                });  
                selectLocEditEmpModal.prepend($(`<option value="0"></option>`));
                selectLocEditDepModal.prepend($(`<option value="0"></option>`));
            }          
                
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
}

getLocationsTable();

$(".table").on("click", "tr[role='button']", function() {
        let id = $(this).attr("data-id");
		
    $.ajax({
        url: "libs/php/getPersonnelByID.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(result) {                
            if (result.status.name == "ok") {
                let employee = result.data[0];          
                let edContent = $("#edContent");
                edContent.html("");
                 edContent.html($(`<div class="modal-header">
                                        <h5 class="modal-title" id="displayEmployeeModalLabel">Employee Details</h5>                                        
                                        <button type="button" class="btn-close btn-close-white" title="Back" data-bs-dismiss="modal" aria-label="Close">
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container-details container justify-content-center" >
                                            <div class="employee-details-card card p-2">

                                                <div class="employee-profile-photo text-center">
                                                    <img src="images/profile.png" class="card-img-top" alt="employee-foto">
                                                </div>

                                                <div class="d-flex justify-content-center mt-3">
                                                    <table class="ed-table table justify-content-between table-responsive">
                                                        <tbody>
                                                            <tr>
                                                                <td class="fw-bold">First Name:</td>
                                                                <td class="text-end">${employee.firstName}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="fw-bold">Last Name:</td>
                                                                <td class="text-end">${employee.lastName}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="fw-bold">Email</td>
                                                                <td class="text-end">${employee.email}</td>    
                                                            </tr>
                                                            <tr>
                                                                <td class="fw-bold">Department:</td>
                                                                <td class="text-end">${employee.department}</td>    
                                                            </tr>
                                                            <tr>
                                                                <td class="fw-bold">Job Title:</td>
                                                                <td class="text-end">${employee.jobTitle}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="fw-bold">Location:</td>
                                                                <td class="text-end">${employee.location}</td>    
                                                            </tr>
                                                        </tbody>
                                                    </table>   
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer justify-content-between ">
                                        <button class="btn btn-outline-info editEmployee ml-5" type="button"
                                                data-id="${employee.id}"
                                                data-firstName="${employee.firstName}" 
                                                data-lastName="${employee.lastName}"
                                                data-jobTitle="${employee.jobTitle}" 
                                                data-email="${employee.email}" 
                                                data-department="${employee.department}"
                                                data-departmentid="${employee.departmentID}"
                                                data-location="${employee.location}"
                                                data-locationID="${employee.locationID}">
                                            Edit
                                        </button>
                                        <button class="btn btn-outline-danger deleteEmployee" type="button" data-id="${employee.id}"> Delete </button>
                                    </div>`));   

                $(".editEmployee").on("click", function() {
                    let id = $(this).attr("data-id");
                    let firstName=$(this).attr("data-firstName");
                    let lastName=$(this).attr("data-lastName");
                    let jobTitle=$(this).attr("data-jobTitle");
                    let email=$(this).attr("data-email");
                    let department=$(this).attr("data-department");
                    let departmentID=$(this).attr("data-departmentid");
                    let location=$(this).attr("data-location");
                    let locationID=$(this).attr("data-locationID");
                 
                    $("#id_u").val(id);
                    $("#firstName_u").val(firstName);
                    $("#lastName_u").val(lastName);
                    $("#jobTitle_u").val(jobTitle);
                    $("#email_u").val(email);
                   
                    $("#selectDepEditEmpModal option:first").replaceWith($(`<option selected disabled data-departmentid="${departmentID}" value="${locationID}">${department}</option>`));
                    $("#selectLocEditEmpModal option:first").replaceWith(($(`<option selected value="${locationID}">${location}</option>`))); 
                    
                    $("#updateEmployeeModal").modal("show");
                    $("#displayEmployeeModal").modal("hide");
                });
                $(".deleteEmployee").on("click", function() {
                    let id = $(this).attr("data-id");
                    $("#id_d").val(id);
                    $("#deleteEmployeeModal").modal("show");
                });    
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
    $("#displayEmployeeModal").modal("show");  
});

$("#insertEmployee").click(function() {
    $("#insertEmployeeModal").modal("show");
});

$("#selectDepAddEmpModal").change(function() {
    if ($("#selectLocAddEmpModal option[value='" + $(this).val() + "']").length) {
        $("#selectLocAddEmpModal option[value='" + $(this).val() + "']").first().prop("selected", true);
    }
    else {
      $("#selectLocAddEmpModal").val("");
    }
});

$("#employeeConfirmAddBtn").click(function() {
    
    $.ajax({
        url: "libs/php/insertPersonnel.php",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName: $("#firstNameInput").val(),
            lastName: $("#lastNameInput").val(),
            jobTitle: $("#jobTitleInput").val(),
            email: $("#emailInput").val().toLowerCase(),
            departmentID: $("#selectDepAddEmpModal :selected").data("departmentid")
        },
        success: function(result) {            
            if (result.status.name == "ok") {
                $("#insertEmployeeModal").modal("hide");
                getEmployeesTable();
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
});

$("#selectDepEditEmpModal").change(function() {    
    if ($("#selectLocEditEmpModal option[value='" + $(this).val() + "']").length) {
        $("#selectLocEditEmpModal option[value='" + $(this).val() + "']").first().prop("selected", true);
    }
    else {
      $("#selectLocEditEmpModal").val("");
    }
});

$("#updateEmployeeBtn").on("click", function() {
    let id = $("#id_u").val();
    let departmentID = $("#selectDepEditEmpModal :selected").data("departmentid");
   
    $.ajax({
        url: "libs/php/updatePersonnel.php",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName: $("#firstName_u").val(),
            lastName: $("#lastName_u").val(),
            jobTitle: $("#jobTitle_u").val(),
            email: $("#email_u").val(),
            departmentID: departmentID,
            id: id
        },
        success: function(result) {
            if (result.status.name == "ok") {
                $("#updateEmployeeModal").modal("hide");
                $("#displayEmployeeModal").modal("hide");   
                getEmployeesTable();
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
    
});

$("#deleteEmployeeBtn").on("click", function() {
    let id = $("#id_d").val();

    $.ajax({
        url: "libs/php/deletePersonnelByID.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            id: id
        },
        success: function(result) {            
            if (result.status.name == "ok") {
                $('#deleteEmployeeModal').modal("hide");
                $("#displayEmployeeModal").modal("hide");
                getEmployeesTable();
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
});

$("#insertDepartment").click(function() {
    $("#addDepartmentModal").modal("show");
});

$("#addDepartmentBtn").on("click", function() {
    let locationID = $("#selectLocAddDepModal :selected").val();

    $.ajax({
        url: "libs/php/insertDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $("#departmentName_addd").val(),
            locationID: locationID
        },
        success: function(result) {
            if (result.status.name == "ok") {
                $("#addDepartmentModal").modal("hide");
                getDepartmentsTable(); 
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
});

$("#updateDepartmentBtn").on("click", function() {
    let id = $("#id_ud").val();
    let locationID = $("#selectLocEditDepModal :selected").val();
   
    $.ajax({
        url: "libs/php/updateDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $("#departmentName_ud").val(),
            locationID: locationID,
            id: id
        },
        success: function(result) {
            if (result.status.name == "ok") {
                $("#updateDepartmentModal").modal("hide");
                getDepartmentsTable();
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
    
});


$("#deleteDepartmentBtn").on("click", function() {
    let id = $("#id_dd").val();
    $.ajax({
        url: "libs/php/deleteDepartmentByID.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            id: id
        },
        success: function(result) {            
            if (result.status.name == "ok") {
                $("#deleteDepartmentModal").modal("hide");
                getDepartmentsTable();
            }
            if (result.status.name == "forbidden") {
                $("#deleteDepartmentModal").modal("hide");
                $("#forbiddenDepartmentModal").modal("show");
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
});

$("#insertLocation").click(function() {
    $("#addLocationModal").modal("show");
});

$("#addLocationBtn").on("click", function() {    
    $.ajax({
        url: "libs/php/insertLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $("#locationName_addl").val(),
        },
        success: function(result) {            
            if (result.status.name == "ok") {
                $("#addLocationModal").modal("hide");  
                getLocationsTable();  
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
})

$("#deleteLocationBtn").on("click", function() {
    let id = $("#id_dl").val();

    $.ajax({
        url: "libs/php/deleteLocationByID.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            id: id
        },
        success: function(result) {            
            if (result.status.name == "ok") {
                $("#deleteLocationModal").modal("hide");
                getLocationsTable();
            }
            if (result.status.name == "forbidden") {
                $("#deleteLocationModal").modal("hide");
                $("#forbiddenLocationModal").modal("show");
            }
        },
        error: function(err) {
            alert("Error: " + err);
        }
    });
});

$("#searchEmployee").on("keyup", function() {
    let rows = $("#employeeTbody tr");
    let val = $.trim($(this).val()).replace(/ +/g, " ").toLowerCase();

    rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, " ").toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});

function inputSearchDL(searchbar, names) {
    searchbar.on("keyup", function(e) {
        const input = e.target.value;
        const searchNames = document.querySelectorAll(names);
    
        searchNames.forEach(name => {
            if (name.innerText.toLowerCase().includes(input.toLowerCase())) {
                name.parentElement.parentElement.style.display = "block";
            } else {
                name.parentElement.parentElement.style.display = "none";
            }
        });
    });
}
inputSearchDL($("#search-input-department"), ".department-name");
inputSearchDL($("#search-input-location"), ".location-name");

