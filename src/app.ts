import {HttpClient, json} from 'aurelia-fetch-client';

interface Todo{
  description: string;
  done: boolean;
}

export class App {
  heading = "Todos";
  todos: Todo[] = [];
  todoDescription = '';

  loadTodo(){
    fetch('http://localhost:8081/api/todos')
      .then(response => response.json())
      .then(data => {
        data.forEach(function (it) {
          this.todos.push(it)
          console.log(it)
        }.bind(this))
      });
  }

  addTodo() {
    if (this.todoDescription) {
      this.todos.push({
        description: this.todoDescription,
        done: false
      });
      const currentEntry = this.todos[this.todos.length-1]
      var raw = JSON.stringify({"done":currentEntry.done,"description":currentEntry.description});

      fetch('http://localhost:8081/api/todos', {
        method:'POST',
        headers: {
          "Content-type":"application/json"
        },
        body:raw
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
      this.todoDescription = '';
    }
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

      fetch(`http://localhost:8081/api/${index}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }
}
