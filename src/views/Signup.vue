<template>
	<h1 class="text-center mt-5 text-info">Signup</h1>
	<form class="row" @submit.prevent="procesarFormulario">
		<div class="col-md-6 offset-md-3">
			<input
				type="text"
				class="form-control mb-2"
				placeholder="Ingrese email"
				v-model="email"
			/>
		</div>
		<div class="col-md-6 offset-md-3">
			<input
				type="text"
				class="form-control mb-2"
				placeholder="Ingrese nombre"
				v-model="nombre"
			/>
		</div>
		<div class="col-md-6 offset-md-3">
			<input
				type="text"
				class="form-control mb-2"
				placeholder="Ingrese password"
				v-model="password"
			/>
		</div>
		<div class="col-md-6 offset-md-3">
			<input
				type="text"
				class="form-control mb-2"
				placeholder="Repita password"
				v-model="repitePassword"
			/>
		</div>
		<div class="col-md-6 offset-md-3">
			<button
				class="btn btn-info me-2"
				type="submit"
				:disabled="
					password !== repitePassword ||
					!password.trim() ||
					password.length < 6 ||
					!nombre.trim() ||
					!email.trim()
				"
				v-if="!loading"
			>
				Crear cuenta
			</button>
			<LoadingBtn v-else />
			<router-link to="/login" class="btn btn-outline-dark">
				¿Ya tienes cuenta?
			</router-link>
		</div>
		<div class="col-md-6 offset-md-3 mt-3" v-if="errors">
			<div
				class="alert alert-danger"
				v-for="(error, index) in errors"
				:key="index"
			>
				{{ error.msg }}
			</div>
		</div>
	</form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import LoadingBtn from "../components/LoadingBtn.vue";
export default {
	components: { LoadingBtn },
	setup() {
		const email = ref("");
		const nombre = ref("");
		const password = ref("");
		const repitePassword = ref("");
		const loading = ref(false);

		const store = useStore();

		const errors = computed(() => store.state.moduleAuth.errors);

		const procesarFormulario = async () => {
			loading.value = true;
			await store.dispatch("moduleAuth/acceder", {
				path: "signup",
				form: {
					email: email.value,
					password: password.value,
					nombre: nombre.value,
				},
			});
			loading.value = false;
		};

		return {
			email,
			nombre,
			password,
			repitePassword,
			procesarFormulario,
			errors,
			loading,
		};
	},
};
</script>