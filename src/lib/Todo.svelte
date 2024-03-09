<script lang="ts">
 import { createEventDispatcher } from 'svelte';
 import IconUnchecked from 'virtual:icons/mdi/checkbox-blank-outline';
 import IconChecked from 'virtual:icons/mdi/checkbox-marked-outline';
 import IconDelete from 'virtual:icons/mdi/delete-forever-outline';
 import IconEdit from 'virtual:icons/mdi/pencil';
 import IconDone from 'virtual:icons/mdi/check';
 import Todo from './todo'
 export let todo: Todo;
 const dispath = createEventDispatcher();
 let isEditing = false;

 function toggle(id: number) {
     dispath("toggleTodo", {
         id: id,
     });
 }

 function deleteTodo(id: number) {
     dispath("deleteTodo", {
         id: id,
     });
 }

 function onEnter(event: KeyboardEvent, id: number) {
     if(event.key == "Enter") {
         changeText(id);
     }
 }

 function changeText(id: number) {
     dispath("changeText",
     {
         id: id,
         name: todo.name,
     });
     isEditing = false;
 }
</script>

<div class="todo">
    <div class="todoText" >
        <div on:click={() => toggle(todo.id)}>
        {#if todo.done}
            <IconChecked style="font-size: 2em; margin: auto; margin-right: 4px;"/>
        {:else}
            <IconUnchecked style="font-size: 2em; margin: auto; margin-right: 4px;"/>
        {/if}
        </div>
        {#if !isEditing}
        <p style="font-size: 2em; width: 100%;">{todo.name}</p>
        {:else}
        <input style="font-size: 2em; width: 100%;" bind:value={todo.name} on:keydown={(k) => onEnter(k, todo.id)}/>
        {/if}
    </div>
    <div class="buttons">
        {#if isEditing}
        <button on:click={() => changeText(todo.id)}>
            <IconDone style="font-size: 2em;"/>
        </button>
        {:else}
        <button on:click={() => isEditing = true}>
            <IconEdit style="font-size: 2em;"/>
        </button>
        {/if}
        <button on:click={() => deleteTodo(todo.id)}>
            <IconDelete style="font-size: 2em;"/>
        </button>
    </div>
</div>

<style>
 .todo {
     display: flex;
     position: relative;
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

</style>
