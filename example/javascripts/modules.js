//order of declaration matters here
(function (mod) {
	"use strict";

	mod.Config = new todoApp.Config(invertebrate.env.dev);
}(todoApp.mod("config")));

(function (mod) {
	"use strict";

	mod.TemplateServerSvc = new invertebrate.TemplateServerSvc(todoApp.mod("config").Config);
}(todoApp.mod("templates")));

// (function (mod) {
// 	"use strict";
// 
// 	mod.TodoList = new todoApp.TodoListView(new todoApp.TodoListModel());
// }(todoApp.mod("ui")));


