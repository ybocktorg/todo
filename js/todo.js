let createForm = document.querySelector("#itemCreateForm");
let inputTxt = document.querySelector("#inputTxt");
let list = document.querySelector("#toDoList");
let listItems = document.querySelectorAll("#toDoList li");
let items=[];
let itemsObj=[];
let toDoObj={};
let statusDefault= "active"
let status="active";
let liElem;
let appHeaderMsg = document.querySelector("#msg");
let editInputs
let currEditInput

window.onload = function(){
    display();
    inputTxt.focus();
}
function display(){
    if(localStorage.getItem("todoObjS") != null){
        //let itemsToDisplay = JSON.parse(localStorage.getItem("toDoObj"))
                    // <input type="text" value="${itemsObj[i].todoItem}" id="editInput">
            // <button onclick="updateItem(this,${i})" class="save material-icons">save</button>
        itemsObj=  JSON.parse(localStorage.getItem("todoObjS"))
        for (var i = itemsObj.length-1; i >= 0 ; i--){
            list.innerHTML += `<li class="${itemsObj[i].status=='active'? 'active' : 'inactive'}">
            <span class="item" onclick="statusSwitch(this,${i})"> ${itemsObj[i].todoItem}</span>
            <button class="edit material-icons" onclick="editItem(this,${i})">mode_edit</button> 
            <button class="delete material-icons" onclick="delItem(this,${i})">delete_forever</button></li>`;
            
        }
    }
}

createForm.addEventListener('submit', (e)=>{
e.preventDefault();

if(inputTxt.value.trim() !=''){
createItem(inputTxt.value);
inputTxt.value = '';
inputTxt.focus();
appHeaderMsg.style.display = "none";
}

else {
    appHeaderMsg.style.display = "block";
    inputTxt.value = "";
    inputTxt.focus();
}

})

function createItem(x){
    
toDoObj={
    "todoItem":x,
    "status":statusDefault
}

if(localStorage.getItem("todoObjS") != null){
    itemsObj = JSON.parse(localStorage.getItem("todoObjS"))
    itemsObj.push(toDoObj)
    localStorage.setItem("todoObjS", JSON.stringify(itemsObj))
    }
    else{
        itemsObj.push(toDoObj)
        localStorage.setItem("todoObjS", JSON.stringify(itemsObj))
    }

list.innerHTML = '';
display();
document.querySelector("#toDoList").scroll({
    top: 0,
    behavior: 'smooth'
  });
}

function delItem(item, index){
    let del = confirm("Confirm delete");
    if(del){
    itemsObj = JSON.parse(localStorage.getItem("todoObjS"))
    itemsObj.splice(index, 1)
    localStorage.setItem("todoObjS", JSON.stringify(itemsObj))
    list.innerHTML = '';
    display();
}
}

function statusSwitch(item, index){
    liElem = item.parentElement;
    console.log(liElem)
    if(liElem.classList =="active"){
        liElem.classList.remove("active")
        liElem.classList.add("inactive")
        itemsObj = JSON.parse(localStorage.getItem("todoObjS"))
        status = "inactive"
        itemsObj[index].status = status
        localStorage.setItem("todoObjS", JSON.stringify(itemsObj))
    }
    else{
        liElem.classList.remove("inactive")
        liElem.classList.add("active")
        itemsObj = JSON.parse(localStorage.getItem("todoObjS"))
        status = "active"
        itemsObj[index].status = status
        localStorage.setItem("todoObjS", JSON.stringify(itemsObj))
    }
}

function countEditInputs() {
    editInputs = document.querySelectorAll("#editInput");
    return editInputs.length;
}

function editItem(item, index){
    countEditInputs()

    console.log(countEditInputs());
    liElem = item.parentElement;
    

    if(editInputs.length <1){
    
    liElem.querySelector(".edit").style.display = "none";
    liElem.querySelector(".item").style.display = "none";
    liElem.insertAdjacentHTML("afterbegin", `<input type="text" value="${itemsObj[index].todoItem}" id="editInput">
    <button onclick="updateItem(this,${index})" class="save material-icons" autofocus=true>save</button>`);
    currEditInput = liElem.querySelector("#editInput")
    //console.log(currEditInput)
    currEditInput.focus();
}
else {
    alert ("Save the other task (item) first");
}

}

function updateItem(item, index){
    liElem = item.parentElement;
        itemsObj = JSON.parse(localStorage.getItem("todoObjS"))
        itemsObj[index].todoItem = liElem.querySelector("#editInput").value;
        console.log(liElem.querySelector("#editInput").value);
        localStorage.setItem("todoObjS", JSON.stringify(itemsObj))
        liElem.querySelector(".edit").style.display = "block";
        liElem.querySelector(".item").style.display = "block";
    
        liElem.querySelector("#editInput").style.display = "none";
        liElem.querySelector(".save").style.display = "none";
        list.innerHTML = '';
        display();
}

// Nader is writing his code