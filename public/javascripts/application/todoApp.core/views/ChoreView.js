(function (appRoot) {
    "use strict";

    function ChoreView(model) {
        if (!(this instanceof todoList.ChoreView)) {
            return new todoList.ChoreView(model);
        }

        var that = this,
            el = "<li class='chore'></li>",
            templateName = "todo";

        this.$el = $(el);
        this.Model = null;

        this.render = function (options) {
            options = options || { done: function () {
            } };

            todoList.instance.renderTemplate(that.$el, templateName, that.Model, {
                done: function ($el) {
                    that.bindEvents($el, options.done);
                } });
        };

        function init() {
            if (!model) {
                throw "model not supplied";
            }

            that.Model = model;
            that.bindEvents = new todoList.TodoView(that.Model).bindEvents;

            return _.extend(that, new todoList.invertebrate.View());
        }

        return init();
    }

    todoList.ChoreView = ChoreView;
    todoList.invertebrate.View.isExtendedBy(todoList.TodoView);
}(todoList));
