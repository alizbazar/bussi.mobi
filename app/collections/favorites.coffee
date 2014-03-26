define ['app', 'models/stop'], (app, Stop) ->
  Backbone.Collection.extend
    model: Stop
    initialize: ->
      this.on 'add', ->
        alert('jou')

        return



      return
