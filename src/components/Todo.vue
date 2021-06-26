<template>
	<div :class="`my-2 alert ${todo.done ? 'alert-success' : 'alert-dark'}`">
		<p>{{ todo.texto }}</p>
		<router-link class="btn btn-warning me-2" :to="`/edit/${todo._id}`">
			Editar
		</router-link>
		<button
			class="btn btn-danger"
			@click="eliminar(todo._id)"
			v-if="!loading"
		>
			Eliminar
		</button>
		<LoadingBtn v-else />
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import LoadingBtn from "../components/LoadingBtn.vue";
export default {
	props: ["todo"],
	components: { LoadingBtn },
	setup() {
		const store = useStore();
		const loading = ref(false);
		const eliminar = async (id) => {
			loading.value = true;
			await store.dispatch("moduleTodo/removeTodo", id);
			loading.value = false;
		};

		return {
			eliminar,
			loading,
		};
	},
};
</script>