Vue.component('signUpForm', {
	template: '#signUpForm',
	data(){
		return{
			password: '',
			confirmPassword: '',
			email:'',
			msg: [],
			disableSubmitButton: true
		}
	},
	watch:{
		email(value){
			this.email = value
			this.check_email(value);
		},

		password(value){
			this.password = value

			this.checkPassword(value);
		},

		confirmPassword(value){
			this.confirmPassword = value;

			this.checkConfirmPassword(value)
		}
	},
	methods:{
		changeToTrcn(){
			this.$emit('change', 'trcn');
		},

		check_email(value){

			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
			  {
			   this.msg['email'] = '';
			  }else{
			  	this.msg['email'] = 'Incorrect';
			  }	
		},

		checkPassword(value){
			var remaininChars = 6 - value.length
			if (value.length < 6) 
			{
				this.msg['password'] = 'Password Must Contain 6 Characters '+remaininChars+' to go..';
			}else{
				this.msg['password'] = '';
			}
		},

		checkConfirmPassword(value){
			if(this.passwordChecker(value))
			{
				if (value == this.password)
				{
					this.msg['confirmPassword'] = ''
					this.disableSubmitButton = false;
				}else{
					this.msg['confirmPassword'] = 'Password does not match, please try agian.'

				}
			}

		},

		passwordChecker(passwordToCheck)
		{
			var remaininChars = 6 - passwordToCheck.length
			if (passwordToCheck.length < 6) 
			{
				this.msg['confirmPassword'] = 'Password Must Contain 6 Characters '+remaininChars+' to go..';
			}else{
				this.msg['confirmPassword'] = '';
				return true;
			}
		}
	}
})

Vue.component('trcn', {
	template: '#trcn',
	methods:{
		back_to_signup(){
			this.$emit('change', 'signUpForm')
		}
	}
})

new Vue({
	el: '#app',
	data:{
		componentName: 'signUpForm'
	},
	methods:{
		change(newComp){
			this.componentName = newComp
		}
	}
})