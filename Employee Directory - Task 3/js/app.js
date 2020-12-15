const modal = document.getElementById("modal-form");
const employeeModal = document.getElementById("employee-modal");
const openAddModalBtn = document.getElementById("open-add-modal");
const span = document.getElementsByClassName("close")[0];
const espan = document.getElementsByClassName("close")[1];
const addForm = document.getElementById("add-employee");
const employeeGrid = document.getElementById("employee-grid");
const sideFilter = document.getElementById("side-filter")
const inputSearch = document.getElementById("search-input");
const clearInput = document.getElementById("clear-button");
const propertyFilter = document.getElementById("property-filter");
const alphabetSearch = document.getElementById("alphabet-search");
const departmentFilter = document.getElementById("department-filter");
const officeFilter = document.getElementById("office-filter");
const jobTitleFilter = document.getElementById("job-title-filter");
var alphabet="";
var department="";
var office="";
var jobTitle=""

document.addEventListener('DOMContentLoaded',() => {
    const employees = getEmployees();
    displayAlphabetSearchDiv();
    displayEmployees(employees);
    displayDepartments();
    displayOffices();
    displayJobTitles();
});

openAddModalBtn.addEventListener('click',(e) => {
    // console.log(e.target.value);
    // console.log("button clicked");
    createAddForm();
    modal.style.display = "block";
});

span.addEventListener('click',() => {
  modal.style.display = "none";
});

espan.addEventListener('click',() => {
    employeeModal.style.display = "none";
})

window.addEventListener('click',(event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == employeeModal){
        employeeModal.style.display = "none";
    }
});

addForm.addEventListener('submit',(e) => {
    e.preventDefault();
    // console.log(e);
    // console.log(addForm.firstName.value,addForm.lastName.value,addForm.email.value,addForm.jobTitle.value,addForm.office.value,addForm.department.value,addForm.phoneNumber.value,addForm.skypeId.value);
    let firstName = addForm.firstName.value.trim();
    let lastName = addForm.lastName.value.trim()
    let email = addForm.email.value.trim();
    let jobTitle = addForm.jobTitle.value.trim();
    let office = addForm.office.value.trim();
    let department = addForm.department.value.trim();
    let phoneNumber = addForm.phoneNumber.value.trim();
    let skypeId = addForm.skypeId.value.trim();
    
    let flag=true;
    if (firstName.length === 0){
        document.getElementById("firstname-error").style.display="block";
        addForm.firstName.value = firstName;
        addForm.firstName.focus();
        flag=false;
    } else{
        document.getElementById("firstname-error").style.display="none";
    }
    if (lastName.length === 0){
        document.getElementById("lastname-error").style.display="block";
        addForm.lastName.value = lastName;
        addForm.lastName.focus();
        flag=false;
    } else{
        document.getElementById("lastname-error").style.display="none";
    }
    if (email.length === 0){
        document.getElementById("email-error").style.display="block";
        addForm.email.value = email;
        addForm.email.focus();
        flag=false;
    } else{
        document.getElementById("email-error").style.display="none";
    }
    if(phoneNumber.length !== 10){
        document.getElementById("phone-no-error").style.display="block";
        addForm.phoneNumber.value = phoneNumber;
        addForm.phoneNumber.focus();
        flag=false;
    } else{
        document.getElementById("phone-no-error").style.display="none";
    }
    if(skypeId.length !== 8){
        document.getElementById("skype-id-error").style.display="block";
        addForm.skypeId.value = skypeId;
        addForm.skypeId.focus();
        flag=false;
    } else{
        document.getElementById("skype-id-error").style.display="none";
    }

    if(flag){
        createEmployee(firstName,lastName,email,jobTitle,office,department,phoneNumber,skypeId);
        const div = document.createElement("div");
        div.classList.add("popup")
        div.id="saved-popup"
        div.innerHTML=`<p>Saved</p>`
        body = document.body;
        body.appendChild(div);
        setTimeout(() => div.remove(),3000);
        addForm.reset();
    }

});

inputSearch.addEventListener("input",(e) => {
    // console.log(e);
    // console.log(e.target.value);
    searchAndFilterEmployees();
});

clearInput.addEventListener("click",() => {
    inputSearch.value="";
    searchAndFilterEmployees();
})

propertyFilter.addEventListener("change",(e) => {
    // console.log(e.target.value);
    searchAndFilterEmployees();
});

alphabetSearch.addEventListener("change",(e)=>{
    // console.log(e.target.value);
    alphabet=e.target.value;
    searchAndFilterEmployees();
})

departmentFilter.addEventListener("change",(e)=>{
    // console.log(e.target.value);
    department=e.target.value;
    searchAndFilterEmployees();
})

officeFilter.addEventListener("change",(e)=>{
    // console.log(e.target.value);
    office=e.target.value;
    searchAndFilterEmployees();
})

jobTitleFilter.addEventListener("change",(e) => {
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
    const div = document.getElementById("alphabet-search");
    let r;
    for(let i=65;i<=90;i++){
        const d = document.createElement("div");
        r=String.fromCharCode(i);
        d.innerHTML=`<input type="radio" name="alphabet" class="alphabet-radio" value="${r}" id="${r}"><label for="${r}" class="blue-btn alphabet">${r}</label></div>`;
        div.appendChild(d);
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
    employeeGrid.innerHTML="";
    let name;
    employees.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add("employee-div");

        const hiddenDiv = document.createElement('div');
        hiddenDiv.id=employee.id;
        hiddenDiv.classList.add("hidden-div");
        // hiddenDiv.innerText = "hiddenDiv"
        hiddenDiv.addEventListener('click',e => {
            // console.log(e.target.id);
            displayEmployeeDetails(e.target.id);
        })

        if(employee.preferredName.length>20){
            name = employee.firstName;
        } else {
            name = employee.preferredName;
        }

        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee');
        employeeCard.innerHTML=`<img class="card-img" src="./img/user_icon.jpg" alt="employee_img">
                                <div class="card">
                                    <h3 class="card-name">${name}</h3>
                                    <p class="card-job-title">${employee.jobTitle}</p>
                                    <p class="card-department">${employee.department} Department</p>
                                    <div class="icon-div"><i class="fas fa-phone-square-alt" aria-hidden="true"></i><i class="fas fa-envelope" aria-hidden="true"></i><i class="fas fa-comment" aria-hidden="true"></i><i class="fas fa-star" aria-hidden="true"></i><i class="fas fa-heart" aria-hidden="true"></i></div>
                                </div>`

        employeeDiv.appendChild(hiddenDiv);
        employeeDiv.appendChild(employeeCard);
        employeeGrid.appendChild(employeeDiv);
    });
}

function displayEmployeeDetails(employeeId){
    let employees = getEmployees();
    employees = employees.filter(employee => {
        return employee.id === employeeId;
    })
    const employee = employees[0]
    employeeModal.style.display = "block";
    // console.log(employeeModal);

    const modalDiv = document.getElementById("modal-div");
    modalDiv.innerHTML = `<div class="professional-details">
                            <img class="employee-img" src="./img/user_icon.jpg" alt="employee_img">
                            <div class="details-div">
                                <h3 class="employee-name">${employee.preferredName}</h3>
                                <div class="job-details">
                                    <div class="property">
                                        <p class="property-name">Job Title</p>
                                        <p class="property-value">${employee.jobTitle}</p>
                                    </div>
                                    <div class="property">
                                        <p class="property-name">Department</p>
                                        <p class="property-value">${employee.department} Department</p>
                                    </div>
                                    <div class="property">
                                        <p class="property-name">Office</p>
                                        <p class="property-value"><i class="fas fa-map-marker-alt property-name"></i>${employee.office}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="personal-details">
                            <div class="name-details">
                                <div class="property">
                                    <p class="property-name">First Name</p>
                                    <p class="property-value">${employee.firstName}</p>
                                </div>
                                <div class="property">
                                    <p class="property-name">Last Name</p>
                                    <p class="property-value">${employee.lastName}</p>
                                </div>
                            </div>
                            <div class="contact-details">
                                <p class="property-value"><i class="fas fa-envelope property-name" aria-hidden="true"></i>${employee.email}</p>
                                <p class="property-value"><i class="fab fa-skype property-name"></i>${employee.skypeId}</p>
                                <p class="property-value"><i class="fas fa-phone-square-alt property-name" aria-hidden="true"></i></i>${employee.phoneNumber}</p>
                            </div>
                        </div>`
    const editBtn = document.createElement("button")
    editBtn.innerText="Edit"
    editBtn.classList.add("blue-btn");
    editBtn.classList.add("form-btn");
    editBtn.addEventListener('click', () => {
        modalDiv.innerHTML=""
        const form = editForm(employee);
        modalDiv.appendChild(form);
    });
    modalDiv.appendChild(editBtn);
}

function createAddForm(){
    let str=`<div class="form-div">
                <div class="input-div">
                    <label for="firstname" class="form-label">First Name</label>
                    <input type="text" placeholder="ex: John" id="firstname" name="firstName" class="form-input" required>
                    <p id="firstname-error" class="err-msg">First name should not be empty</p>
                </div>
                <div class="input-div">
                    <label for="lastname" class="form-label">Last Name</label>
                    <input type="text" placeholder="ex: Doe" id="lastname" name="lastName" class="form-input" required>
                    <p id="lastname-error" class="err-msg">Last name should not be empty</p>
                </div>
            </div>`
    const div = document.createElement("div");
    div.classList.add("form-div")

    const div2 = document.createElement("div");
    div2.classList.add("form-div")

    const jobs = document.createElement("div");
    jobs.classList.add("input-div")
    jobs.innerHTML=`<label for="job-title" class="form-label">Office</label>`;
    const jobSelect = document.createElement("select");
    jobSelect.id="job-title";
    jobSelect.name="jobTitle";
    jobSelect.classList.add("form-input");
    jobSelect.classList.add("form-input-select");
    jobSelect.required=true;
    let c=1;
    for(key in getJobTitles()){
        // console.log("here");
        if(c===1){
            jobSelect.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            c+=1;
        } else {
            jobSelect.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    
    // console.log(offSelect);
    jobs.appendChild(jobSelect);
    jobs.innerHTML+=`<p id="job-title-error" class="err-msg">Select a valid job title</p>`
    // console.log(off);
    div.appendChild(jobs);

    const dept = document.createElement("div");
    dept.classList.add("input-div");
    dept.innerHTML=`<label for="department" class="form-label">Department</label>`
    const deptSelect = document.createElement("select");
    deptSelect.id="department";
    deptSelect.name="department";
    deptSelect.classList.add("form-input");
    deptSelect.classList.add("form-input-select");
    deptSelect.required=true;
    c=1;
    for(key in getDepartments()){
        // console.log("here");
        if(c===1){
            deptSelect.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            // console.log("now here");
            c+=1;
        } else {
            deptSelect.innerHTML+=`<option value="${key}">${key}</option>`;
            // console.log("Also here");
        }
    }
    // console.log(deptSelect)
    dept.appendChild(deptSelect);
    dept.innerHTML+=`<p id="department-error" class="err-msg">Select a valid department</p>`
    // console.log(dept);
    div.appendChild(dept);

    const off = document.createElement("div");
    off.classList.add("input-div")
    off.innerHTML=`<label for="office" class="form-label">Office</label>`;
    const offSelect = document.createElement("select");
    offSelect.id="office";
    offSelect.name="office";
    offSelect.classList.add("form-input");
    offSelect.classList.add("form-input-select");
    offSelect.required=true;
    c=1;
    for(key in getOffices()){
        if(c===1){
            offSelect.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            c+=1;
        } else {
            offSelect.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    
    // console.log(offSelect);
    off.appendChild(offSelect);
    off.innerHTML+=`<p id="office-error" class="err-msg">Select a valid office</p>`
    // console.log(off);
    div2.appendChild(off);
    div2.innerHTML+=`<div class="input-div">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" placeholder="example@abc.com" id="email" name="email" class="form-input" required>
                        <p id="email-error" class="err-msg">Enter a valid email</p>
                    </div>`

    // console.log(div);

    str+=div.outerHTML;
    str+=div2.outerHTML;

    str+=`<div class="form-div">
            <div class="input-div">
                <label for="phone-no" class="form-label">Phone No.</label>
                <input type="number" placeholder="10 digit number" id="phone-no" name="phoneNumber" class="form-input" required>
                <p id="phone-no-error" class="err-msg">Enter a valid 10 digit phone number</p>
            </div>
            <div class="input-div">
                <label for="skype-id" class="form-label">Skype Id</label>
                <input type="number" placeholder="Your skype ID" id="skype-id" name="skypeId" class="form-input" required>
                <p id="skype-id-error" class="err-msg">Enter a valid 8 digit skype id</p>
            </div>
        </div>
        <button type="submit" class="blue-btn form-btn">Save</button>`

    addForm.innerHTML=`${str}`
    
    const cancelBtn = document.createElement("button");
    cancelBtn.type="reset"
    cancelBtn.classList.add("blue-btn");
    cancelBtn.classList.add("form-btn");
    cancelBtn.id="cancel-button";
    cancelBtn.innerText="Cancel"

    cancelBtn.addEventListener('click',() => {
        modal.style.display = "none";
    });

    addForm.appendChild(cancelBtn);

}

function editForm(employee){
    const form = document.createElement("form");
    form.id="employee-edit-form";
    let str=`<div class="form-div">
                <div class="input-div">
                    <label for="firstname" class="form-label">First Name</label>
                    <input type="text" placeholder="ex: John" id="firstname" name="firstName" class="form-input" value="${employee.firstName}" required>
                    <p id="editform-firstname-error" class="err-msg">First name should not be empty</p>
                </div>
                <div class="input-div">
                    <label for="lastname" class="form-label">Last Name</label>
                    <input type="text" placeholder="ex: Doe" id="lastname" name="lastName" class="form-input" value="${employee.lastName}" required>
                    <p id="editform-lastname-error" class="err-msg">Last name should not be empty</p>
                </div>
            </div>`
    const div = document.createElement("div");
    div.classList.add("form-div")
    // div.innerHTML=`<div class="input-div">
    //                     <label for="job-title" class="form-label">Job Title</label>
    //                     <!-- <select name="jobTitle" id="job-title"></select> -->
    //                     <input type="text" placeholder="Job Title" id="job-title" name="jobTitle" class="form-input form-input-select" value="${employee.jobTitle}" required>
    //                 </div>`

    const div2 = document.createElement("div");
    div2.classList.add("form-div")

    const jobs = document.createElement("div");
    jobs.classList.add("input-div")
    jobs.innerHTML=`<label for="job-title" class="form-label">Office</label>`;
    const jobSelect = document.createElement("select");
    jobSelect.id="job-title";
    jobSelect.name="jobTitle";
    jobSelect.classList.add("form-input");
    jobSelect.classList.add("form-input-select");
    jobSelect.required=true;
    for(key in getJobTitles()){
        if(key === employee.jobTitle){
            jobSelect.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            jobSelect.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    
    // console.log(offSelect);
    jobs.appendChild(jobSelect);
    jobs.innerHTML+=`<p id="editform-job-title-error" class="err-msg">Select a valid job title</p>`
    // console.log(off);
    div.appendChild(jobs);

    const dept = document.createElement("div");
    dept.classList.add("input-div");
    dept.innerHTML=`<label for="department" class="form-label">Department</label>`
    const deptSelect = document.createElement("select");
    deptSelect.id="department";
    deptSelect.name="department";
    deptSelect.classList.add("form-input");
    deptSelect.classList.add("form-input-select");
    deptSelect.required=true;
    for(key in getDepartments()){
        if(key === employee.department){
            deptSelect.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            deptSelect.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    // console.log(deptSelect)
    dept.appendChild(deptSelect);
    dept.innerHTML+=`<p id="editform-department-error" class="err-msg">Select a valid department</p>`
    // console.log(dept);
    div.appendChild(dept);

    const off = document.createElement("div");
    off.classList.add("input-div")
    off.innerHTML=`<label for="office" class="form-label">Office</label>`;
    const offSelect = document.createElement("select");
    offSelect.id="office";
    offSelect.name="office";
    offSelect.classList.add("form-input");
    offSelect.classList.add("form-input-select");
    offSelect.required=true;
    for(key in getOffices()){
        if(key === employee.office){
            offSelect.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            offSelect.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    
    // console.log(offSelect);
    off.appendChild(offSelect);
    off.innerHTML+=`<p id="editform-office-error" class="err-msg">Select a valid office</p>`
    // console.log(off);
    div2.appendChild(off);
    div2.innerHTML+=`<div class="input-div">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" placeholder="example@abc.com" id="email" name="email" class="form-input" value="${employee.email}" required>
                        <p id="editform-email-error" class="err-msg">Enter a valid email</p>
                    </div>`

    // console.log(div);

    str+=div.outerHTML;
    str+=div2.outerHTML;

    str+=`<div class="form-div">
            <div class="input-div">
                <label for="phone-no" class="form-label">Phone No.</label>
                <input type="number" placeholder="10 digit number" id="phone-no" name="phoneNumber" class="form-input" value="${employee.phoneNumber}" required>
                <p id="editform-phone-no-error" class="err-msg">Enter a valid 10 digit phone number</p>
            </div>
            <div class="input-div">
                <label for="skype-id" class="form-label">Skype Id</label>
                <input type="number" placeholder="Your skype ID" id="skype-id" name="skypeId" class="form-input" value="${employee.skypeId}" required>
                <p id="editform-skype-id-error" class="err-msg">Enter a valid 8 digit skype id</p>
            </div>
        </div>
        <button type="submit" class="blue-btn form-btn">Save</button>
        <button type="reset" class="blue-btn form-btn">Cancel</button>`

    // console.log(str);
    form.innerHTML=`${str}`
    // console.log(form);

    form.addEventListener('submit',(e) =>{
        e.preventDefault();
        // console.log("submitted");
        editEmployee(employee.id);
    });

    form.addEventListener('reset',(e)=>{
        // e.preventDefault();
        displayEmployeeDetails(employee.id);
    })


    return form;
}

function editEmployee(id){
    let employees = getEmployees();
    const form = document.getElementById("employee-edit-form");

    let firstName = form.firstName.value.trim();
    let lastName = form.lastName.value.trim()
    let email = form.email.value.trim();
    let jobTitle = form.jobTitle.value.trim();
    let office = form.office.value.trim();
    let department = form.department.value.trim();
    let phoneNumber = form.phoneNumber.value.trim();
    let skypeId = form.skypeId.value.trim()

    let flag=true;
    if (firstName.length === 0){
        document.getElementById("editform-firstname-error").style.display="block";
        form.firstName.value = firstName;
        form.firstName.focus();
        flag=false;
    } else{
        document.getElementById("editform-firstname-error").style.display="none";
    }
    if (lastName.length === 0){
        document.getElementById("editform-lastname-error").style.display="block";
        form.lastName.value = lastName;
        form.lastName.focus();
        flag=false;
    } else{
        document.getElementById("editform-lastname-error").style.display="none";
    }
    if (email.length === 0){
        document.getElementById("editform-email-error").style.display="block";
        form.email.value = email;
        form.email.focus();
        flag=false;
    } else{
        document.getElementById("editform-email-error").style.display="none";
    }
    if(phoneNumber.length !== 10){
        document.getElementById("editform-phone-no-error").style.display="block";
        form.phoneNumber.value = phoneNumber;
        form.phoneNumber.focus();
        flag=false;
    } else{
        document.getElementById("editform-phone-no-error").style.display="none";
    }
    if(skypeId.length !== 8){
        document.getElementById("editform-skype-id-error").style.display="block";
        form.skypeId.value = skypeId;
        form.skypeId.focus();
        flag=false;
    } else{
        document.getElementById("editform-skype-id-error").style.display="none";
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
    
        // console.log(employee,form.firstName);
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
        const div = document.createElement("div");
        div.classList.add("popup");
        div.id="updated-popup";
        div.innerHTML=`<p>Updated</p>`;
        body = document.body;
        body.appendChild(div);
        setTimeout(() => div.remove(),3000);
        displayOffices();
        displayDepartments();
        displayJobTitles();
        searchAndFilterEmployees();
    }
    
}

function toKebabCase(str){
    let arr=str.split(" ");
    arr = arr.map(ele => {
        return ele.toLowerCase();
    });

    return arr.join("-");
}

function displayDepartments(){
    const categoryOptions = document.getElementById("department-filter");
    categoryOptions.innerHTML=`<li><input type="radio" name="department" class="side-filter-radio" value="" id="all-dept" checked><label for="all-dept" class="side-filter-label">All</label></li>`;
    const departments = getDepartments();
    const span = document.createElement("span");
    span.classList.add("less");
    let c=0;

    for(key in departments){
        // console.log(key);
        const option = document.createElement("li");
        const id = toKebabCase(key);
        option.innerHTML=`<input type="radio" name="department" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${departments[key]})</label>`
        c+=1;
        if(c<=5){
            categoryOptions.appendChild(option);
        } else {
            span.appendChild(option);
        }
    }
    
    if(c>5){
        const viewMore = document.getElementById("department-view-more");
        const viewLess = document.getElementById("department-view-less");
        
        viewMore.classList.remove("less");
        viewLess.classList.add("less");
        categoryOptions.appendChild(span);

        viewMore.addEventListener('click',() => {
            // console.log("view more event");
            viewMore.classList.add("less");
            span.classList.remove("less");
            // console.log("came here");
            viewLess.classList.remove("less");
        })

        viewLess.addEventListener('click',() => {
            // console.log("view less event");
            viewLess.classList.add("less");
            span.classList.add("less");
            viewMore.classList.remove("less");
        });
    }
}

function displayOffices(){
    const categoryOptions = document.getElementById("office-filter");
    categoryOptions.innerHTML=`<li><input type="radio" name="office" class="side-filter-radio" value="" id="all-office" checked><label for="all-office" class="side-filter-label">All</label></li>`
    const offices = getOffices();
    const span = document.createElement("span");
    span.classList.add("less");
    let c=0;

    for(key in offices){
        const option = document.createElement("li");
        const id = toKebabCase(key);
        option.innerHTML=`<input type="radio" name="office" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${offices[key]})</label>`
        c+=1;
        if(c<=5){
            categoryOptions.appendChild(option);
        } else {
            span.appendChild(option);
        }
    }
    
    if(c>5){
        const viewMore = document.getElementById("office-view-more");
        const viewLess = document.getElementById("office-view-less");
        
        viewMore.classList.remove("less");
        viewLess.classList.add("less");
        categoryOptions.appendChild(span);

        viewMore.addEventListener('click',() => {
            // console.log("view more event");
            viewMore.classList.add("less");
            span.classList.remove("less");
            // console.log("came here");
            viewLess.classList.remove("less");
        })

        viewLess.addEventListener('click',() => {
            // console.log("view less event");
            viewLess.classList.add("less");
            span.classList.add("less");
            viewMore.classList.remove("less");
        });
    }
}

function displayJobTitles(){
    const categoryOptions = document.getElementById("job-title-filter");
    categoryOptions.innerHTML=`<li><input type="radio" name="jobTitle" class="side-filter-radio" value="" id="all-jobs" checked><label for="all-jobs" class="side-filter-label">All</label></li>`
    const jobTitles = getJobTitles();
    const span = document.createElement("span");
    span.classList.add("less");
    let c=0;

    for(key in jobTitles){
        const option = document.createElement("li");
        const id = toKebabCase(key);
        option.innerHTML=`<input type="radio" name="jobTitle" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${jobTitles[key]})</label>`
        c+=1;
        if(c<=5){
            categoryOptions.appendChild(option);
        } else {
            span.appendChild(option);
        }
    }
    
    if(c>5){
        const viewMore = document.getElementById("job-title-view-more");
        const viewLess = document.getElementById("job-title-view-less");
        
        viewMore.classList.remove("less");
        viewLess.classList.add("less");
        categoryOptions.appendChild(span);

        viewMore.addEventListener('click',() => {
            // console.log("view more event");
            viewMore.classList.add("less");
            span.classList.remove("less");
            // console.log("came here");
            viewLess.classList.remove("less");
        })

        viewLess.addEventListener('click',() => {
            // console.log("view less event");
            viewLess.classList.add("less");
            span.classList.add("less");
            viewMore.classList.remove("less");
        });
    }
}

function searchAndFilterEmployees(){
    let employees = getEmployees();
    const keyword = inputSearch.value.trim().toLowerCase();
    const property = propertyFilter.value;
    
    // console.log("search called ",alphabet[0]);
    if(alphabet !== ""){
        // console.log("came here");
        employees = employees.filter(employee =>{
            // console.log(employee.preferredName)
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