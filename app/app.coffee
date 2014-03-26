define ['module', 'underscore', 'jquery', 'backbone', 'layoutmanager'], (module, _, $, Backbone, Layout) ->
  "use strict"

  # Alias the module for easier identification.
  app = module.exports

  # The root path to run the application through.
  app.root = "/"

  # Enable Backbone Events for the app module
  app = _.extend({}, Backbone.Events)

  Backbone.Layout.configure {
    manage: true
    el: false
  }

  app.helpers = {

  }

  # Load non-critical dependencies, such as possible jquery plugins aso.
  require ['chui']

  return
