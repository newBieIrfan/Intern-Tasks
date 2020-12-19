const modal = document.getElementById("modal-form");
const addEmployeeBtn = document.getElementById("add-employee-btn");
const span = document.getElementById("close");
const addForm = document.getElementById("employee-add-form");
const editForm = document.getElementById("employee-edit-form");
const modalDiv = document.getElementById("modal-div");
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
    createAddForm();

    displayAlphabetSearchDiv();

    const employees = getEmployees();
    displayEmployees(employees);
    displayDepartments();
    displayOffices();
    displayJobTitles();
});

addEmployeeBtn.addEventListener('click',(e) => {
    modal.style.display = "block";
    addForm.style.display = "block";
    editForm.style.display = "none";
    modalDiv.style.display = "none";

});

span.addEventListener('click',() => {
  modal.style.display = "none";
});

window.addEventListener('click',(event) => {
    if (event.target == modal) {
        modal.style.display = "none";
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
    if (validateNameString(firstName).length !== 0){
        // console.log(validateNameString(firstName))
        const p = document.getElementById("firstname-error");
        p.style.display="block";
        p.innerText=`${validateNameString(firstName)}`;
        addForm.firstName.value = firstName;
        // errMessage(p,validateNameString(firstName));
        flag=false;
    } else{
        document.getElementById("firstname-error").style.display="none";
    }
    if (validateNameString(lastName).length !== 0){
        // console.log(validateNameString(firstName))
        const p = document.getElementById("lastname-error");
        p.style.display="block";
        p.innerText=`${validateNameString(lastName)}`;
        addForm.lastName.value = lastName;
        flag=false;
    } else{
        document.getElementById("lastname-error").style.display="none";
    }
    if (validateEmail(email).length !== 0){
        const p = document.getElementById("email-error");
        p.style.display="block";
        p.innerText=`${validateEmail(email)}`;
        addForm.email.value = email;
        flag=false;
    } else{
        document.getElementById("email-error").style.display="none";
    }
    if(phoneNumber.length>0 && phoneNumber.length !== 10){
        document.getElementById("phone-no-error").style.display="block";
        addForm.phoneNumber.value = phoneNumber;
        flag=false;
    } else{
        document.getElementById("phone-no-error").style.display="none";
    }
    if(skypeId.length>0 && validateSkypeId(skypeId).length !== 0){
        const p = document.getElementById("skype-id-error");
        p.style.display="block";
        p.innerText=`${validateSkypeId(skypeId)}`;
        addForm.skypeId.value = skypeId;
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
        modal.style.display="none";
    }

});

addForm.addEventListener('reset',(e) => {
    document.getElementById("firstname-error").style.display="none";
    document.getElementById("lastname-error").style.display="none";
    document.getElementById("email-error").style.display="none";
    document.getElementById("phone-no-error").style.display="none";
    document.getElementById("skype-id-error").style.display="none";
})

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

    if(employees.length===0){
        employeeGrid.innerHTML=`<h4>Sorry, no results found!</h4>`
    } else {
        let name;
        employees.forEach(employee => {
            const employeeDiv = document.createElement('div');
            employeeDiv.classList.add("employee-div");
    
            const hiddenDiv = document.createElement('div');
            hiddenDiv.id=employee.id;
            hiddenDiv.classList.add("hidden-div");
            // hiddenDiv.innerText = "hiddenDiv"
            hiddenDiv.addEventListener('click',e => {
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
}

function displayEmployeeDetails(employeeId){
    modal.style.display="block";
    addForm.style.display="none";
    editForm.style.display="none";
    modalDiv.style.display="block";

    let employees = getEmployees();
    employees = employees.filter(employee => {
        return employee.id === employeeId;
    })
    const employee = employees[0]
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
                                <p class="property-value"><i class="fab fa-skype property-name"></i>${employee.skypeId || "not provided"}</p>
                                <p class="property-value"><i class="fas fa-phone-square-alt property-name" aria-hidden="true"></i></i>${employee.phoneNumber || "not provided"}</p>
                            </div>
                        </div>`
    const editBtn = document.createElement("button")
    editBtn.innerText="Edit"
    editBtn.classList.add("blue-btn");
    editBtn.classList.add("form-btn");
    editBtn.addEventListener('click', () => {
        createEditForm(employee);
    });
    modalDiv.appendChild(editBtn);
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
    addForm.jobTitle.innerHTML="";
    addForm.department.innerHTML="";
    addForm.office.innerHTML="";

    let c=1;
    for(key in getJobTitles()){
        if(c===1){
            addForm.jobTitle.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            c+=1;
        } else {
            addForm.jobTitle.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    
    c=1;
    for(key in getDepartments()){
        if(c===1){
            addForm.department.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            c+=1;
        } else {
            addForm.department.innerHTML+=`<option value="${key}">${key}</option>`;
        }
    }
    
    c=1;
    for(key in getOffices()){
        if(c===1){
            addForm.office.innerHTML+=`<option value="${key}" selected>${key}</option>`;
            c+=1;
        } else {
            addForm.office.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
}

function createEditForm(employee){
    modal.style.display="block";
    editForm.style.display="block";
    addForm.style.display="none";
    modalDiv.style.display="none";

    editForm.jobTitle.innerHTML="";
    editForm.office.innerHTML="";
    editForm.department.innerHTML="";

    editForm.firstName.value = employee.firstName;
    editForm.lastName.value = employee.lastName;
    editForm.email.value = employee.email;
    editForm.phoneNumber.value = employee.phoneNumber;
    editForm.skypeId.value = employee.skypeId;
    
    for(key in getJobTitles()){
        if(key === employee.jobTitle){
            editForm.jobTitle.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            editForm.jobTitle.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    for(key in getDepartments()){
        if(key === employee.department){
            editForm.department.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            editForm.department.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }
    for(key in getOffices()){
        if(key === employee.office){
            editForm.office.innerHTML+=`<option value="${key}" selected>${key}</option>`
        } else{
            editForm.office.innerHTML+=`<option value="${key}">${key}</option>`
        }
    }

    document.getElementById("editform-firstname-error").style.display="none";
    document.getElementById("editform-lastname-error").style.display="none";
    document.getElementById("editform-email-error").style.display="none";
    document.getElementById("editform-phone-no-error").style.display="none";
    document.getElementById("editform-skype-id-error").style.display="none";

    editForm.onsubmit = (e) => {
        e.preventDefault();
        editEmployee(employee.id);
    };

    editForm.onreset = (e)=>{
        e.preventDefault();
        displayEmployeeDetails(employee.id);
    };
}

function editEmployee(id){
    let employees = getEmployees();

    let firstName = editForm.firstName.value.trim();
    let lastName = editForm.lastName.value.trim()
    let email = editForm.email.value.trim();
    let jobTitle = editForm.jobTitle.value.trim();
    let office = editForm.office.value.trim();
    let department = editForm.department.value.trim();
    let phoneNumber = editForm.phoneNumber.value.trim();
    let skypeId = editForm.skypeId.value.trim();
    
    let flag=true;
    if (validateNameString(firstName).length !== 0){
        // console.log(validateNameString(firstName))
        const p = document.getElementById("editform-firstname-error");
        p.style.display="block";
        p.innerText=`${validateNameString(firstName)}`;
        // errMessage(p,validateNameString(firstName));
        editForm.firstName.value = firstName;
        flag=false;
    } else{
        document.getElementById("editform-firstname-error").style.display="none";
    }
    if (validateNameString(lastName).length !== 0){
        // console.log(validateNameString(firstName))
        const p = document.getElementById("editform-lastname-error");
        p.style.display="block";
        p.innerText=`${validateNameString(lastName)}`;
        editForm.lastName.value = lastName;
        flag=false;
    } else{
        document.getElementById("editform-lastname-error").style.display="none";
    }
    if (validateEmail(email).length !== 0){
        const p = document.getElementById("editform-email-error");
        p.style.display="block";
        p.innerText=`${validateEmail(email)}`;
        editForm.email.value = email;
        flag=false;
    } else{
        document.getElementById("editform-email-error").style.display="none";
    }
    if(phoneNumber.length>0 && phoneNumber.length !== 10){
        document.getElementById("editform-phone-no-error").style.display="block";
        editForm.phoneNumber.value = phoneNumber;
        flag=false;
    } else{
        document.getElementById("editform-phone-no-error").style.display="none";
    }
    if(skypeId.length>0 && validateSkypeId(skypeId).length !== 0){
        const p = document.getElementById("editform-skype-id-error");
        p.style.display="block";
        p.innerText=`${validateSkypeId(skypeId)}`;
        editForm.skypeId.value = skypeId;
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