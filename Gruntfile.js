module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    // Wipe out previous builds and test reporting.
    clean: ["dist/", "test/reports"],

    // Run your source code through JSHint's defaults.
    jshint: ["app/**/*.js"],

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      release: {
        options: {
          mainConfigFile: "app/config.js",
          generateSourceMaps: true,
          include: ["main"],
          insertRequire: ["main"],
          out: "dist/source.min.js",
          optimize: "uglify2",

          // Since we bootstrap with nested `require` calls this option allows
          // R.js to find them.
          findNestedDependencies: true,

          // Include a minimal AMD implementation shim.
          name: "almond",

          // Setting the base url to the distribution directory allows the
          // Uglify minification process to correctly map paths for Source
          // Maps.
          baseUrl: "dist/app",

          // Wrap everything in an IIFE.
          wrap: true,

          // Modules to stub out in the optimized file.
          stubModules: ['text', 'hbars'],

          // This is needed for the require-handlebars library
          onBuildWrite : function(moduleName, path, content){
              // replace handlebars with the runtime version
              if (moduleName === 'Handlebars') {
                  path = path.replace('handlebars.js','handlebars.runtime.js');
                  content = grunt.file.read(path).toString();
                  // Set Handlebars as a grobal variable
                  content = content.replace('var Handlebars', 'window.Handlebars');
              }
              return content;
          },

          // Do not preserve any license comments when working with source
          // maps.  These options are incompatible.
          preserveLicenseComments: false
        }
      }
    },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects.  Instead of manually specifying your stylesheets inside the
    // HTML, you can use `@imports` and this task will concatenate only those
    // paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      "dist/styles.css": {
        // Point this to where your `index.css` file is location.
        src: "app/styles/index.css",

        // The relative path to use for the @imports.
        paths: ["app/styles"],

        // Rewrite image paths during release to be relative to the `img`
        // directory.
        forceRelative: "/app/img/"
      }
    },

    coffee: {
      options: {
        bare: true
      },
      // build: {
      //   expand: true,
      //   cwd: '.',
      //   src: ['*.coffee', 'app/**/*.coffee'],
      //   dest: 'dist/',
      //   ext: '.js'
      // },
      dev: {
        expand: true,
        cwd: '.',
        src: ['*.coffee', 'app/**/*.coffee'],
        dest: '.',
        ext: '.js',
        sourceMap: true
      }
    },

    // Minfiy the distribution CSS.
    cssmin: {
      release: {
        files: {
          "dist/styles.min.css": ["dist/styles.css"]
        }
      }
    },

    server: {
      options: {
        host: "0.0.0.0",
        port: 8000
      },

      development: {},

      release: {
        options: {
          prefix: "dist"
        }
      },

      test: {
        options: {
          forever: false,
          port: 8001
        }
      }
    },

    shell: {
        chui: {
          command: 'grunt chui',
          options: {
            async: false,
            execOptions: {
              cwd: './vendor/chocolatechip-ui/'
            }
          }
        },
        options: {
            async: true
        }
    },

    watch: {
      options: {
        spawn: true
      },
      livereload: {
        files: [
          'app/**/*',
          '*.html',
          '*.js',
          '!**/*.coffee'
        ],
        options: {
          livereload: true
        }
      },
      // coffee: {
      //   files: [
      //     '**/*.coffee',
      //     '*.coffee'
      //   ],
      //   tasks: ['coffee']
      // }
    },

    // Enables running several task at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true,
      },
      watch: [
        'watch:livereload',
        //'watch:coffee',
        'server',
        //'talkooserver'
      ]
    },

    processhtml: {
      release: {
        files: {
          "dist/index.html": ["index.html"]
        }
      }
    },

    // Move vendor and app logic during a build.
    copy: {
      release: {
        files: [
          {
            src: ["app/**", "!**/*.coffee"],
            dest: "dist/"
          },
          {
            src: "vendor/**",
            dest: "dist/"
          }
        ]
      }
    },

    compress: {
      release: {
        options: {
          archive: "dist/source.min.js.gz"
        },

        files: ["dist/source.min.js"]
      }
    },

    // Unit testing is provided by Karma.  Change the two commented locations
    // below to either: mocha, jasmine, or qunit.
    karma: {
      options: {
        basePath: process.cwd(),
        singleRun: true,
        captureTimeout: 7000,
        autoWatch: true,

        reporters: ["progress", "coverage"],
        browsers: ["PhantomJS"],

        // Change this to the framework you want to use.
        frameworks: ["qunit"],

        plugins: [
          "karma-jasmine",
          "karma-mocha",
          "karma-qunit",
          "karma-phantomjs-launcher",
          "karma-coverage"
        ],

        preprocessors: {
          "app/**/*.js": "coverage"
        },

        coverageReporter: {
          type: "lcov",
          dir: "test/coverage"
        },

        files: [
          // You can optionally remove this or swap out for a different expect.
          "vendor/bower/chai/chai.js",
          "vendor/bower/requirejs/require.js",
          "test/runner.js",

          {
            pattern: "app/**/*.*",
            included: false
          },
          // Derives test framework from Karma configuration.
          {
            pattern: "test/<%= karma.options.frameworks[0] %>/**/*.spec.js",
            included: false
          },
          {
            pattern: "vendor/**/*.js",
            included: false
          }
        ]
      },

      // This creates a server that will automatically run your tests when you
      // save a file and display results in the terminal.
      daemon: {
        options: {
          singleRun: false
        }
      },

      // This is useful for running the tests just once.
      run: {
        options: {
          singleRun: true
        }
      }
    },

    coveralls: {
      options: {
        coverage_dir: "test/coverage/PhantomJS 1.9.2 (Linux)/"
      }
    }
  });

  grunt.event.on('watch', function(action, filepath, target) {
    if (filepath.indexOf('.coffee') !== -1) {
      grunt.config(['coffee', 'dev', 'src'], [filepath]);
    }
  });

  // Grunt contribution tasks.
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Third-party tasks.
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-karma-coveralls");
  grunt.loadNpmTasks("grunt-processhtml");
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell-spawn');

  // Grunt BBB tasks.
  grunt.loadNpmTasks("grunt-bbb-server");
  grunt.loadNpmTasks("grunt-bbb-requirejs");
  grunt.loadNpmTasks("grunt-bbb-styles");

  // Create an aliased test task.
  grunt.registerTask("test", ["karma:run"]);

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", [
    "clean",
    "shell",
    "jshint",
    "processhtml",
    "coffee",
    "copy",
    "requirejs",
    "styles",
    "cssmin",
  ]);

  grunt.registerTask("dev", [
    "shell",
    "coffee",
    "concurrent"
  ]);

};
