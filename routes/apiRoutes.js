const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

module.exports = (app) => {
  app.get("/api/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../db/db.json"))
  );

  app.get("/api/notes/:id", (req, res) => {
    const saveNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));

    res.json(saveNotes[Number(req.params.id)]);
  });

  app.post("/api/notes", (req, res) => {
    const storeNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const incomingNote = req.body;

    incomingNote.id = uuid.v4();
    console.log(incomingNote);

    storeNotes.push(incomingNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(storeNotes));

    res.json(storeNotes);
  });

  app.delete("/api/notes/:id", (req, res) => {
    let deleteNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const noteId = req.params.id;

    let filterNotes = deleteNotes.filter((note) => noteId !== note.id);

    deleteNotes = filterNotes;

    fs.writeFileSync("./db/db.json", JSON.stringify(filterNotes));

    res.end();
  });
};
