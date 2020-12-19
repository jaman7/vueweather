<template>
	<header id="header" class="header container-fluid px-0">
		<nav class="navbar navbar-expand-md navbar-dark bg-dark">
			<router-link to="/">Vue Authenticate</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav w-100 justify-content-between">
					<li v-if="auth" class="nav-item">
						<router-link class="nav-link" to="/dashboard">
							<span>Dashboard</span>
						</router-link>
					</li>
					<!-- <li v-if="!auth" class="nav-item">
						<router-link class="nav-link" to="/signup">Register</router-link>
					</li>
					<li v-if="!auth" class="nav-item">
						<router-link class="nav-link" to="/signin">Log In</router-link>
					</li>-->
					<Dropdown />
					<li v-if="auth" class="nav-item">
						<a @click="onLogout" class="nav-link">
							<span>{{ user.user }}</span>
							<img class="img-fluid user-logo" src="img/user.png" alt />
							<span>Log Out</span>
						</a>
					</li>
					<ButtonSethide v-if="auth" />
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
// import Dropdown from './view/dropdown';
import ButtonSethide from './view/ButtonSethide';

export default {
	name: 'Header',
	components: {
		// Dropdown,
		ButtonSethide
	},
	computed: {
		auth() {
			return this.$store.getters.ifAuthenticated;
		},
		user() {
			return this.$store.getters.user;
		}
	},

	methods: {
		onLogout() {
			this.$store.dispatch('logout');
		}
	}
};
</script>
