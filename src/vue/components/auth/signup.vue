<template>
	<div class="container-fluid auth">
		<div class="row">
			<div class="col-12">
				<div class="d-flex justify-content-center vh-100 align-items-center flex-column">
					<h4>Register new account in to the Weather Dashboard</h4>
					<div class="signin-form">
						<ValidationObserver ref="observer" tag="form" novalidate @submit.prevent="onSubmit">
							<ValidationProvider rules="required|email" v-slot="props" mode="passive" name="email">
								<div class="form-group">
									<label for="email">Mail</label>
									<input
										class="form-control"
										id="email"
										v-model="email"
										type="email"
										aria-label="email"
										:class="{invalid: props.errors[0] ? err : null}"
									/>
									<span class="error">{{ props.errors[0] }}</span>
								</div>
							</ValidationProvider>

							<ValidationProvider rules="required" v-slot="props" mode="passive" name="name">
								<div class="form-group">
									<label for="name">Your Name</label>
									<input
										class="form-control"
										id="name"
										v-model.number="name"
										type="text"
										aria-label="name"
										:class="{invalid: props.errors[0] ? err : null}"
									/>
									<span class="error">{{ props.errors[0] }}</span>
								</div>
							</ValidationProvider>

							<ValidationProvider rules="required" v-slot="props" mode="passive" name="Password">
								<div class="form-group">
									<label for="password">Password</label>
									<input
										class="form-control"
										id="password"
										v-model="password"
										type="password"
										aria-label="password"
										:class="{invalid: props.errors[0] ? err : null}"
									/>
									<span class="error">{{ props.errors[0] }}</span>
								</div>
							</ValidationProvider>

							<button class="btn btn-primary" type="submit">Submit</button>
						</ValidationObserver>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', required);

extend('email', email);

export default {
	components: {
		ValidationProvider,
		ValidationObserver
	},
	data() {
		return {
			err: 'invalid',
			email: '',
			name: '',
			password: ''
		};
	},
	methods: {
		async onSubmit() {
			const isValid = await this.$refs.observer.validate();
			if (isValid) {
				const formData = {
					email: this.email,
					name: this.name,
					password: this.password
				};
				this.$store.dispatch('signup', formData);
			}
		}
	}
};
</script>
