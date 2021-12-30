// variables to reference HTML
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// create function to create tasks and add them to the to-do list 
var createTaskHandler = function(event) {

    // keeps page from reloading after running this function
    event.preventDefault();
    
    // creates new list for html document and adds it to bottom of list
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  };

formEl.addEventListener("submit", createTaskHandler);