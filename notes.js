const fs = require('fs');
const { title } = require('process');

const loadNotes = (callback) => {
    fs.readFile("notes.json", (err, dataBuffer) => {
        if(err) {
            return callback([]);
        }

        callback(JSON.parse(dataBuffer));
    });
    
}

const addNote = (title, body) => {
    loadNotes(notes => {
        const note = {title, body};
        if(notes.find(nt => nt.title === title)){
            console.log("Note title taken! Try again with another one!");
            return;
        }
        notes.push(note);
        fs.writeFileSync("notes.json", JSON.stringify(notes), (err) => {
            console.log(err);
        });
        console.log("added a new note!");
    });
};

const getNote = (title) => {
    loadNotes(notes => {
        note = notes.find(nt => nt.title === title);
        if(note === null) {
            console.log("No such note\n");
            return;
        }
        console.log(note.title+": ");
        console.log(note.body);
    });
}

const removeNote = (title) => {
    loadNotes(notes => {
        note = notes.find(nt => nt.title === title);
        if(!note){
            console.log("No note with the title " + title);
            return;
        }

        const updatedNotes = notes.filter(nt => nt.title !== note.title);
        fs.writeFileSync("notes.json", JSON.stringify(updatedNotes), err => {
            console.log(err);
        });
        
        console.log("deleted the note!");
    });
}

const allNotes = () => {
    loadNotes(notes => {
        for(let note of notes){
            console.log(note.title);
        }
    });
}

const downloadNote = (title) => {
    loadNotes(notes => {
        const note = notes.find(nt => nt.title === title);
        note.title = `${note.title}\n\n`;
        fs.writeFileSync(`down.txt`, note.title, (err) => {
            console.log("Couldn't write to file");
        });
        
        fs.appendFileSync(`down.txt`, note.body, (err) => {
            console.log("Couldn't write to file");
        });

    });
}

exports.notesAPI = {
    add: addNote,
    get: getNote,
    remove: removeNote,
    list: allNotes,
    download : downloadNote
};


