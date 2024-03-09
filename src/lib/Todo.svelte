<script lang="ts">
 import { createEventDispatcher } from 'svelte';
 import IconUnchecked from 'virtual:icons/mdi/checkbox-blank-outline';
 import IconChecked from 'virtual:icons/mdi/checkbox-marked-outline';
 import IconDelete from 'virtual:icons/mdi/delete-forever-outline';
 import IconEdit from 'virtual:icons/mdi/pencil';
 import Todo from './todo'
 export let todo: Todo;
 const dispath = createEventDispatcher();

 function toggle(id: number) {
     dispath("toggleTodo", {
         id: id,
     });
 }
</script>

<div class="todo">
    <div class="todoText"  on:click={() => toggle(todo.id)}>
        {#if todo.done}
            <IconChecked style="font-size: 2em; margin: auto; margin-right: 4px;"/>
        {:else}
            <IconUnchecked style="font-size: 2em; margin: auto; margin-right: 4px;"/>
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
