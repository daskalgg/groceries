<script lang="ts">
 import IconShoppingCart from 'virtual:icons/mdi/shopping-cart-outline';
 import IconAdd from 'virtual:icons/mdi/add';
 import { createEventDispatcher } from 'svelte';
 import type Todo from './todo';
 import Fuse from 'fuse.js';

 let newTodoText = "";
 export let suggestions: Array<Todo>;
 $: fuse = new Fuse(suggestions, {
     // The algorithms to use for fuzzy matching.
     algorithms: ["levenshtein", "jaro-winkler"],
     // The minimum similarity score required for a match.
     minScore: 70,
     keys: [
         'name',
     ],
 });
 $: filteredSuggestions = newTodoText == "" ? suggestions : fuse.search(newTodoText).map(s => s.item);

 let dialogOpen = false;
 let suggestionIndex = -1;

 const dispath = createEventDispatcher();

 function createTodo() {
     dispath("createTodo", {
         name: newTodoText,
     });
     newTodoText = "";
 }

 function toggleTodo(id: number) {
     dispath("toggleTodo", {
         id: id,
     });
     newTodoText = "";
 }

 function toggleDialog() {
     dialogOpen = !dialogOpen;
 }

 function bound() {
     if(suggestionIndex >= filteredSuggestions.length) {
         suggestionIndex = 0;
     } else if(suggestionIndex < 0) {
         suggestionIndex = filteredSuggestions.length - 1;
     }
 }

 function alreadyDone() {
     let done = suggestions.filter(s => s.name == newTodoText);
     if(done.length > 0) {
         return done[0].id;
     }
     return null;
 }

 function keyDown(ev: KeyboardEvent)
 {
     if(ev.code == 'Enter') {
         let id = alreadyDone();
         if(id) {
             toggleTodo(id);
         } else {
             createTodo()
         }

     }
 }
</script>

<div class="header">
    <div class="icon">
        <IconShoppingCart style="font-size: 50px;" />
        <h2>Groceries</h2>
    </div>
    <div class="insert">
        <input list="suggestions" class="insertText" on:focusout={() => {dialogOpen = false;}} on:focusin={() => {dialogOpen = true;}} bind:value={newTodoText} on:keydown={(ev) => keyDown(ev)} />
        <datalist id="suggestions">
            {#each filteredSuggestions as suggestion}
                <option value="{suggestion.name}">
            {/each}
        </datalist>
        <button on:click={() => createTodo()} class="button">
            <IconAdd style="color:white;"></IconAdd>
        </button>
    </div>
</div>

<style>
 .header {
     display: flex;
     flex-direction: column;
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

 .icon {
     display: flex;
     color: white;
     font-size: 40px;
     margin: auto;
     margin-bottom: 8px;
 }

 .dialog {
     width: 80%;
     background-color: white;
     margin: auto;
     height: 100px;
     overflow: scroll;
     z-index: 10;
     top: 120px;
     border-radius: 10px;
     margin: 5px;
     position: absolute;
     padding: 10px;
 }

 .selected {
     background-color: lightyellow;
 }
</style>

<!--
     {#if dialogOpen}
     <div class="dialog">
     {#each filteredSuggestions as suggestion, i}
	 <p class={suggestionIndex == i? "selected": ""} on:click={() => {suggestionIndex = i}}>{suggestion.name}</p>
     {/each}
     </div>
     {/if} -->
