const dataBase_id = "1347221981413695488";
var database_content = {};

function uploadData() {
    axios.put(`https://jsonblob.com/api/jsonBlob/${dataBase_id}`, database_content)
    .then(function(response) {
        console.log("Data uploaded:", response.data);
    })
    .catch(function(error) {
        console.error("Error uploading data:", error);
    });
}

function downloadData() {
    axios.get(`https://jsonblob.com/api/jsonBlob/${dataBase_id}`)
    .then(function(response) {
        console.log("Data downloaded:", response.data);
        database_content = response.data || {};
        displayRoommates();
        displayTodo();
        displayBills();
    })
    .catch(function(error) {
        console.error("Error downloading data:", error);
    });
}

function displayRoommates() {
    let roomates = database_content.roommates || [];
    
    
    const roommatesCard = document.getElementById("roommates");
    roommatesCard.innerHTML = `
        <div class="room-card">
            <h1>Roommates</h1>
            <div>
                <ul id="roommates-list" class="list-group"></ul>
            </div>
            <button type="button" class="btn btn-primary" id="add-roommate" onclick="addRoommate()">Add Roommate</button>
        </div>
    `;
    
    const roommatesList = document.getElementById("roommates-list");

    
    roommatesList.innerHTML = "";
    roomates.forEach(roommate => {
        roommatesList.innerHTML += `
            <li class="list-group-item">${roommate}</li>
            <button type="button" class="btn btn-danger btn-sm float-end" onclick="deleteRoommate(${roomates.indexOf(roommate)})">Delete</button>
        `;
    });
}
function addRoommate() {
    const newRoommate = prompt("Enter roommate name:");
    if (newRoommate) {
        database_content.roommates.push(newRoommate);
        uploadData();
        displayRoommates();
        console.log("Roommate added:", newRoommate);
    }
}
function deleteRoommate(index) {
    database_content.roommates.splice(index, 1);
    uploadData();
    displayRoommates();
    console.log("Roommate deleted:", index);
}

window.onload = function() {
    downloadData(); 
};
function displayTodo() {
    const todoCard = document.getElementById("todo");
    todoCard.innerHTML = `
        <div class="todo-card">
            <h1>Todo List</h1>
            <ol id="todo-list" class="list-group"></ol>
            <input type="text" class="form-control" id="todo-input" placeholder="Add a new todo">
            <button type="button" class="btn btn-primary" id="add-todo" onclick="addTodo()">Add Todo</button>
        </div>
    `;
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    database_content.todos.forEach(todo => {
        todoList.innerHTML += `
            <li class="list-group-item">${todo}</li>
            <button type="button" class="btn btn-success btn-sm" onclick="deleteTodo()">Done</button>
        `;
        });
    }
function addTodo() {
    const newTodo = document.getElementById("todo-input").value;
    
        database_content.todos.push(newTodo);
        uploadData();
        displayTodo();
        console.log("Todo added:", newTodo);
}
function deleteTodo() {
    database_content.todos.splice(todo, 1);
    uploadData();
    displayTodo();
    console.log("Todo deleted:", todo);
}
function displayBills() {
    const billscard = document.getElementById("bills");
    billscard.innerHTML = `
        <div class="bills-Card">
            <h1>Bills</h1>
            <ul id="bills-List" class="list-group"></ul>
            <form>
            <div class="mb-3">
            <input type="text" class="form-control" id="billName-input" placeholder="Enter The Bill Name">
            </div>
            <div class="mb-3">
            <input type="text" class="form-control" id="ammount-input" placeholder="Enter The Ammount">
            </div>
            <button type="button" class="btn btn-primary" id="add-bill" onclick="addBill()">Add Bill</button>
            </form>
        </div>
    `;
    
    const billsList = document.getElementById("bills-List");
    billsList.innerHTML = "";  // Clear previous content

    database_content.bills.forEach((bill, index) => {
        billsList.innerHTML += `
            <li class="list-group-item">${bill}</li>
            <button type="button" class="btn btn-success btn-sm" onclick="deleteBill(${index})">Bill Paid</button>
        `;
    });
}

function addBill() {
    let billName = document.getElementById("billName-input").value;
    let ammount = document.getElementById("ammount-input").value;
    newBill = billName + " - $" + ammount;
    if (newBill) {
        database_content.bills.push(newBill);
        uploadData();
        displayBills();
        console.log("Bill added:", newBill);
    } else {
        console.error("Bill input is empty!");
    }
}

function deleteBill(index) {
    database_content.bills.splice(index, 1);
    uploadData();
    displayBills();
    console.log("Bill deleted:", index);
}
