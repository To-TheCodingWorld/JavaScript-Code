let todoList = [
  {
    item:'BCREC',
    dueDate : '4/10/2025'
  }, 
  {
    item:'BCA',
    dueDate : '5/10/2025'
  }, 
  {
    item:'MCA',
    dueDate : '15/10/2025'
  },
  
];

displayItems();

function addTodo() {
  let inputElement = document.querySelector("#todo-input");
  let dateElement = document.querySelector("#todo-date");
  let todoItem = inputElement.value ;
  let todoDate = dateElement.value;
  
  if (!todoItem || !todoDate) {
    alert("Please enter both item and due date.");
    return;
  }

  todoList.push({item : todoItem,dueDate : todoDate});
  localStorage.setItem("todoList", JSON.stringify(todoList));
  alert(`Your item : ${todoItem.toUpperCase()} has been added successfully`);
  inputElement.value = " ";
  dateElement.value = " ";
  let savedTodos = localStorage.getItem("todoList");
  todoList = savedTodos ? JSON.parse(savedTodos) : [];

  displayItems();
}

function displayItems() {
  let containerElement = document.querySelector(".todo-container");

  let newhtml = ' ';
  
  for (let i = 0; i < todoList.length; i++) {
    // let item = todoList[i].item;
    // let date = todoList[i].dueDate;
    let {item , dueDate }= todoList[i];
        
    newhtml += ` 
    
    <span><li><b>${item.toUpperCase()}</b></li></span>
    <span><b>:</b> ${dueDate}</span>
    <button class="delete-btn" onclick="todoList.splice(${i},1) 
    alert('Your item : ${item.toUpperCase()} has been deleted successfully');
    displayItems();">Delete</button>
    
    `;
  }
  containerElement.innerHTML = newhtml;
}

