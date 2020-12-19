<template>
	<div id="welcome" class="container-fluid auth">
		<div class="row">
			<div class="col-12">
				<div class="d-flex justify-content-center vh-100 align-items-center flex-column">
					<h1 class="welcome">Welcome Vue Weather</h1>
					<div class="auth-item py-5">
						<router-link to="/signup">Sign Up</router-link>
						<router-link to="/signin">Sign In</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
