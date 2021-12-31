// variables to reference HTML
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

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

    // check if data has attribute of task in order to edit
    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };
  
    createTaskEl(taskDataObj);
  }
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

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks();

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


var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    // edit button was clicked
    if (targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event){
    // get the task item's id 
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase 
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // pass through taskSelected to put in appropriate column
    if (statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update taks's in tasks array 
    for(var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    }

    // save to local storage 
    saveTasks();
};


// create function to edit task
var editTask = function(taskId){

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // update submit button to say "Save Task"
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var completeEditTask = function(taskName, taskType, taskId) {
    // find matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values 
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName; 
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated.");

    // save to local storage 
    saveTasks();

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };

// create function to delete task 
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold upated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++){
        // if tasks[i].id doesn't match the value of taskId, keep the task
        if (tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updated tasks array 
    tasks = updatedTaskArr

    // save to local storage 
    saveTasks();
  };

// create function to save data to local storage
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// create function to load data from local storage
var loadTasks = function(){
    // get task items from local storage
    tasks = localStorage.getItem("tasks");

    // check if tasks are empty (no tasks are in local storage)
    if (tasks === null){
        tasks = [];
        return false;
    }

    // convert tasks from string back into array of objects
    tasks = JSON.parse(tasks);
    
    // print task items on the page 
    for (var i = 0; i < tasks.length; i++){
        tasks[i] = taskIdCounter

        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        listItemEl.setAttribute("data-task-id", tasks[i].id);

        var taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info"
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
        listItemEl.appendChild(taskInfoEl);

        var taskActionsEl = createTaskActions(tasks[i].id);
        listItemEl.appendChild(taskActionsEl);

        if (tasks[i].status === "to-do"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.appendChild(listItemEl);
        }

        else if (tasks[i].status === "in progress"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.appendChild(listItemEl);
        }

        else if (tasks[i].status === "complete"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.appendChild(listItemEl);
        }

        taskIdCounter++
    }
};

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();