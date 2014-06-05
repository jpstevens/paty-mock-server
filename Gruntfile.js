var server = require("./server");

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffeelint: {
      files: ["./*.coffee", "./**/*.coffee"],
      options: {
        max_line_length: {
          level: "ignore"
        }
      }
    },
    mochaTest: {
      v1_unit: {
        options: {
          reporter: 'spec',
          require: 'coffee-script/register',
          colors: true
        },
        src: ['api/v1/tests/unit/*-spec.coffee']
      },
      v1_feature: {
        options: {
          reporter: 'spec',
          require: 'coffee-script/register',
          colors: true
        },
        src: ['api/v1/tests/feature/*-spec.coffee']
      }
    },
    chmod: {
      options: {
        mode: '755'
      },
      bin: {
        src: ['bin/paty-mock-server']
      }
    }
  });

  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-chmod');

  // build
  grunt.registerTask('build', ['coffeelint', 'chmod:bin']);
  // test
  grunt.registerTask('test:v1:unit', ['mochaTest:v1_unit']);
  grunt.registerTask('test:v1:feature', ['mochaTest:v1_feature']);
  grunt.registerTask('test:v1', ['test:v1:unit', 'test:v1:feature']);
  grunt.registerTask('test', ['mochaTest']);
  // default
  grunt.registerTask('default', ['test', 'build']);
};