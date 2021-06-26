<template>
	<h1 class="text-center mt-5 text-info">Login</h1>
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
				placeholder="Ingrese password"
				v-model="password"
			/>
		</div>
		<div class="col-md-6 offset-md-3">
			<button
				class="btn btn-info me-2"
				type="submit"
				:disabled="
					!password.trim() || !email.trim() || password.length < 6
				"
				v-if="!loading"
			>
				Ingrese
			</button>
			<LoadingBtn v-else />
			<router-link to="/signup" class="btn btn-outline-dark">
				¿No tienes cuenta?
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
import { computed, ref } from "vue";
import { useStore } from "vuex";

import LoadingBtn from "../components/LoadingBtn.vue";
export default {
	components: { LoadingBtn },
	setup() {
		const email = ref("prueba@prueba.com");
		const password = ref("123123");
		const loading = ref(false);

		const store = useStore();

		const errors = computed(() => store.state.moduleAuth.errors);

		const procesarFormulario = async () => {
			// console.log("me diste click" + email.value + password.value);
			loading.value = true;

			await store.dispatch("moduleAuth/acceder", {
				path: "login",
				form: {
					email: email.value,
					password: password.value,
				},
			});

			loading.value = false;
		};

		return {
			email,
			password,
			procesarFormulario,
			errors,
			loading,
		};
	},
};
</script>