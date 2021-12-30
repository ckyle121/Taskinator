// variables to reference HTML
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// create function to create tasks and add them to the to-do list 
var createTaskHandler = function(event) {

    // keeps page from reloading after running this function
    event.preventDefault();
    
    // collect what user inputs as task
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // creates new list for html document and adds it to bottom of list
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give taskInfoEl a class name
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add entire item to list 
    tasksToDoEl.appendChild(listItemEl);
  };

formEl.addEventListener("submit", createTaskHandler);