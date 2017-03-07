'use strict';

var exec = require('child_process').exec;

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: [
                    'Gruntfile.js',
                    '**/*.rst',
                    '_static/*',
                ],
                tasks: [
                    'sphinx_build',
                ],
                options: {
                    interrupt: true,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('sphinx_build', '', function(arg) {
        var done = this.async();
        var child = exec('make html', function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                done(false);
            } else {
                done(true);
            }
        });
    });

    //grunt.loadNpmTasks('grunt-sphinx');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['sphinx_build']);

};

