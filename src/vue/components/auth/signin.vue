<template>
	<div class="container-fluid auth">
		<div class="row">
			<div class="col-12">
				<div class="d-flex justify-content-center vh-100 align-items-center flex-column">
					<h1>Log in to the Weather Dashboard</h1>
					<div class="signin-form">
						<form @submit.prevent="onSubmit">
							<div class="form-group">
								<label for="email">Mail</label>
								<input class="form-control" id="email" v-model="email" type="email" />
							</div>
							<div class="form-group">
								<label for="password">Password</label>
								<input class="form-control" id="password" v-model="password" type="password" />
							</div>
							<p v-if="error">{{ errorMsg }}</p>
							<button class="btn btn-primary main" type="submit">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: ''
		};
	},
	computed: {
		errorMsg() {
			return this.$store.getters.errorMsg;
		},
		error() {
			return this.$store.getters.ifErrorLogin;
		}
	},
	methods: {
		onSubmit() {
			const formData = {
				email: this.email,
				password: this.password
			};
			// console.log(formData)
			this.$store.dispatch('login', { email: formData.email, password: formData.password });
		}
	}
};
</script>