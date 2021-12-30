// variables to reference HTML
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// create function to create tasks and add them to the to-do list 
var taskFormHandler= function(event) {

    // keeps page from reloading after running this function
    event.preventDefault();
    
    // collect what user inputs as task
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput){
        alert("Please fill out the task form.");
        return false;
    }

    // reset to defaul values once successfully submits a task 
    formEl.reset();

    // package name and type as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl function
    createTaskEl(taskDataObj);
  };

  var createTaskEl = function(taskDataObj){
    // creates new list for html document and adds it to bottom of list
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give taskInfoEl a class name
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add entire item to list 
    tasksToDoEl.appendChild(listItemEl);
  };

formEl.addEventListener("submit", taskFormHandler);