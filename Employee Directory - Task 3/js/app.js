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
var alphabet="";
var department="";
var office="";
// var jobTitle=""

document.addEventListener('DOMContentLoaded',() => {
    const employees = getEmployees();
    displayEmployees(employees);
});

document.addEventListener('DOMContentLoaded',() => {
    const departments = getDepartments();
    displayDepartments(departments);
});

document.addEventListener('DOMContentLoaded',() => {
    const offices = getOffices();
    displayOffices(offices);
});

// document.addEventListener('DOMContentLoaded',() => {
//     const jobTitles = getJobTitles();
//     displayJobTitles(jobTitles);
// });

openAddModalBtn.addEventListener('click',(e) => {
    // console.log(e.target.value);
    // console.log("button clicked");
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
    createEmployee(addForm.firstName.value,addForm.lastName.value,
        addForm.email.value,addForm.jobTitle.value,addForm.office.value,
        addForm.department.value,addForm.phoneNumber.value,addForm.skypeId.value);
    addForm.reset();
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
            "Sales": 0
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
        return [];
    } else {
        return JSON.parse(localStorage.getItem('jobTitles'));
    }
}

function setJobTitles(jobTitles){
    localStorage.setItem("jobTitles",JSON.stringify(jobTitles));
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
}

function displayEmployees(employees){
    employeeGrid.innerHTML="";
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

        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee');
        employeeCard.innerHTML=`<img class="employee-img" src="./img/user_icon.jpg" alt="employee_img">
                                <div class="employee-card">
                                    <h3 class="employee-name">${employee.preferredName}</h3>
                                    <p class="employee-job-title">${employee.jobTitle}</p>
                                    <p class="employee-department">${employee.department} Department</p>
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
    modalDiv.innerHTML="";

    const employeeDetails = document.createElement("div");
    employeeDetails.innerHTML = `<p>${employee.firstName}</p>
                                <p>${employee.lastName}</p>
                                <p>${employee.preferredName}</p>
                                <p>${employee.department}</p>
                                <p>${employee.jobTitle}</p>
                                <p>${employee.office}</p>
                                <p>${employee.email}</p>
                                <p>${employee.skypeId}</p>
                                <p>${employee.phoneNumber}</p>`
    const editBtn = document.createElement("button")
    editBtn.innerText="Edit"
    editBtn.classList.add("blue-btn");
    editBtn.addEventListener('click', () => {
        modalDiv.innerHTML=""
        const form = editForm(employee);
        modalDiv.appendChild(form);
    });
    employeeDetails.appendChild(editBtn);
    modalDiv.appendChild(employeeDetails);
}

function editForm(employee){
    const form = document.createElement("form");
    form.id="employee-edit-form";
    let str=`<div>
                <div>
                    <label for="firstname">First Name</label>
                    <input type="text" placeholder="First Name" id="firstname" name="firstName" value="${employee.firstName}" required>
                </div>
                <div>
                    <label for="lastname">Last Name</label>
                    <input type="text" placeholder="Last Name" id="lastname" name="lastName" value="${employee.lastName}" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" placeholder="example@abc.com" id="email" name="email" value="${employee.email}" required>
                </div>
            </div>`
    const div = document.createElement("div");
    div.innerHTML=`<div>
                        <label for="job-title">Job Title</label>
                        <!-- <select name="jobTitle" id="job-title"></select> -->
                        <input type="text" placeholder="Job Title" id="job-title" name="jobTitle" value="${employee.jobTitle}" required>
                    </div>`

    const dept = document.createElement("div");
    dept.innerHTML=`<label for="department">Department</label>`
    const deptSelect = document.createElement("select");
    deptSelect.id="department";
    deptSelect.name="department";
    deptSelect.required=true;
    for(key in getDepartments()){
        const option = document.createElement("option");
        if(key === employee.department){
            option.innerHTML=`<option value="${key}" selected>${key}</option>`
        } else{
            option.innerHTML=`<option value="${key}">${key}</option>`
        }
        deptSelect.appendChild(option);
    }
    // console.log(deptSelect)
    dept.appendChild(deptSelect);
    // console.log(dept);
    div.appendChild(dept);

    const off = document.createElement("div");
    off.innerHTML=`<label for="office">Office</label>`;
    const offSelect = document.createElement("select");
    offSelect.id="office";
    offSelect.name="office";
    offSelect.required=true;
    for(key in getOffices()){
        const option = document.createElement("option");
        if(key === employee.office){
            option.innerHTML=`<option value="${key}" selected>${key}</option>`
        } else{
            option.innerHTML=`<option value="${key}">${key}</option>`
        }
        offSelect.appendChild(option);
    }
    
    // console.log(offSelect);
    off.appendChild(offSelect);
    // console.log(off);
    div.appendChild(off);

    // console.log(div);

    str+=div.outerHTML;

    str+=`<div>
            <div>
                <label for="phone-no">Phone No.</label>
                <input type="number" placeholder="Phone No." id="phone-no" name="phoneNumber" value="${employee.phoneNumber}" required>
            </div>
            <div>
                <label for="skype-id">Skype Id</label>
                <input type="number" placeholder="Skype ID" id="skype-id" name="skypeId" value="${employee.skypeId}" required>
            </div>
        </div>
        <button type="submit" class="blue-btn">Save</button>
        <button type="reset" class="blue-btn">Cancel</button>`

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
    temp[form.department.value]+=1;
    setDepartments(temp);

    temp = getOffices();
    temp[employee.office]-=1;
    temp[form.office.value]+=1;
    setOffices(temp);

    // console.log(employee,form.firstName);
    employee.firstName = form.firstName.value;
    employee.lastName = form.lastName.value;
    employee.department = form.department.value;
    employee.email = form.email.value;
    employee.jobTitle = form.jobTitle.value;
    employee.office= form.office.value;
    employee.phoneNumber = form.phoneNumber.value;
    employee.skypeId = form.skypeId.value;
    employee.preferredName = employee.firstName+" "+employee.lastName;

    employees.splice(index,employee);

    setEmployees(employees);
}

function toKebabCase(str){
    let arr=str.split(" ");
    arr = arr.map(ele => {
        return ele.toLowerCase();
    });

    return arr.join("-");
}

function displayDepartments(departments){
    const categoryOptions = document.getElementById("department-filter");
    // categoryOptions.innerHTML="";

    for(key in departments){
        // console.log(key);
        const option = document.createElement("li");
        const id = toKebabCase(key);
        option.innerHTML=`<input type="radio" name="department" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${departments[key]})</label>`
        categoryOptions.appendChild(option);
    }
}

function displayOffices(offices){
    const categoryOptions = document.getElementById("office-filter");
    // categoryOptions.innerHTML=""

    for(key in offices){
        const option = document.createElement("li");
        const id = toKebabCase(key);
        option.innerHTML=`<input type="radio" name="office" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${offices[key]})</label>`
        categoryOptions.appendChild(option);
    }
}

// function displayJobTitles(jobTitles){
//     const categoryOptions = document.getElementById("job-title-filter");
//     categoryOptions.innerHTML=""

//     for(key in jobTitles){
//         const option = document.createElement("li");
//         option.innerText=`${key} (${jobTitles[key]})`
//         categoryOptions.appendChild(option);
//     }
// }

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