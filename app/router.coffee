define ['module', 'app'], (module, app) ->
  "use strict"

  # External dependencies.
  Backbone = require("backbone")

  # Defining the application router.
  module.exports = Backbone.Router.extend(
    routes:
      "": "index"

    index: ->
      console.log "Welcome to your / route."
      return
  )
  return
