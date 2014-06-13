module.exports = function(grunt) {

  grunt.initConfig({
    env: env = (process.env.NODE_ENV || 'development'),
    testConfig: {
      production: {
        dir: 'dist',
        ext: 'js'
      },
      development: {
        dir: 'src',
        ext: 'coffee'
      }
    },
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
      unit: {
        options: {
          reporter: 'spec',
          colors: true
        },
        src: ['./<%= testConfig[env].dir %>/api/' + (process.env.API_VERSION || '*') + '/tests/unit/*-spec.<%= testConfig[env].ext %>']
      },
      feature: {
        options: {
          reporter: 'spec',
          colors: true
        },
        src: ['./<%= testConfig[env].dir %>/api/' + (process.env.API_VERSION || '*') + '/tests/feature/*-spec.<%= testConfig[env].ext %>']
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
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['api/*/tests/fixtures/*.json'],
          dest: 'dist/',
          filter: 'isFile'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('server:dev', ['exec:start_src_server']);
  grunt.registerTask('server', ['build', 'exec:start_dist_server']);
  // build
  grunt.registerTask('build', ['coffeelint', 'clean:build', 'coffee', 'copy:dist']);
  // test
  grunt.registerTask('test:unit', ['mochaTest:unit']);
  grunt.registerTask('test:feature', ['mochaTest:feature']);
  grunt.registerTask('test', ['test:unit', 'test:feature']);
  // default
  grunt.registerTask('default', ['test', 'build']);
};