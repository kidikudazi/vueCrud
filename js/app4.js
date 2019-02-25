Vue.component('todo-list',{
	template: '#todo-list',
	data(){
		return{
			newTodo:{todo: ''},
			errorMessage:'',
			successMessage:'',
			msg:[]
		}
	},
	mounted(){
		console.log('Mounted');
		this.getTodo()
	},
	methods:{
		checkInput(){
			var newTodo = this.newTodo;
			if (newTodo.todo.length < 1){
				this.msg['todo'] = 'Sorry the input field can not be left empty';
			}else{
				this.msg['todo'] = '';

				this.saveTodo(newTodo);
			}
		},

		getTodo(){
			axios.get("http://localhost/vuephp/todoApi.php?action=read")
			.then(function(response){
				if (response.data.error){

					this.errorMessage = response.data.message;
				}else{
					
					list = response.data.lists;
					console.log(list);

				}
			})
		},

		saveTodo(newTodo){
			var formData = this.toFormData(newTodo);

			axios.post("http://localhost/vuephp/todoApi.php?action=create", formData)
			.then(function(response){
				this.newTodo = {todo: ''};
				if (response.data.error){

					this.errorMessage = response.data.message;
				}else{
					
					this.successMessage = response.data.message;
					console.log(this.successMessage);

				}
			})

		},

		toFormData(obj){
			var form_data = new FormData();
			for(var key in obj)
			{
				form_data.append(key, obj[key]);
			}
			return form_data;
		}
	}
});

 new Vue({
	el:'#app',
	data:{
		componentName: 'todo-list'
	}
})