<script lang="ts">
 import Header from "$lib/Header.svelte";
 import Todo from "../lib/todo";
 import TodoComponent from "../lib/Todo.svelte";
 import {onMount} from "svelte";
 let todos = new Array<Todo>();
 let showDones = true;
 $: dones = getDones(todos);

 onMount(async () => {
     function sortTodos(a: Todo, b: Todo) {
         return a.done > b.done ? 1 : -1;
     }
     const res = await fetch('/api');
     let jsonRes = await res.json()
     todos = jsonRes.todos as Array<Todo>;
     todos = todos.sort(sortTodos);
     // todos = Array.from(todos);
 })

 function getTodo(id: number) {
     for(let i = 0; i < todos.length; i++) {
         if(todos[i].id == id) {
             return todos[i];
         }
     }
     return null;
 }

 function getDones(arr: Array<Todo>) {
     return arr.filter(t => t.done)
 }

 async function deleteTodo(event: CustomEvent) {
     let id = event.detail.id;
     const response = await fetch('/api', {
         method: 'DELETE',
         body: JSON.stringify({id}),
         headers: {
             'content-type': 'applicaton/json'
         }
     });
     if(response.status == 200) {
         todos = todos.filter((t) => t.id != id);
     }
 }

 async function addTodo(event: CustomEvent) {
     let name = event.detail.name;
     const response = await fetch('/api', {
		 method: 'POST',
		 body: JSON.stringify({ text: name}),
		 headers: {
			 'content-type': 'application/json'
		 }
	 });
	 const res = await response.json();
     if(response.status == 200) {
         todos = [new Todo(res.id, name), ...todos];
     }
 }

 async function toggleTodo(ev: CustomEvent) {
     const id = ev.detail.id;
     let todo = getTodo(id);
     if(todo) {
         const response = await fetch('/api', {
             method: 'PUT',
             body: JSON.stringify({id, isChangeText: false, data: !todo.done}),
             headers: {
                 'content-type': 'application/json'
             }
         });

         if(response.status == 200) {
             todo.done = !todo.done;
             if(todo.done) {
                 todos = [...todos.filter(t => t.id != id), todo];
             } else {
                 todos = [todo, ...todos.filter(t => t.id != id)];
             }
         }

     }
 }

 async function renameTodo(ev: CustomEvent) {
     const id = ev.detail.id;
     const name = ev.detail.name;
     let todo = getTodo(id);
     if(todo) {
         const response = await fetch('/api', {
             method: 'PUT',
             body: JSON.stringify({id, isChangeText: true, data: name}),
             headers: {
                 'content-type': 'application/json'
             }
         });

         if(response.status == 200) {
             todos = todos;
         }

     }
 }
</script>

<main class="main">
    <Header suggestions={dones} on:toggleTodo={toggleTodo} on:createTodo={addTodo}/>
    <div class="content">
        {#each todos as todo}
            <TodoComponent todo={todo} on:deleteTodo={deleteTodo} on:toggleTodo={toggleTodo} on:changeText={renameTodo} />
        {/each}
    </div>
</main>

<style>
 .main {
     margin: auto;
     display: flex;
     flex-direction: column;
     justify-content: start;
     height: 100%;
 }

 .content {
     display: flex;
     flex-direction: column;
     height: 100%;
     overflow-y: auto;
     scroll-behavior: auto;
     position: relative;
 }
</style>
