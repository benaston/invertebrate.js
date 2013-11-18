(function (appRoot) {
    "use strict";

    function TodoCreationFormView(model) {
        if (!(this instanceof appRoot.TodoCreationFormView)) {
            return new appRoot.TodoCreationFormView(model);
        }

        var that = this,
            _el = "#todoCreationForm",
            _templateName = "todoCreationForm";

        this.$el = $(_el);
        this.Model = null;

        this.render = function (options) {
            options = options || { done: that.postRender };

            return appRoot.instance.renderTemplate(that.$el, _templateName, that.Model, options);
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
                appRoot.instance.todoList.Model.addTodo(new appRoot.TodoModel(that.$el.find(".title").val(), that.$el.find(".description").val()));
                appRoot.instance.todoCreationForm.Model.setTitle("");
                appRoot.instance.todoCreationForm.Model.setDescription("");

                return false;
            });

            var $addChoreButton = that.$el.find(".addChoreButton");
            $addChoreButton.on('click', function (e) {
                appRoot.instance.todoList.Model.addTodo(new appRoot.ChoreModel(that.$el.find(".title").val(), that.$el.find(".description").val()));
                appRoot.instance.todoCreationForm.Model.setTitle("");
                appRoot.instance.todoCreationForm.Model.setDescription("");

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

    appRoot.TodoCreationFormView = TodoCreationFormView;
    appRoot.invertebrate.View.isExtendedBy(appRoot.TodoCreationFormView);
}(appRoot));
