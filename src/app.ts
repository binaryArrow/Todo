
interface Todo{
  id: number
  description: string
  done: boolean
}

export class App {
  heading = "Todos"
  todos: Todo[] = []
  todoDescription = ''


  loadTodo(){
    fetch('http://localhost:8080/api/todos')
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

      fetch('http://localhost:8080/api/todos', {
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

  // TODO: edit, so if the todo is marked done, it's done property is true
  changeTodo(todo){
      const requestOptions = {
      method: 'PUT',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({"done":todo.done, "description":todo.description})
    };

    fetch(`http://localhost:8080/api/todos/${todo.id}`, requestOptions)
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

      fetch(`http://localhost:8080/api/todos/${todo.id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }
}
