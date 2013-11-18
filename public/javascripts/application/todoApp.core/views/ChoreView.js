(function (appRoot) {
    "use strict";

    function ChoreView(model) {
        if (!(this instanceof appRoot.ChoreView)) {
            return new appRoot.ChoreView(model);
        }

        var that = this,
            el = "<li class='chore'></li>",
            templateName = "todo";

        this.$el = $(el);
        this.Model = null;

        this.render = function (options) {
            options = options || { done: function () {
            } };

            appRoot.instance.renderTemplate(that.$el, templateName, that.Model, {
                done: function ($el) {
                    that.bindEvents($el, options.done);
                } });
        };

        function init() {
            if (!model) {
                throw "model not supplied";
            }

            that.Model = model;
            that.bindEvents = new appRoot.TodoView(that.Model).bindEvents;

            return _.extend(that, new appRoot.invertebrate.View());
        }

        return init();
    }

    appRoot.ChoreView = ChoreView;
    appRoot.invertebrate.View.isExtendedBy(appRoot.TodoView);
}(appRoot));
