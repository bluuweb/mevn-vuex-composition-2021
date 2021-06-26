<template>
	<form class="input-group my-4" @submit.prevent="procesarFormulario">
		<input
			type="text"
			class="form-control"
			placeholder="ingrese todo"
			v-model="texto"
		/>
		<button
			class="btn btn-outline-dark"
			type="submit"
			v-if="!loading"
			:disabled="!texto.trim()"
		>
			Agregar
		</button>
		<LoadingBtn v-else />
	</form>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import LoadingBtn from "../components/LoadingBtn.vue";
export default {
	components: {
		LoadingBtn,
	},
	setup() {
		const texto = ref("");
		const store = useStore();
		const loading = ref(false);

		const procesarFormulario = async () => {
			loading.value = true;
			await store.dispatch("moduleTodo/addTodo", texto.value);
			loading.value = false;
			texto.value = "";
		};

		return {
			procesarFormulario,
			texto,
			loading,
		};
	},
};
</script>