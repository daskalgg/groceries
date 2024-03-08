<script lang="ts">
 import Todo from "../lib/todo";
 import IconShoppingCart from 'virtual:icons/mdi/shopping-cart-outline';
 import IconAdd from 'virtual:icons/mdi/add';
 import IconUnchecked from 'virtual:icons/mdi/checkbox-blank-outline';
 import IconChecked from 'virtual:icons/mdi/checkbox-marked-outline';
 import IconDelete from 'virtual:icons/mdi/delete-forever-outline';
 import IconEdit from 'virtual:icons/mdi/pencil';
 import {onMount} from "svelte";
 let newTodoText = "";
 let todos = new Array<Todo>();

 onMount(async () => {
     const res = await fetch('/api');
     let jsonRes = await res.json()
     todos = jsonRes.todos as Array<Todo>;
     // let newTodos: Array<Todo> = [];
     // for(let todo of jsonRes.todos) {
     //     let t = new Todo(todo.id, todo.name);
     //     if(todo.done) t.done = true;
     //     newTodos.push(t);
     // }
     // todos = newTodos;
     console.log(todos);
 })

 function getTodo(id: number) {
     for(let i = 0; i < todos.length; i++) {
         if(todos[i].id == id) {
             return todos[i];
         }
     }
     return null;
 }

 async function addTodo() {
     const response = await fetch('/api/addTodo', {
		 method: 'POST',
		 body: JSON.stringify({ text: newTodoText }),
		 headers: {
			 'content-type': 'application/json'
		 }
	 });
	 const res = await response.json();
     todos = [...todos, new Todo(res.id, newTodoText)];
     newTodoText = "";
 }

 async function clickTodo(id: number) {
     console.log("CLICKED", id);
     let todo = getTodo(id);
     if(todo) {
         todo.done = !todo.done;
     }
     todos = todos;
 }
</script>

<main class="main">
    <div class="header">
        <div class="insert">
            <input class="insertText" bind:value={newTodoText} on:keydown={(k) => {if(k.code == 'Enter') addTodo()}} />
            <button on:click={() => addTodo()} class="button">
                <IconAdd style="color:white;"></IconAdd>
            </button>
        </div>
    </div>
    <div class="content">
    {#each todos as todo}
        <div class="todo">
            <div class="todoText"  on:click={() => clickTodo(todo.id)}>
            {#if todo.done}
                <IconChecked style="font-size: 2em;"/>
            {:else}
                <IconUnchecked style="font-size: 2em;"/>
            {/if}
            <p style="font-size: 2em; width: 100%;">{todo.name}</p>
            </div>
            <div class="buttons">
                <button>
                    <IconEdit style="font-size: 2em;"/>
                </button>
                <button>
                    <IconDelete style="font-size: 2em;"/>
                </button>
            </div>
        </div>
    {/each}
    </div>
</main>

<style>
 .main {
     margin: auto;
     display: flex;
     flex-direction: column;
 }

 .content {
     display: flex;
     flex-direction: column;
     overflow-y: scroll;
     scroll-behavior: auto;
 }

 .header {
     display: flex;
     background-color: lightcoral;
     padding: 20px;
 }

 .todo {
     display: flex;
     width: 90%;
     margin: auto;
     padding: 7px;
     margin-top: 8px;
     border-radius: 10px;
     background-color: bisque;
 }

 .todoText {
     display: flex;
     flex-grow: 1;
 }

 .buttons {
     display: flex;
 }

 .insert {
     display: flex;
     margin: auto;
     width: 60%;
 }

 .insertText {
     padding: 5px;
     flex-grow: 1;
     border-radius: 4px;
 }

 .button {
     background-color: lightseagreen;
     margin-left: 5px;
     padding: 4px;
     border-radius: 4px;
 }

 .icon {
     font-size: 2em;
 }
</style>
