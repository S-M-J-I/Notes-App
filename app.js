// const utils = require('./utils.js');
// console.log(utils);

const notes = require('./notes.js');
const yargs = require('yargs');
const { argv } = require('yargs');

// * commands to work with: add, remove, read, list
// ? add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }   
    },
    handler: (argv) => {
        notes.notesAPI.add(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    buidler: {
        title:{
            describe: 'Title of note to be removed',
            type: 'string',
            demandOption: true
        }
    },
    handler: (argv) => {
        notes.notesAPI.remove(argv.title);
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    buidler: {
        title: {
            describe: 'Title of note to be read',
            type: 'string',
            demandOption: true,
        }
    },  
    handler: (argv) => {
        notes.notesAPI.get(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List of all your notes',
    handler: () => {
        console.log("All your notes: ");
        notes.notesAPI.list();
    }
});

yargs.command({
    command: 'download',
    describe: 'Download a note as .txt file',
    buidler: {
        title:{
            describe: 'Download .txt',
            type: 'string',
            demandOption: true,
        }
    },
    handler: (argv) => {
        notes.notesAPI.download(argv.title);
    }
});


// * parse arguments
yargs.parse();







