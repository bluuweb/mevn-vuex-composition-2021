<template>
	<nav class="navbar navbar-dark bg-dark">
		<router-link to="/" class="navbar-brand">API REST</router-link>
		<div>
			<router-link to="/login" class="btn btn-info me-2" v-if="!user">
				Login
			</router-link>
			<router-link to="/signup" class="btn btn-info me-2" v-if="!user">
				Signup
			</router-link>
			<button
				class="btn btn-danger me-2"
				v-if="user"
				@click="cerrarSesion"
			>
				Logout
			</button>
		</div>
	</nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const store = useStore();

		const user = computed(() => store.state.moduleAuth.user);

		const cerrarSesion = () => {
			store.dispatch("moduleAuth/cerrarSesion");
		};

		return {
			user,
			cerrarSesion,
		};
	},
};
</script>