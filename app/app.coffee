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
    trackOffOn: (callback) ->
      time = new Date().getTime()
      interval = 2010
      errorMargin = 700

      check = ->
        newtime = new Date().getTime()
        console.log "checking"
        callback() if (newtime - time) > (interval + errorMargin)
        time = newtime
        timer = setTimeout(check, interval)
        return

      timer = setTimeout(check, interval)

      return {
        timeSinceLastCheck: ->
          new Date().getTime() - time

        stop: ->
          clearTimeout timer  if timer
          return
      }

  }

  # Load non-critical dependencies, such as possible jquery plugins aso.
  require ['chui']

  return
