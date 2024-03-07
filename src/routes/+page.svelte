<script lang="ts">
    import Todo from "../lib/todo";
    let todos = new Array<Todo>();
    let dones = new Array<Todo>();

    function addTodo() {
        todos = [...todos, new Todo()];
        console.log(todos)
    }

    function getTodoFromId(id: number) {
        for(let todo of todos) {
            if(todo.id == id) return todo;
        }
        for(let todo of dones) {
            if(todo.id == id) return todo;
        }
        return null;
    }

    function toggleTodo(id: number) {
        let todo = getTodoFromId(id) as Todo;
        todo.done = !todo.done
        if(todo.done) {
            todos = todos.filter((todo) => todo.id != id);
            dones = [...dones, todo]
        } else {
            dones = dones.filter((todo) => todo.id != id);
            todos = [...todos, todo]
        }

    }

    async function storeTodo(message: string) {
        const response = await fetch('/api/addTodo', {
			method: 'POST',
			body: JSON.stringify({ message }),
			headers: {
				'content-type': 'application/json'
			}
		});

		console.log(await response.json());
    }
</script>

<main class="main">
    {#each todos as todo}
    <div class="todo">
        <input class="checkbox" type="checkbox" checked={todo.done} on:click|preventDefault={() => toggleTodo(todo.id)}/>
        <input class="input" bind:value={todo.text} />
    </div>
    {/each}
    <button on:click={() => addTodo()}>Add Todo</button>
    <button on:click={() => storeTodo("Hello")}>Action</button>
    {#each dones as done}
    <div class="todo">
        <input class="checkbox" type="checkbox" checked={done.done} on:click|preventDefault={() => toggleTodo(done.id)}/>
        <p class="input">{done.text}</p>
    </div>
    {/each}
</main>

<style>
    .main {
    width: 80%;
    margin: auto;
        display: flex;
        flex-direction: column;
    }

    .todo {
        display: flex;
        flex-direction: row;
        border: 2px black;
        border-radius: 4px;
        background-color: gray;
        padding: 10px;
        margin: 4px;
    }

    .input {
        border: 0;
        width: 100%;
        background-color: gray;
        border-radius: 3px;
        padding: 10px;
    }

    .checkbox {
        margin: 10px;
    }
</style>