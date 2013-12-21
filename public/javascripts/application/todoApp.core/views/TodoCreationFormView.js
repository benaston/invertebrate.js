(function (appRoot) {
    "use strict";

    function TodoCreationFormView(model) {
        if (!(this instanceof todoList.TodoCreationFormView)) {
            return new todoList.TodoCreationFormView(model);
        }

        var that = this,
            _el = "#todoCreationForm",
            _templateName = "todoCreationForm";

        this.$el = $(_el);
        this.Model = null;

        this.render = function (options) {
            options = options || { done: that.postRender };

            return todoList.instance.renderTemplate(that.$el, _templateName, that.Model, options);
        };

        this.postRender = function () {
            var $title = that.$el.find(".title");
            $title.live('change', function () {
                that.Model.setTitle($title.val(), { silent: true });
            });

            var $description = that.$el.find(".description");
            $description.on('change', function () {
                that.Model.setDescription($description.val(), { silent: true })
            });

            var $addTodoButton = that.$el.find(".addTodoButton");
            $addTodoButton.on('click', function (e) {
                todoList.instance.todoList.Model.addTodo(new todoList.TodoModel(that.$el.find(".title").val(), that.$el.find(".description").val()));
                todoList.instance.todoCreationForm.Model.setTitle("");
                todoList.instance.todoCreationForm.Model.setDescription("");

                return false;
            });

            var $addChoreButton = that.$el.find(".addChoreButton");
            $addChoreButton.on('click', function (e) {
                todoList.instance.todoList.Model.addTodo(new todoList.ChoreModel(that.$el.find(".title").val(), that.$el.find(".description").val()));
                todoList.instance.todoCreationForm.Model.setTitle("");
                todoList.instance.todoCreationForm.Model.setDescription("");

                return false;
            });

        };

        function init() {
            if (!model) {
                throw "model not supplied";
            }

            that.Model = model;
            var view = _.extend(that, new invertebrate.View());
            $.subscribe(that.Model.updateEventUri, that.render);
            that.render();

            return view;
        }

        return init();
    }

    todoList.TodoCreationFormView = TodoCreationFormView;
    todoList.invertebrate.View.isExtendedBy(todoList.TodoCreationFormView);
}(todoList));
