//application entry-point
self.todoApp.instance = new todoApp.App(invertebrate.env.dev);
self.todoApp.instance.todoCreationForm = new todoApp.TodoCreationFormView(new todoApp.TodoCreationFormModel());
self.todoApp.instance.todoList = new todoApp.TodoListView(new todoApp.TodoListModel());
self.todoApp.instance.completedTodoList = new todoApp.TodoListView(new todoApp.TodoListModel(), { selector: "#completedTodoList" });

