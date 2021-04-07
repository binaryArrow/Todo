export class Todo {
  heading = "Todos"
  todos: Todo[] = []
  todoDescription = ''
  path = 'http://localhost:8080'

  loadTodo(){
    fetch(`${this.path}/api/todos`)
      .then(response => response.json())
      .then(data => {
        data.forEach(function (it) {
          this.todos.push(it)
          console.log(it)
        }.bind(this))
      });
    console.log(this.todos)
  }

  addTodo() {
    if (this.todoDescription) {
      const raw = JSON.stringify({"done":false,"description":this.todoDescription});

      fetch(`${this.path}/api/todos`, {
        method:'POST',
        headers: {
          "Content-type":"application/json"
        },
        body:raw
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.todos.push(data)
        } )
      this.todoDescription = '';
    }
  }

  changeTodo(todo){
    const requestOptions = {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({"done":todo.done, "description":todo.description})
    };

    fetch(`${this.path}/api/todos/${todo.id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    console.log(todo)
  }


  removeTodo(todo) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"done":todo.done,"description":todo.description})
    };

    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1)

      fetch(`${this.path}/api/todos/${todo.id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }
}
