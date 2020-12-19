<template>
	<div class="container-fluid auth">
		<div class="row">
			<div class="col-12">
				<div class="d-flex justify-content-center vh-100 align-items-center flex-column">
					<h4>Register new account in to the Weather Dashboard</h4>
					<div class="signin-form">
						<form @submit.prevent="onSubmit">
							<div class="form-group">
								<label for="email">Mail</label>
								<input class="form-control" id="email" v-model="email" type="email" aria-label="email" />
							</div>
							<div class="form-group">
								<label for="name">Your Name</label>
								<input class="form-control" id="name" v-model.number="name" type="text" aria-label="name" />
							</div>
							<div class="form-group">
								<label for="password">Password</label>
								<input
									class="form-control"
									id="password"
									v-model="password"
									type="password"
									aria-label="password"
								/>
							</div>

							<button class="btn btn-primary" type="submit">Submit</button>
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
			name: '',
			password: ''
		};
	},
	methods: {
		onSubmit() {
			const formData = {
				email: this.email,
				name: this.name,
				password: this.password
			};
			// console.log(formData)
			this.$store.dispatch('signup', formData);
		}
	}
};
</script>
