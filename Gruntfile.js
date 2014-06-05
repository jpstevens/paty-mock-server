module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffeelint: {
      files: ["src/*.coffee", "src/**/*.coffee"],
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
        src: ['./src/api/v1/tests/unit/*-spec.coffee']
      },
      v1_feature: {
        options: {
          reporter: 'spec',
          require: 'coffee-script/register',
          colors: true
        },
        src: ['./src/api/v1/tests/feature/*-spec.coffee']
      }
    },
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: false,
        cwd: 'src/',
        src: ['*.coffee', '**/*.coffee'],
        dest: 'dist/',
        ext: '.js'
      }
    },
    clean: {
      build: ['dist']
    },
    exec: {
      start_src_server: {
        cmd: 'SHOW_LOG=true NODE_ENV=development nodemon ./src/start-server.coffee'
      },
      start_dist_server: {
        cmd: "<%= pkg.scripts.start %>"
      }
    }
  });

  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('server:dev', ['exec:start_src_server']);
  grunt.registerTask('server', ['build', 'exec:start_dist_server']);
  // build
  grunt.registerTask('build', ['coffeelint', 'clean:build', 'coffee']);
  // test
  grunt.registerTask('test:v1:unit', ['mochaTest:v1_unit']);
  grunt.registerTask('test:v1:feature', ['mochaTest:v1_feature']);
  grunt.registerTask('test:v1', ['test:v1:unit', 'test:v1:feature']);
  grunt.registerTask('test', ['mochaTest']);
  // default
  grunt.registerTask('default', ['test', 'build']);
};