const express = require('express');
const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');
const notesRouter = express.Router();

notesRouter.get("/",auth,getNotes)
notesRouter.post("/",auth,createNote)
notesRouter.delete("/:id",auth,deleteNote)
notesRouter.put("/:id",auth,updateNote)

module.exports = notesRouter