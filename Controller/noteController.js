const { json } = require("express");
const express = require("express");
const router = express.Router();
const noteService = require("../Service/noteService")();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const noteController = () => {
    return {
      createNote: async (req, res) => {
        try {
          const { token} = req.body;
          const noteText = req.body.text; // Assuming the note text is passed in the request body
          const decodedToken = jwt.verify(token,  process.env.TOKEN_KEY);
          const userId=decodedToken.emailId;
        //   console.log(userId);
          const createdNote = await noteService.createNoteUtil(userId, noteText);
  
          return res.status(201).json({ note: createdNote });
        } catch (error) {
            console.error("Error in createNote:", error);
            return res.status(400).json({ message: error.message });
        //   return res.status(500).json({ message: "Internal Server Error" });
        }
      },
      getAllNotes: async (req, res) => {
        try {
          const { token} = req.body;
          const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
          const userId = decodedToken.user_id;
  
          // Use the note service to get all notes for the user
          const notes = await noteService.getAllNotesUtil(userId);
          const noteTexts = notes.map((note) => note.text);
          return res.status(200).json({ notes:noteTexts });
        } catch (error) {
          console.error('Error in getAllNotes:', error);
          return res.status(400).json({ message: error.message });
        }
      },
      getNoteById: async (req, res) => {
        try {
            const { token} = req.body;
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            const userId = decodedToken.user_id;
          const noteId = req.body.id; // Assuming the note ID is passed as a route parameter
  
          // Use the note service to get the note by ID for the user
          const note = await noteService.getNoteByIdUtil(userId, noteId);
  
          if (!note) {
            return res.status(404).json({ message: 'Note not found' });
          }
  
          return res.status(200).json({ note: note.text });
        } catch (error) {
          console.error('Error in getNoteById:', error);
          return res.status(400).json({ message: error.message });
        }
      },
      updateNote: async (req, res) => {
        try {
            const { token} = req.body;
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            const userId = decodedToken.user_id;
          const noteId = req.body.id; // Assuming the note ID is passed as a route parameter
          const newText = req.body.text; // Assuming the new note text is passed in the request body
  
          // Use the note service to update the note by ID for the user
          const updatedNote = await noteService.updateNoteUtil(userId, noteId, newText);
  
          if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
          }
  
          return res.status(200).json({ note: updatedNote.text });
        } catch (error) {
          console.error('Error in updateNote:', error);
          return res.status(400).json({ message: error.message });
        }
      },
      deleteNoteById: async (req, res) => {
        try {
            const { token} = req.body;
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            const userId = decodedToken.user_id;
          const noteId = req.body.id; // Assuming the note ID is passed as a route parameter
  
          // Use the note service to delete the note by ID for the user
          const deletedNote = await noteService.deleteNoteByIdUtil(userId, noteId);
  
          if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
          }
  
          return res.status(200).json({ message: 'Note deleted successfully' });
        } catch (error) {
          console.error('Error in deleteNoteById:', error);
          return res.status(400).json({ message: error.message });
        }
      },
      shareNote: async (req, res) => {
        try {
            const { token} = req.body;
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            const userId = decodedToken.user_id;
          const noteId = req.body.id; // Assuming the note ID is passed as a route parameter
          const userEmail = req.body.emailId;
  
          // Use the note service to share the note with another user
          const sharedNote = await noteService.shareNoteUtil(userId, noteId, userEmail);
  
          return res.status(200).json({ message: 'Note shared successfully', sharedNote });
        } catch (error) {
          console.error('Error in shareNote:', error);
          return res.status(400).json({ message: error.message });
        }
      },
      searchNote: async (req, res) => {
        try {
          const { token} = req.body;
          const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
          const userId = decodedToken.user_id;
          const keyword = req.body.text;
            
          // Use the note service to search for notes
          const matchingNotes = await noteService.searchNoteUtil(userId, keyword);
  
          return res.status(200).json({ notes: matchingNotes });
        } catch (error) {
          console.error('Error in searchNote:', error);
          return res.status(400).json({ message: error.message });
        }
      },
    };
  };
  module.exports = noteController;