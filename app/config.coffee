# This is the runtime configuration file.  It complements the Gruntfile.js by
# supplementing shared properties.
require.config
  baseUrl: "/app"
  paths:

    # Make vendor easier to access.
    vendor: "../vendor"

    # Almond is used to lighten the output filesize.
    almond: "../vendor/bower/almond/almond"

    # Opt for Lo-Dash Underscore compatibility build over Underscore.
    underscore: "../vendor/bower/lodash/dist/lodash.underscore"
    Handlebars: "../vendor/bower/handlebars/handlebars"
    text: "../vendor/bower/text/text"
    hbars: "../vendor/bower/require-handlebars/hbars"

    # Map remaining vendor dependencies.
    jquery: "../vendor/bower/jquery/jquery"
    backbone: "../vendor/bower/backbone/backbone"
    bootstrap: "../vendor/bower/bootstrap/dist/js/bootstrap.min"
    layoutmanager: "../vendor/bower/layoutmanager/backbone.layoutmanager"


  shim:

    # This is required to ensure Backbone works as expected within the AMD
    # environment.
    backbone:

      # These are the two hard dependencies that will be loaded first.
      deps: [
        "jquery"
        "underscore"
      ]

      # This maps the global `Backbone` object to `require("backbone")`.
      exports: "Backbone"

    underscore:
      exports: "_"


    # Twitter Bootstrap depends on jQuery.
    bootstrap:
      deps: ["jquery"]

    Handlebars:
      exports: "Handlebars"


  # Backbone.CollectionCache depends on Backbone.
  #"collectionCache": ["backbone"],
  hbars:
    extension: ".hbs"
