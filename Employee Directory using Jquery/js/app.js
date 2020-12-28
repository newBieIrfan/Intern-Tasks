const modal = $("#modal-form");
const addEmployeeBtn = $("#add-employee-btn");
const closeBtn = $("#close");
const addForm = $("#employee-add-form");
const editForm = $("#employee-edit-form");
const employeeDetailsElement = $("#employee-details");
const employeeGrid = $("#employee-grid");
const sideFilter = $("#side-filter")
const inputSearch = $("#search-input");
const clearInput = $("#clear-button");
const propertyFilter = $("#property-filter");
const alphabetSearch = $("#alphabet-search");
const departmentFilter = $("#department-filter");
const officeFilter = $("#office-filter");
const jobTitleFilter = $("#job-title-filter");
const maxDisplayCount = 5;

var alphabet="";
var department="";
var office="";
var jobTitle=""

$(document).ready(() => {
    createAddForm();

    displayAlphabetSearchDiv();

    const employees = getEmployees();
    displayEmployees(employees);
    displayDepartments();
    displayOffices();
    displayJobTitles();
});

addEmployeeBtn.click((e) => {
    modal.show();
    addForm.show();
    editForm.hide();
    employeeDetailsElement.hide();
});

closeBtn.click(() => {
  modal.hide();
});

$(window).click((event) => {
    if ($(event.target).is(modal)) {
        modal.hide();
    }
});

addForm.on('submit',(e) => {
    e.preventDefault();

    let firstName = $("#firstname").val().trim();
    let lastName = $("#lastname").val().trim()
    let email = $("#email").val().trim();
    let jobTitle = $("#job-title").val().trim();
    let office = $("#office").val().trim();
    let department = $("#department").val().trim();
    let phoneNumber = $("#phone-no").val().trim();
    let skypeId = $("#skype-id").val().trim();
 
    let flag=true;
    if (validateNameString(firstName).length !== 0){
        const errMessageElement = $("#firstname-error");
        errMessageElement.show();
        errMessageElement.text(`${validateNameString(firstName)}`);
        $("#firstname").val(firstName);
        flag=false;
    } else{
        $("#firstname-error").hide();
    }
    if (validateNameString(lastName).length !== 0){
        const errMessageElement = $("#lastname-error");
        errMessageElement.show();
        errMessageElement.text(`${validateNameString(lastName)}`);
        $("#lastname").val(lastName);
        flag=false;
    } else{
        $("#lastname-error").hide();
    }
    if (validateEmail(email).length !== 0){
        const errMessageElement = $("#email-error");
        errMessageElement.show();
        errMessageElement.text(`${validateEmail(email)}`);
        $("#email").val(email);
        flag=false;
    } else{
        $("#email-error").hide();
    }
    if(phoneNumber.length>0 && phoneNumber.length !== 10){
        $("#phone-no-error").show();
        $("#phone-no").val(phoneNumber);
        flag=false;
    } else{
        $("#phone-no-error").hide();
    }
    if(skypeId.length>0 && validateSkypeId(skypeId).length !== 0){
        const errMessageElement = $("#skype-id-error");
        errMessageElement.show();
        errMessageElement.text(`${validateSkypeId(skypeId)}`);
        $("#skype-id").val(skypeId);
        flag=false;
    } else{
        $("#skype-id-error").hide();
    }

    if(flag){
        createEmployee(firstName,lastName,email,jobTitle,office,department,phoneNumber,skypeId);
        const savedPopup = $(`<div class="popup" id="saved-popup"><p>Saved</p></div>`);
        $(document.body).append(savedPopup);
        setTimeout(() => savedPopup.remove(),3000);
        addForm.reset();
        modal.hide();
    }

});

addForm.on('reset',(e) => {
    $("#firstname-error").hide();
    $("#lastname-error").hide();
    $("#email-error").hide();
    $("#phone-no-error").hide();
    $("#skype-id-error").hide();
})

inputSearch.on("input",(e) => {
    searchAndFilterEmployees();
});

clearInput.click(() => {
    inputSearch.val("");
    searchAndFilterEmployees();
})

propertyFilter.change((e) => {
    searchAndFilterEmployees();
});

alphabetSearch.change((e)=>{
    alphabet=e.target.value;
    searchAndFilterEmployees();
})

departmentFilter.change((e)=>{
    department=e.target.value;
    searchAndFilterEmployees();
})

officeFilter.change((e)=>{
    office=e.target.value;
    searchAndFilterEmployees();
})

jobTitleFilter.change((e) => {
    jobTitle=e.target.value;
    searchAndFilterEmployees();
})

function Employee(id,firstName,lastName,email,jobTitle,office,department,phoneNumber,skypeId){
    this.id = "employee"+id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.preferredName = this.firstName+" "+this.lastName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.office = office;
    this.department = department;
    this.phoneNumber = phoneNumber;
    this.skypeId = skypeId;
}

function createEmployee(firstName,lastName,email,jobTitle,office,department,phoneNumber,skypeId){
    let idCounter = getCounter();
    idCounter*=1;
    idCounter+=1;
    localStorage.setItem("idCounter",idCounter)
    const newEmployee = new Employee(idCounter,firstName,lastName,email,jobTitle,office,department,phoneNumber,skypeId);
    addEmployee(newEmployee);
}

function getCounter(){
    if(localStorage.getItem('idCounter') === null)
        return 0;
    return localStorage.getItem('idCounter')
}

function getEmployees(){
    if (localStorage.getItem('employees') === null){
        return [];
    } else {
        return JSON.parse(localStorage.getItem('employees'));
    }
}

function setEmployees(employees){
    localStorage.setItem("employees",JSON.stringify(employees));
}

function getDepartments(){
    if(localStorage.getItem('departments') === null){
        return {
            "IT": 0,
            "HR": 0,
            "MD": 0,
            "Sales": 0,
            "UX": 0
        };
    } else {
        return JSON.parse(localStorage.getItem('departments'));
    }
}

function setDepartments(departments){
    localStorage.setItem("departments",JSON.stringify(departments));
}

function getOffices(){
    if(localStorage.getItem('offices') === null){
        return {
            "India": 0,
            "Seattle": 0
        };
    } else {
        return JSON.parse(localStorage.getItem('offices'));
    }
}

function setOffices(offices){
    localStorage.setItem("offices",JSON.stringify(offices));
}

function getJobTitles(){
    if(localStorage.getItem('jobTitles') === null){
        return {
            "SharePoint Practice Head": 0,
            "Operations Manager": 0,
            "Product Manager": 0,
            "Lead Engineer - Dot Net": 0,
            "Network Engineer": 0,
            "Talent Manager Jr.": 0,
            "Software Engineer": 0,
            "UI Designer": 0,
            ".Net Development Lead": 0,
            "Recruiting Expert": 0,
            "BI Developer": 0,
            "Business Analyst": 0
        };
    } else {
        return JSON.parse(localStorage.getItem('jobTitles'));
    }
}

function setJobTitles(jobTitles){
    localStorage.setItem("jobTitles",JSON.stringify(jobTitles));
}

function displayAlphabetSearchDiv(){
    let alphabet;
    for(let i=65;i<=90;i++){
        alphabet=String.fromCharCode(i);
        const alphabetElement = $(`<div><input type="radio" name="alphabet" class="alphabet-radio" value="${alphabet}" id="${alphabet}"><label for="${alphabet}" class="blue-btn alphabet">${alphabet}</label></div>`);
        alphabetSearch.append(alphabetElement);
    }
}

function addEmployee(newEmployee){
    const employees = getEmployees();
    employees.push(newEmployee);
    setEmployees(employees)

    let temp = getDepartments();
    temp[newEmployee.department]+=1;
    setDepartments(temp);

    temp = getOffices();
    temp[newEmployee.office]+=1;
    setOffices(temp);

    temp = getJobTitles();
    temp[newEmployee.jobTitle]+=1;
    setJobTitles(temp);

    displayDepartments();
    displayOffices();
    displayJobTitles();
    searchAndFilterEmployees();
}

function displayEmployees(employees){
    employeeGrid.html("");

    if(employees.length===0){
        employeeGrid.html(`<h4>Sorry, no results found!</h4>`);
    } else {
        let name;
        employees.forEach(employee => {
            const employeeElement = $(`<div class="employee-div"></div>`);
    
            const hiddenElement = $(`<div id="${employee.id}" class="hidden-div"></div>`);
            hiddenElement.click(e => {
                displayEmployeeDetails(e.target.id);
            })
    
            name = employee.preferredName.length>20 ? employee.firstName : employee.preferredName;
    
            const employeeCard = $(`<div class="employee">
                                        <img class="card-img" src="./img/user_icon.jpg" alt="employee_img">
                                        <div class="card">
                                            <h3 class="card-name">${name}</h3>
                                            <p class="card-job-title">${employee.jobTitle}</p>
                                            <p class="card-department">${employee.department} Department</p>
                                            <div class="icon-div"><i class="fas fa-phone-square-alt" aria-hidden="true"></i><i class="fas fa-envelope" aria-hidden="true"></i><i class="fas fa-comment" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-heart" aria-hidden="true"></i></div>
                                        </div>
                                    </div>`);
    
            employeeElement.append(hiddenElement);
            employeeElement.append(employeeCard);
            employeeGrid.append(employeeElement);
        });        
    }
}

function displayEmployeeDetails(employeeId){
    modal.show();
    addForm.hide();
    editForm.hide();
    employeeDetailsElement.show();

    let employees = getEmployees();
    employees = employees.filter(employee => {
        return employee.id === employeeId;
    })
    const employee = employees[0]
    $("#employee-name").text(`${employee.preferredName}`);
    $("#employee-job-title").text(`${employee.jobTitle}`);
    $("#employee-department").text(`${employee.department} Department`);
    $("#employee-office").text(`${employee.office}`);
    $("#employee-firstname").text(`${employee.firstName}`);
    $("#employee-lastname").text(`${employee.lastName}`);
    $("#employee-email").text(`${employee.email}`);
    $("#employee-skype-id").text(`${employee.skypeId}` || `not provided`);
    $("#employee-phone-no").text(`${employee.phoneNumber}` || `not provided`);
    document.getElementById("edit-btn").onclick = () => {
        createEditForm(employee);
    };
}

function isAlpha(k){
    return (k>="a" && k<="z") || (k>="A" && k<="Z")
}

function isNumeric(n){
    return n>=0 && n<=9;
}

function validateNameString(name){
    if(name.length === 0){
        return "should not be empty";
    }

    for(k of name){
        if(!(isAlpha(k) || k==" ")){
            return "should contain only letters";
        }
    }

    return "";
}

function validateEmail(email)
{
    if(email.length === 0){
        return "should not be empty";
    }
    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
        return "Not a valid email";
    }
    return "";
}

function validateSkypeId(skypeId){
    if(!isAlpha(skypeId.charAt(0))){
        return "Should start with letter";
    }
    if(skypeId.length<6){
        return "Minimum 6 characters";
    }
    if(skypeId.length>32){
        return "Maximum 32 characters";
    }
    
    for(k of skypeId){
        if(!isAlpha(k) && !isNumeric(k) && ",-_.".indexOf(k)===-1){
            return "Contains invalid characters.";
        }
    }

    return "";
}

function createAddForm(){
    $("#job-title").html("");
    $("#department").html("");
    $("#office").html("");

    let c=1;
    for(key in getJobTitles()){
        if(c===1){
            $("#job-title").append(`<option value="${key}" selected>${key}</option>`);
            c+=1;
        } else {
            $("#job-title").append(`<option value="${key}">${key}</option>`);
        }
    }
    
    c=1;
    for(key in getDepartments()){
        if(c===1){
            $("#department").append(`<option value="${key}" selected>${key}</option>`);
            c+=1;
        } else {
            $("#department").append(`<option value="${key}">${key}</option>`);
        }
    }
    
    c=1;
    for(key in getOffices()){
        if(c===1){
            $("#office").append(`<option value="${key}" selected>${key}</option>`);
            c+=1;
        } else {
            $("#office").append(`<option value="${key}">${key}</option>`);
        }
    }
}

function createEditForm(employee){
    modal.show();
    editForm.show();
    addForm.hide();
    employeeDetailsElement.hide();

    $("#edit-job-title").html("");
    $("#edit-office").html("");
    $("#edit-department").html("");

    $("#edit-firstname").val(employee.firstName);
    $("#edit-lastname").val(employee.lastName);
    $("#edit-email").val(employee.email);
    $("#edit-phone-no").val(employee.phoneNumber);
    $("#edit-skype-id").val(employee.skypeId);
    
    for(key in getJobTitles()){
        if(key === employee.jobTitle){
            $("#edit-job-title").append(`<option value="${key}" selected>${key}</option>`);
        } else{
            $("#edit-job-title").append(`<option value="${key}">${key}</option>`);
        }
    }
    for(key in getDepartments()){
        if(key === employee.department){
            $("#edit-department").append(`<option value="${key}" selected>${key}</option>`);
        } else{
            $("#edit-department").append(`<option value="${key}">${key}</option>`);
        }
    }
    for(key in getOffices()){
        if(key === employee.office){
            $("#edit-office").append(`<option value="${key}" selected>${key}</option>`);
        } else{
            $("#edit-office").append(`<option value="${key}">${key}</option>`);
        }
    }

    $("#editform-firstname-error").hide();
    $("#editform-lastname-error").hide();
    $("#editform-email-error").hide();
    $("#editform-phone-no-error").hide();
    $("#editform-skype-id-error").hide();

    editForm.on('submit',(e) => {
        e.preventDefault();
        editEmployee(employee.id);
    });

    editForm.on('reset',(e)=>{
        e.preventDefault();
        displayEmployeeDetails(employee.id);
    });
}

function editEmployee(id){
    let employees = getEmployees();

    let firstName = $("#edit-firstname").val().trim();
    let lastName = $("#edit-lastname").val().trim()
    let email = $("#edit-email").val().trim();
    let jobTitle = $("#edit-job-title").val().trim();
    let office = $("#edit-office").val().trim();
    let department = $("#edit-department").val().trim();
    let phoneNumber = $("#edit-phone-no").val().trim();
    let skypeId = $("#edit-skype-id").val().trim();
    
    let flag=true;
    if (validateNameString(firstName).length !== 0){
        const errMessageElement = $("#editform-firstname-error");
        errMessageElement.show();
        errMessageElement.text(`${validateNameString(firstName)}`);
        $("#edit-firstname").val(firstName);
        flag=false;
    } else{
        $("#editform-firstname-error").hide();
    }
    if (validateNameString(lastName).length !== 0){
        const errMessageElement = $("#editform-lastname-error");
        errMessageElement.show();
        errMessageElement.text(`${validateNameString(lastName)}`);
        $("#edit-lastname").val(lastName);
        flag=false;
    } else{
        $("#editform-lastname-error").hide();
    }
    if (validateEmail(email).length !== 0){
        const errMessageElement = $("#editform-email-error");
        errMessageElement.show();
        errMessageElement.text(`${validateEmail(email)}`);
        $("#edit-email").val(email);
        flag=false;
    } else{
        $("#editform-email-error").hide();
    }
    if(phoneNumber.length>0 && phoneNumber.length !== 10){
        $("#editform-phone-no-error").show();
        $("#edit-phone-no").val(phoneNumber);
        flag=false;
    } else{
        $("#editform-phone-no-error").hide();
    }
    if(skypeId.length>0 && validateSkypeId(skypeId).length !== 0){
        const errMessageElement = $("#editform-skype-id-error");
        errMessageElement.show();
        errMessageElement.text(`${validateSkypeId(skypeId)}`);
        $("#edit-skyped-id").val(skypeId);
        flag=false;
    } else{
        $("#editform-skype-id-error").hide();
    }

    if(flag){
        let employee,index;
        for(const [i,v] of employees.entries()){
            if(v.id===id){
                employee=v;
                index=i;
                break;
            }
        }
    
        let temp = getDepartments();
        temp[employee.department]-=1;
        temp[department]+=1;
        setDepartments(temp);
    
        temp = getOffices();
        temp[employee.office]-=1;
        temp[office]+=1;
        setOffices(temp);
    
        temp = getJobTitles();
        temp[employee.jobTitle]-=1;
        temp[jobTitle]+=1;
        setJobTitles(temp);
    
        employee.firstName = firstName
        employee.lastName = lastName
        employee.department = department
        employee.email = email
        employee.jobTitle = jobTitle
        employee.office= office
        employee.phoneNumber = phoneNumber
        employee.skypeId = skypeId
        employee.preferredName = employee.firstName+" "+employee.lastName;
    
        employees.splice(index,employee);
    
        setEmployees(employees);
        const updatedPopup = $(`<div class="popup" id="updated-popup"><p>Updated</p></div>`);
        $(document.body).append(updatedPopup);
        setTimeout(() => updatedPopup.remove(),3000);
        displayOffices();
        displayDepartments();
        displayJobTitles();
        searchAndFilterEmployees();
        displayEmployeeDetails(id);
    }
}

function errMessage(ele,msg){
    ele.innerText=`${msg}`;
    ele.style.display="block";
    setTimeout(() => {ele.style.display="none"},5000);
}

function toKebabCase(str){
    let arr=str.split(" ");
    arr = arr.map(ele => {
        return ele.toLowerCase();
    });

    return arr.join("-");
}

function displayDepartments(){
    departmentFilter.html(`<li><input type="radio" name="department" class="side-filter-radio" value="" id="all-dept" checked><label for="all-dept" class="side-filter-label">All</label></li>`);
    const departments = getDepartments();
    const moreCategoryOptions = $(`<span class="hide"></span>`)
    let c=0;

    for(key in departments){
        const id = toKebabCase(key);
        categoryOption=$(`<li><input type="radio" name="department" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${departments[key]})</label></li>`);
        c+=1;
        if(c<=maxDisplayCount){
            departmentFilter.append(categoryOption);
        } else {
            moreCategoryOptions.append(categoryOption);
        }
    }
    
    if(c>maxDisplayCount){
        const viewMore = $("#job-title-view-more");
        const viewLess = $("#job-title-view-less");
        
        viewMore.show();
        viewLess.hide();
        departmentFilter.append(moreCategoryOptions);

        viewMore.click(() => {
            viewMore.hide();
            moreCategoryOptions.show();
            viewLess.show();
        })

        viewLess.click(() => {
            viewLess.hide();
            moreCategoryOptions.hide();
            viewMore.show();
        });
    }
}

function displayOffices(){
    officeFilter.html(`<li><input type="radio" name="office" class="side-filter-radio" value="" id="all-office" checked><label for="all-office" class="side-filter-label">All</label></li>`);
    const offices = getOffices();
    const moreCategoryOptions = $(`<span class="hide"></span>`)
    let c=0;

    for(key in offices){
        const id = toKebabCase(key);
        categoryOption=$(`<li><input type="radio" name="office" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${offices[key]})</label></li>`);
        c+=1;
        if(c<=maxDisplayCount){
            officeFilter.append(categoryOption);
        } else {
            moreCategoryOptions.append(categoryOption);
        }
    }
    
    if(c>maxDisplayCount){
        const viewMore = $("#office-view-more");
        const viewLess = $("#office-view-less");
        
        viewMore.show();
        viewLess.hide();
        officeFilter.append(moreCategoryOptions);

        viewMore.click(() => {
            viewMore.hide();
            moreCategoryOptions.show();
            viewLess.show();
        })

        viewLess.click(() => {
            viewLess.hide();
            moreCategoryOptions.hide();
            viewMore.show();
        });
    }
}

function displayJobTitles(){
    jobTitleFilter.html(`<li><input type="radio" name="jobTitle" class="side-filter-radio" value="" id="all-jobs" checked><label for="all-jobs" class="side-filter-label">All</label></li>`);
    const jobTitles = getJobTitles();
    const moreCategoryOptions = $(`<span class="hide"></span>`)
    let c=0;

    for(key in jobTitles){
        const id = toKebabCase(key);
        categoryOption=$(`<li><input type="radio" name="jobTitle" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${jobTitles[key]})</label></li>`);
        c+=1;
        if(c<=maxDisplayCount){
            jobTitleFilter.append(categoryOption);
        } else {
            moreCategoryOptions.append(categoryOption);
        }
    }
    
    if(c>maxDisplayCount){
        const viewMore = $("#job-title-view-more");
        const viewLess = $("#job-title-view-less");
        
        viewMore.show();
        viewLess.hide();
        jobTitleFilter.append(moreCategoryOptions);

        viewMore.click(() => {
            viewMore.hide();
            moreCategoryOptions.show();
            viewLess.show();
        })

        viewLess.click(() => {
            viewLess.hide();
            moreCategoryOptions.hide();
            viewMore.show();
        });
    }
}

function searchAndFilterEmployees(){
    let employees = getEmployees();
    const keyword = inputSearch.val().trim().toLowerCase();
    const property = propertyFilter.val();
    
    if(alphabet !== ""){
        employees = employees.filter(employee =>{
            return employee.preferredName.charAt(0).toLowerCase() === alphabet.toLowerCase();
        })
    }

    if(department !== ""){
        employees = employees.filter(employee =>{
            return employee.department === department;
        })
    }

    if(office !== ""){
        employees = employees.filter(employee =>{
            return employee.office === office;
        })
    }

    if(jobTitle !== ""){
        employees = employees.filter(employee => {
            return employee.jobTitle === jobTitle;
        })
    }

    if(keyword !== ""){
        if(property !== "all"){
            employees = employees.filter(employee => {
                return employee[property].toLowerCase().indexOf(keyword) > -1;
            });
        } else {
            employees = employees.filter(employee => {
                for (p of Object.getOwnPropertyNames(employee)){
                    if(employee[p].toLowerCase().indexOf(keyword)>-1){
                        return employee;
                    }
                }
            })
        }
    }

    displayEmployees(employees)
}

console.log("Hello, it's working")