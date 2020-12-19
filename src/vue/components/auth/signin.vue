<template>
	<div class="container-fluid auth">
		<div class="row">
			<div class="col-12">
				<div class="d-flex justify-content-center vh-100 align-items-center flex-column">
					<h4>Log in to the Weather Dashboard</h4>
					<div class="signin-form">
						<ValidationObserver ref="observer" tag="form" novalidate @submit.prevent="onSubmit">
							<ValidationProvider rules="required|email" v-slot="props" mode="passive" name="Email">
								<div class="form-group">
									<label for="email">Mail</label>
									<input
										class="form-control"
										id="email"
										v-model="email"
										type="email"
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
										:class="{invalid: props.errors[0] ? err : null}"
									/>
									<span class="error">{{ props.errors[0] }}</span>
								</div>
							</ValidationProvider>
							<p class="error" v-if="error">{{ errorMsg }}</p>
							<button class="btn btn-primary main" type="submit">Submit</button>
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

// Add the email rule
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
		async onSubmit() {
			const isValid = await this.$refs.observer.validate();
			if (isValid) {
				const formData = {
					email: this.email,
					password: this.password
				};
				this.$store.dispatch('login', formData);
			}
		}
	}
};
</script>