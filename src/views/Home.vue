<template>
	<h1>Home</h1>
	<div class="my-3" v-if="errors">
		<div
			class="alert alert-danger"
			v-for="(error, index) in errors"
			:key="index"
		>
			{{ error.msg }}
		</div>
	</div>
	<AddTodo />
	<div class="my-2">
		<Todo v-for="todo in todos" :key="todo._id" :todo="todo" />
	</div>
	<div>
		<pre>{{ todos }}</pre>
	</div>
	<div v-if="user">
		<pre>{{ user }}</pre>
	</div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import AddTodo from "../components/AddTodo.vue";
import Todo from "../components/Todo.vue";

export default {
	components: { AddTodo, Todo },
	setup() {
		const store = useStore();

		onMounted(async () => {
			await store.dispatch("moduleTodo/getTodos");
		});

		const user = computed(() => store.state.moduleAuth.user);
		const todos = computed(() => store.state.moduleTodo.todos);
		const errors = computed(() => store.state.moduleTodo.errors);

		return {
			user,
			todos,
			errors,
		};
	},
};
</script>