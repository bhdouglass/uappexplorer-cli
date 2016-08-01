var parseArgs = require('minimist');
var colors = require('colors');
var api = require('./api');
var Table = require('cli-table2');

var argv = parseArgs(process.argv.slice(2), {
    string: ['search'],
    alias: {
        search: 's'
    }
});

var types = {
    application: colors.blue('App'),
    scope: colors.yellow('Scope'),
    webapp: colors.cyan('Web App'),
    snappy: colors.magenta('Snap'),
    snappy_oem: colors.magenta('OEM Snap'),
    snappy_os: colors.magenta('OS Snap'),
    snappy_kernel: colors.magenta('Kernel Snap'),
    snappy_gadget: colors.magenta('Gadget Snap'),
    snappy_framework: colors.magenta('Framework Snap'),
    snappy_application: colors.magenta('Snap'),
};

//TODO make description dynamic based on console size
var table = new Table({
    head: ['App', 'Description', 'Types', '❤', '★'],
    colWidths: [20, 50, 15, 6, 6],
});

api.search(argv.search).then(function(data) {
    if (data && data.apps) {
        data.apps.forEach(function(app) {
            var typeList = '';
            app.types.forEach(function(type, index) {
                if (index > 0) {
                    typeList += ', ';
                }

                typeList += types[type];
            });

            table.push([
                app.title,
                app.short_description,
                typeList,
                app.points,
                app.bayesian_average.toFixed(2),
            ]);
        });
    }

    console.log(table.toString());
});
