// variables to reference HTML
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

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

    // add task id as custom attribute 
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give taskInfoEl a class name
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire item to list 
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id 
    taskIdCounter++;
  };

  // create function to delete or edit task once it has been created
  var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);

    // add edit button to action container
    actionContainerEl.appendChild(editButtonEl);

    // create delete button 
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    // add delete button to the action container
    actionContainerEl.appendChild(deleteButtonEl);

    // add select dropdown menu
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // add to div
    actionContainerEl.appendChild(statusSelectEl);

    // loop through choices for option elements
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++){
        // create option element
        var statusOptionEl  = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
  };

formEl.addEventListener("submit", taskFormHandler);