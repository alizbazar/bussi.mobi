define ['module', 'app', 'collections/favorites'], (module, app, Favorites) ->
  "use strict"

  # External dependencies.
  Backbone = require("backbone")

  # Defining the application router.
  module.exports = Backbone.Router.extend(
    routes:
      "": "index"

    initialize: ->
      @favorites = new Favorites()
      return

    index: ->
      console.log "Welcome to your / route."

      require ['views/firstuse'], (firstuse) ->


      return
  )
  return
