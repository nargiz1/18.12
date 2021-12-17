"use strict"
let addTask= document.querySelector("#myBtn");
let myTextInput=document.querySelector("#myTextInput");
let myDateInput=document.querySelector("#myDateInput");
let tasksWrapper = document.querySelector("#taskWrapper");
let deleteAllBtn= document.querySelector("#delete-all");
let deleteSelectedBtn= document.querySelector("#delete-selected");

if(localStorage.getItem("data")){
        let dataToChoose=JSON.parse(localStorage.getItem("data"));
        if(dataToChoose.length!=0){
            for (const item of dataToChoose){
                createTask(item);
            }      
            
            deleteSelectedBtn.classList.remove("d-none");
            deleteAllBtn.classList.remove("d-none");
        }
        localStorage.setItem("data", JSON.stringify(dataToChoose));
}
else{
    localStorage.setItem("data", JSON.stringify([]));
}

addTask.addEventListener("click", function() {
    AddTask(); 
})

deleteAllBtn.addEventListener("click", function(){
    DeleteAll();
})

deleteSelectedBtn.addEventListener("click", function(){
    DeleteSelected();
})

document.addEventListener("keyup", function(e){
    if(e.keyCode==13){
        AddTask();
    }
    if(e.keyCode==8 && this.querySelector(".list-group-item.active")){
        DeleteSelected();
    }
    else if(e.keyCode==8 && !this.querySelector(".list-group-item.active")){
        DeleteAll();
    }
})

function AddTask(){
    let textValue=myTextInput.value.trim();
    let dateValue=myDateInput.value;
    myDateInput.value="";
    myTextInput.value="";

    if((textValue=="" || dateValue=="")){
        alert("Cannot create empty task");
        return;
    }

    let d1= new Date(dateValue);
    let d2= new Date();

    let obj={
        task: textValue,
        date: (msToMin(d1 - d2) + " minutes left."),
    }

    let dataArr= JSON.parse(localStorage.getItem("data"));
    dataArr.push(obj);

    localStorage.setItem("data", JSON.stringify(dataArr));

    createTask(obj);

    deleteSelectedBtn.classList.remove("d-none");
    deleteAllBtn.classList.remove("d-none");
}

function msToMin(time) {
    return Math.round(time / 60000);
}

function createTask(item){
    let newLi=document.createElement("li");
    newLi.classList.add("list-group-item");
    newLi.innerText=item.task;
    newLi.addEventListener("click", function(){
        if(newLi.classList.contains("active")){
            newLi.classList.remove("active");
        }else{
            newLi.classList.add("active");
        }
    })

    let newSpan=document.createElement("span");
    newSpan.classList.add("badge", "bg-danger", "text-light")
    newSpan.innerText=item.date;

    newLi.append(newSpan);
    tasksWrapper.append(newLi);
}

function DeleteAll(){
    tasksWrapper.innerHTML="";
    deleteSelectedBtn.classList.add("d-none");
    deleteAllBtn.classList.add("d-none");
    localStorage.setItem("data", JSON.stringify([]));
}

function DeleteSelected(){
    let itemToDelete=JSON.parse(localStorage.getItem("data"));
    for (const task of document.querySelectorAll(".list-group-item.active")) {
        task.remove();
        for(const item of itemToDelete){
            if(task.innerText==(item.task+item.date)){
                itemToDelete==itemToDelete.splice(itemToDelete.indexOf(item), 1);
                console.log(itemToDelete.indexOf(item))
            }
        }
    }

    localStorage.setItem("data", JSON.stringify(itemToDelete));

    if(document.querySelectorAll(".list-group-item").length==0){
        deleteSelectedBtn.classList.add("d-none");
        deleteAllBtn.classList.add("d-none");
    }
}