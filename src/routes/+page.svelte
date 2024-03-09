<script lang="ts">
 import Header from "$lib/Header.svelte";
 import Todo from "../lib/todo";
 import TodoComponent from "../lib/Todo.svelte";
 import {onMount} from "svelte";
 let todos = new Array<Todo>();
 $: dones = getDones(todos);

 onMount(async () => {
     const res = await fetch('/api');
     let jsonRes = await res.json()
     todos = jsonRes.todos as Array<Todo>;
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

 async function addTodo(event: CustomEvent) {
     let name = event.detail.name;
     const response = await fetch('/api/addTodo', {
		 method: 'POST',
		 body: JSON.stringify({ text: name}),
		 headers: {
			 'content-type': 'application/json'
		 }
	 });
	 const res = await response.json();
     todos = [...todos, new Todo(res.id, name)];
 }

 async function toggleTodo(ev: CustomEvent) {
     let todo = getTodo(ev.detail.id);
     if(todo) {
         todo.done = !todo.done;
     }
     todos = Array.from(todos);
 }
</script>

<main class="main">
    <Header suggestions={dones} on:toggleTodo={toggleTodo} on:createTodo={addTodo}/>
    <div class="content">
        {#each todos as todo}
            <TodoComponent todo={todo} on:toggleTodo={toggleTodo} />
        {/each}
    </div>
</main>

<style>
 .main {
     margin: auto;
     display: flex;
     flex-direction: column;
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
