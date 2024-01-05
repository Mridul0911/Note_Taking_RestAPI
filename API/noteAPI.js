const express = require("express");
const router = express.Router();
const noteController = require("../Controller/noteController")();
const auth = require("../Middleware/auth");

const noteAPI = () => {
  router.post("/createnotes", auth, noteController.createNote);
  router.get("/getAllNotes", auth, noteController.getAllNotes);
  router.get("/getNoteById",auth,noteController.getNoteById);
  router.put("/updateNote",auth,noteController.updateNote);
  router.delete("/deleteNoteById",auth,noteController.deleteNoteById);
  router.post("/shareNote",auth,noteController.shareNote);
  router.get("/searchNote",auth,noteController.searchNote);
  return router;
};

module.exports = noteAPI;