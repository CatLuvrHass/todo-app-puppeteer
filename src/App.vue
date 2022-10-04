<script setup>
import { ref, onMounted, watch } from 'vue'


const todos = ref([])
const name = ref('')
const input_title = ref('')
const input_content = ref('')
const options = ref(null)

watch(name, (newVal) => {
	localStorage.setItem('name', newVal)
})


watch(todos, (newVal) => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})

const addTodo = () => {
	if (input_title.value.trim() === '' || input_content.value === '') {
		return
	}
	todos.value.push({
		title: input_title.value,
		content: input_content.value,
    option: options.value,
		done: false,
		editable: false,
	})

  input_title.value = ''
  input_content.value = ''
  options.value = null
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}
onMounted(() => {
	name.value = localStorage.getItem('name') || ''
	todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

</script>
  

<template>
  
  <main class="app">
    <section class="greeting">
      <h2 class="title">
        Welcome, ProtexAI.  
      </h2>  
    </section>
    <section class="create-todo">
      <h3>WHAT IS BUGGING YA?</h3>

      <form @submit.prevent="addTodo">
        <h4>What's your bug?</h4>
        <input 
          id="bugTitle"
          type="text" 
          placeholder="faulty button" 
          v-model="input_title" required />  
        
        <h4>Describe the bug</h4>

        <input 
          id="bugDesc"
          type="text" 
          placeholder="Submit button not working" 
          v-model="input_content" required/>  
        <h4>Pick a priority</h4>
          
				<div class="options">

          <label id="priority1">
            <input 
              type="radio" 
              name="priority" 
              value="high-prio"
              v-model="options" />
            <span class="bubble high-prio"></span>
            <div>low</div>
          </label>

          <label id="priority2">
            <input 
              type="radio" 
              name="priority" 
              value="low-prio"
              v-model="options" />
            <span class="bubble low-prio"></span>
            <div>high</div>
          </label>

        </div>

        <input id="add" type="submit" value="Add bug todo" />
      </form>
    </section>

    <section class="todo-list" id="todo-list">
      <h3>TODO LIST</h3>
      
      <div class="list">

        <div id="item" v-for="todo in todos" v-bind:key="todo.done" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input  type="checkbox" v-model="todo.done" />
						<span :class="`bubble ${todo.option}`"></span>
					</label>

					<div class="todo-content">
            <h2 id="texth2">Title:</h2>
            <input class="to-do" type="text" v-model="todo.title"/> 
            <br />
            <h2 id="texth2">Description:</h2>
            <textarea class="to-do" type="text" v-model="todo.content" />
					</div>
					<div class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>

				</div>

			</div>
    </section>

  </main>
  
</template>
