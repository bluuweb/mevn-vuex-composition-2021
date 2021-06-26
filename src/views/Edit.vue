<template>
	<div class="my-3" v-if="errors">
		<div
			class="alert alert-danger"
			v-for="(error, index) in errors"
			:key="index"
		>
			{{ error.msg }}
		</div>
	</div>
	<form v-if="todo" @submit.prevent="procesarFormulario">
		<input type="text" class="form-control my-2" v-model="todo.texto" />
		<div class="form-check form-switch">
			<input
				class="form-check-input"
				type="checkbox"
				id="flexSwitchCheckChecked"
				v-model="todo.done"
			/>
			<label class="form-check-label" for="flexSwitchCheckChecked">{{
				todo.done
			}}</label>
		</div>
		<button
			class="btn btn-warning me-2"
			type="submit"
			:disabled="!todo.texto.trim()"
		>
			Guardar cambios
		</button>
		<router-link to="/" class="btn btn-info">Volver</router-link>
	</form>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
	setup() {
		const route = useRoute();
		const store = useStore();

		const errors = computed(() => store.state.moduleTodo.errors);
		const todo = computed(() => store.state.moduleTodo.todo);

		onMounted(async () => {
			console.log(route.params.id);
			await store.dispatch("moduleTodo/getTodo", route.params.id);
		});

		const procesarFormulario = async () => {
			await store.dispatch("moduleTodo/editTodo", todo.value);
		};

		return {
			errors,
			todo,
			procesarFormulario,
		};
	},
};
</script>