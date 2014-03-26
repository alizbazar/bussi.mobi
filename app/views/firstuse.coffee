require ['app', 'hbars!templates/firstuse'], (app, template) ->
  Backbone.View.extend
    template: template
