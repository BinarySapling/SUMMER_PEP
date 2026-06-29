let taskList = []


function addTask(){
    let title = document.getElementById("title").value;
    let desc = document.getElementById('desc').value;

    taskList.push({title:title,desc:desc,completed:false});


    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";

    displaytask();
}

function displaytask(){
    let output = "";

    for(let i = 0 ; i < taskList.length ; i++){
        output+=`<div>
            <h3>${taskList[i].completed ? "Done " : ""}${taskList[i].title}</h3>
            <p>${taskList[i].desc}</p>

            <button onclick="completeTask(${i})">
                ${taskList[i].completed ? "Completed" : "Complete"}
            </button>

            <button onclick="deleteTask(${i})">Delete</button>

            <hr>
        </div>`;
    }
    document.getElementById("tasks").innerHTML = output;
}

function completeTask(index){
    taskList[index].completed = true;
    displaytask();
}

function deleteTask(index){
    taskList.splice(index, 1);
    displaytask();
}
    