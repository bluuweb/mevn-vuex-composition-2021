<template>
	<h1>Home</h1>
	<div v-if="user">
		<pre>{{ user }}</pre>
	</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
	setup() {
		const store = useStore();

		const user = computed(() => store.state.moduleAuth.user);

		return {
			user,
		};
	},
};
</script>