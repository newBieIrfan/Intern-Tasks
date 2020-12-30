const modal = document.getElementById("modal-form");
const addEmployeeBtn = document.getElementById("add-employee-btn");
const closeBtn = document.getElementById("close");
const employeeForm = document.getElementById("employee-form");
const employeeDetailsElement = document.getElementById("employee-details");
const employeeGrid = document.getElementById("employee-grid");
const inputSearch = document.getElementById("search-input");
const clearInput = document.getElementById("clear-button");
const propertyFilter = document.getElementById("property-filter");
const alphabetSearch = document.getElementById("alphabet-search");
const departmentFilter = document.getElementById("department-filter");
const officeFilter = document.getElementById("office-filter");
const jobTitleFilter = document.getElementById("job-title-filter");
const maxDisplayCount = 5;

var alphabet="";
var department="";
var office="";
var jobTitle=""

document.addEventListener('DOMContentLoaded',() => {
    displayAlphabetSearchDiv();

    const employees = getEmployees();
    displayEmployees(employees);
    displayDepartments();
    displayOffices();
    displayJobTitles();
});

addEmployeeBtn.addEventListener('click',(e) => {
    createAddForm();
});

closeBtn.addEventListener('click',() => {
  modal.style.display = "none";
});

window.addEventListener('click',(event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

inputSearch.addEventListener("input",(e) => {
    searchAndFilterEmployees();
});

clearInput.addEventListener("click",() => {
    inputSearch.value="";
    searchAndFilterEmployees();
})

propertyFilter.addEventListener("change",(e) => {
    searchAndFilterEmployees();
});

alphabetSearch.addEventListener("change",(e)=>{
    alphabet=e.target.value;
    searchAndFilterEmployees();
})

departmentFilter.addEventListener("change",(e)=>{
    department=e.target.value;
    searchAndFilterEmployees();
})

officeFilter.addEventListener("change",(e)=>{
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

function displayPopup(type){
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.id = `${type.toLowerCase()}-popup`;
    popup.innerHTML = `<p>${type}</p>`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(),3000);
}

function displayAlphabetSearchDiv(){
    let alphabet;
    for(let i=65;i<=90;i++){
        const alphabetElement = document.createElement("div");
        alphabet=String.fromCharCode(i);
        alphabetElement.innerHTML=`<input type="radio" name="alphabet" class="alphabet-radio" value="${alphabet}" id="${alphabet}"><label for="${alphabet}" class="blue-btn alphabet">${alphabet}</label></div>`;
        alphabetSearch.appendChild(alphabetElement);
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
}

function displayEmployees(employees){
    employeeGrid.innerHTML="";

    if(employees.length===0){
        employeeGrid.innerHTML=`<h4>Sorry, no results found!</h4>`
    } else {
        let name;
        employees.forEach(employee => {
            const employeeElement = document.createElement('div');
            employeeElement.classList.add("employee-div");
    
            const hiddenElement = document.createElement('div');
            hiddenElement.id=employee.id;
            hiddenElement.classList.add("hidden-div");
            hiddenElement.addEventListener('click',e => {
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
    
            employeeElement.appendChild(hiddenElement);
            employeeElement.appendChild(employeeCard);
            employeeGrid.appendChild(employeeElement);
        });        
    }
}

function displayEmployeeDetails(employeeId){
    modal.style.display="block";
    employeeForm.style.display="none";
    employeeDetailsElement.style.display="block";

    let employees = getEmployees();
    employees = employees.filter(employee => {
        return employee.id === employeeId;
    })
    const employee = employees[0]
    document.getElementById("employee-name").innerText = `${employee.preferredName}`;
    document.getElementById("employee-job-title").innerText = `${employee.jobTitle}`;
    document.getElementById("employee-department").innerText = `${employee.department} Department`;
    document.getElementById("employee-office").innerText = `${employee.office}`;
    document.getElementById("employee-firstname").innerText = `${employee.firstName}`;
    document.getElementById("employee-lastname").innerText = `${employee.lastName}`;
    document.getElementById("employee-email").innerText = `${employee.email}`;
    document.getElementById("employee-skype-id").innerText = `${employee.skypeId}` || `not provided`;
    document.getElementById("employee-phone-no").innerText = `${employee.phoneNumber}` || `not provided`;
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
    modal.style.display = "block";
    employeeForm.style.display = "block";
    employeeDetailsElement.style.display = "none";

    employeeForm.firstName.value = "";
    employeeForm.lastName.value = "";
    employeeForm.email.value = "";
    employeeForm.phoneNumber.value = "";
    employeeForm.skypeId.value = "";

    employeeForm.jobTitle.innerHTML="";
    employeeForm.department.innerHTML="";
    employeeForm.office.innerHTML="";

    let isFirstOption = true;
    for(key in getJobTitles()){
        if(isFirstOption){
            employeeForm.jobTitle.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            isFirstOption = false;
        } else {
            employeeForm.jobTitle.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    
    isFirstOption = true;
    for(key in getDepartments()){
        if(isFirstOption){
            employeeForm.department.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            isFirstOption = false;
        } else {
            employeeForm.department.innerHTML+=`<option value="${key}">${key}</option>`;
        }
    }
    
    isFirstOption = true;
    for(key in getOffices()){
        if(isFirstOption){
            employeeForm.office.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            isFirstOption = false;
        } else {
            employeeForm.office.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }

    document.getElementById("reset-button").innerText = `Reset`;

    employeeForm.onsubmit = (e) => {
        e.preventDefault();
        addAndEditEmployee("");
    }

    employeeForm.onreset = (e) => {
        document.getElementById("firstname-error").style.display="none";
        document.getElementById("lastname-error").style.display="none";
        document.getElementById("email-error").style.display="none";
        document.getElementById("phone-no-error").style.display="none";
        document.getElementById("skype-id-error").style.display="none";   
    }
}

function createEditForm(employee){
    modal.style.display="block";
    employeeForm.style.display="block";
    employeeDetailsElement.style.display="none";
    
    employeeForm.firstName.value = employee.firstName;
    employeeForm.lastName.value = employee.lastName;
    employeeForm.email.value = employee.email;
    employeeForm.phoneNumber.value = employee.phoneNumber;
    employeeForm.skypeId.value = employee.skypeId;

    employeeForm.jobTitle.innerHTML="";
    employeeForm.office.innerHTML="";
    employeeForm.department.innerHTML="";

    
    for(key in getJobTitles()){
        if(key === employee.jobTitle){
            employeeForm.jobTitle.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            employeeForm.jobTitle.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    for(key in getDepartments()){
        if(key === employee.department){
            employeeForm.department.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            employeeForm.department.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    for(key in getOffices()){
        if(key === employee.office){
            employeeForm.office.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            employeeForm.office.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }

    document.getElementById("reset-button").innerText = `Cancel`;

    document.getElementById("firstname-error").style.display="none";
    document.getElementById("lastname-error").style.display="none";
    document.getElementById("email-error").style.display="none";
    document.getElementById("phone-no-error").style.display="none";
    document.getElementById("skype-id-error").style.display="none";

    employeeForm.onsubmit = (e) => {
        e.preventDefault();
        addAndEditEmployee(employee.id);
    };

    employeeForm.onreset = (e)=>{
        e.preventDefault();
        displayEmployeeDetails(employee.id);
    };
}

function addAndEditEmployee(id){
    let firstName = employeeForm.firstName.value.trim();
    let lastName = employeeForm.lastName.value.trim()
    let email = employeeForm.email.value.trim();
    let jobTitle = employeeForm.jobTitle.value.trim();
    let office = employeeForm.office.value.trim();
    let department = employeeForm.department.value.trim();
    let phoneNumber = employeeForm.phoneNumber.value.trim();
    let skypeId = employeeForm.skypeId.value.trim();
    
    let flag=true;
    if (validateNameString(firstName).length !== 0){
        const errMessageElement = document.getElementById("firstname-error");
        errMessageElement.style.display="block";
        errMessageElement.innerText=`${validateNameString(firstName)}`;
        employeeForm.firstName.value = firstName;
        flag=false;
    } else{
        document.getElementById("firstname-error").style.display="none";
    }
    if (validateNameString(lastName).length !== 0){
        const errMessageElement = document.getElementById("lastname-error");
        errMessageElement.style.display="block";
        errMessageElement.innerText=`${validateNameString(lastName)}`;
        employeeForm.lastName.value = lastName;
        flag=false;
    } else{
        document.getElementById("lastname-error").style.display="none";
    }
    if (validateEmail(email).length !== 0){
        const errMessageElement = document.getElementById("email-error");
        errMessageElement.style.display="block";
        errMessageElement.innerText=`${validateEmail(email)}`;
        employeeForm.email.value = email;
        flag=false;
    } else{
        document.getElementById("email-error").style.display="none";
    }
    if(phoneNumber.length>0 && phoneNumber.length !== 10){
        employeeForm.phoneNumber.value = phoneNumber;
        document.getElementById("phone-no-error").style.display="block";
        flag=false;
    } else{
        document.getElementById("phone-no-error").style.display="none";
    }
    if(skypeId.length>0 && validateSkypeId(skypeId).length !== 0){
        const errMessageElement = document.getElementById("skype-id-error");
        errMessageElement.style.display="block";
        errMessageElement.innerText=`${validateSkypeId(skypeId)}`;
        employeeForm.skypeId.value = skypeId;
        flag=false;
    } else{
        document.getElementById("skype-id-error").style.display="none";
    }

    if(flag){
        if(id!==""){
            editEmployee(id,firstName,lastName,email,jobTitle,office,department,phoneNumber,skypeId);
            displayPopup("Updated");
            displayEmployeeDetails(id);
        } else {
            createEmployee(firstName,lastName,email,jobTitle,office,department,phoneNumber,skypeId);
            displayPopup("Saved");
            employeeForm.reset();
            modal.style.display="none";
        }

        displayOffices();
        displayDepartments();
        displayJobTitles();
        searchAndFilterEmployees();
    }
}

function editEmployee(id,firstName,lastName,email,jobTitle,office,department,phoneNumber,skypeId){
    let employees = getEmployees();
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
}

function toKebabCase(str){
    let arr=str.split(" ");
    arr = arr.map(ele => {
        return ele.toLowerCase();
    });

    return arr.join("-");
}

function displayDepartments(){
    departmentFilter.innerHTML=`<li><input type="radio" name="department" class="side-filter-radio" value="" id="all-dept" checked><label for="all-dept" class="side-filter-label">All</label></li>`;
    const departments = getDepartments();
    const moreCategoryOptions = document.createElement("span");
    moreCategoryOptions.classList.add("hide");
    let displayCount=0;

    for(key in departments){
        const categoryOption = document.createElement("li");
        const id = toKebabCase(key);
        categoryOption.innerHTML=`<input type="radio" name="department" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${departments[key]})</label>`
        displayCount+=1;
        if(displayCount<=maxDisplayCount){
            departmentFilter.appendChild(categoryOption);
        } else {
            moreCategoryOptions.appendChild(categoryOption);
        }
    }
    
    if(displayCount>maxDisplayCount){
        const viewMore = document.getElementById("department-view-more");
        const viewLess = document.getElementById("department-view-less");
        
        viewMore.classList.remove("hide");
        viewLess.classList.add("hide");
        departmentFilter.appendChild(moreCategoryOptions);

        viewMore.addEventListener('click',() => {
            viewMore.classList.add("hide");
            moreCategoryOptions.classList.remove("hide");
            viewLess.classList.remove("hide");
        })

        viewLess.addEventListener('click',() => {
            viewLess.classList.add("hide");
            moreCategoryOptions.classList.add("hide");
            viewMore.classList.remove("hide");
        });
    }
}

function displayOffices(){
    officeFilter.innerHTML=`<li><input type="radio" name="office" class="side-filter-radio" value="" id="all-office" checked><label for="all-office" class="side-filter-label">All</label></li>`
    const offices = getOffices();
    const moreCategoryOptions = document.createElement("span");
    moreCategoryOptions.classList.add("hide");
    let displayCount=0;

    for(key in offices){
        const categoryOption = document.createElement("li");
        const id = toKebabCase(key);
        categoryOption.innerHTML=`<input type="radio" name="office" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${offices[key]})</label>`
        displayCount+=1;
        if(displayCount<=maxDisplayCount){
            officeFilter.appendChild(categoryOption);
        } else {
            moreCategoryOptions.appendChild(categoryOption);
        }
    }
    
    if(displayCount>maxDisplayCount){
        const viewMore = document.getElementById("office-view-more");
        const viewLess = document.getElementById("office-view-less");
        
        viewMore.classList.remove("hide");
        viewLess.classList.add("hide");
        officeFilter.appendChild(moreCategoryOptions);

        viewMore.addEventListener('click',() => {
            viewMore.classList.add("hide");
            moreCategoryOptions.classList.remove("hide");
            viewLess.classList.remove("hide");
        })

        viewLess.addEventListener('click',() => {
            viewLess.classList.add("hide");
            moreCategoryOptions.classList.add("hide");
            viewMore.classList.remove("hide");
        });
    }
}

function displayJobTitles(){
    jobTitleFilter.innerHTML=`<li><input type="radio" name="jobTitle" class="side-filter-radio" value="" id="all-jobs" checked><label for="all-jobs" class="side-filter-label">All</label></li>`
    const jobTitles = getJobTitles();
    const moreCategoryOptions = document.createElement("span");
    moreCategoryOptions.classList.add("hide");
    let displayCount=0;

    for(key in jobTitles){
        const categoryOption = document.createElement("li");
        const id = toKebabCase(key);
        categoryOption.innerHTML=`<input type="radio" name="jobTitle" class="side-filter-radio" value="${key}" id="${id}"><label for="${id}" class="side-filter-label">${key} (${jobTitles[key]})</label>`
        displayCount+=1;
        if(displayCount<=maxDisplayCount){
            jobTitleFilter.appendChild(categoryOption);
        } else {
            moreCategoryOptions.appendChild(categoryOption);
        }
    }
    
    if(displayCount>maxDisplayCount){
        const viewMore = document.getElementById("job-title-view-more");
        const viewLess = document.getElementById("job-title-view-less");
        
        viewMore.classList.remove("hide");
        viewLess.classList.add("hide");
        jobTitleFilter.appendChild(moreCategoryOptions);

        viewMore.addEventListener('click',() => {
            viewMore.classList.add("hide");
            moreCategoryOptions.classList.remove("hide");
            viewLess.classList.remove("hide");
        })

        viewLess.addEventListener('click',() => {
            viewLess.classList.add("hide");
            moreCategoryOptions.classList.add("hide");
            viewMore.classList.remove("hide");
        });
    }
}

function searchAndFilterEmployees(){
    let employees = getEmployees();
    const keyword = inputSearch.value.trim().toLowerCase();
    const property = propertyFilter.value;
    
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