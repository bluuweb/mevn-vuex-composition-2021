<template>
	<div class="container">
		<Navbar />
		<div class="mt-4">
			<router-view />
		</div>
	</div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
// import { useStore } from "vuex";
export default {
	components: { Navbar },
	setup() {
		// const store = useStore();
		// console.log(store.state.moduleAuth.user);
		// console.log(store.state.moduleTodo.todo);
	},
};
</script>

