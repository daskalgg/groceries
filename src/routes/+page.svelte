<script lang="ts">
    import Todo from "../lib/todo";
    import IconShoppingCart from 'virtual:icons/mdi/shopping-cart-outline';
    import IconAdd from 'virtual:icons/mdi/add';
    let newTodoText = "";
    let todos = new Array<Todo>();
    let dones = new Array<Todo>();

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
    {#each todos as todo}
    <div class="todo">
       <p>{todo.text}</p> 
    </div>
    {/each}
</main>

<style>
    .main {
    margin: auto;
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        background-color: lightcoral;
        padding: 20px;
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
</style>