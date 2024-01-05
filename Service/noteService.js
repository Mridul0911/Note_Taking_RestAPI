const express = require("express");
const userDetailsModel = require("../Model/UserDetail");
const noteDetailsModel = require("../Model/NoteDetail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const noteService = () => {
    return {
      createNoteUtil: async (emailId, noteText) => {
        try {
            const user = await userDetailsModel.findOne({ emailId });
            // console.log(user);
            if (!user) {
              throw new Error("User not found with the provided email");
            }
                const newNote = new noteDetailsModel({
              note: noteText,
            });
            const createdNote = await newNote.save();
    
            // Update the UserDetail document to include the new note's reference
            await userDetailsModel.findByIdAndUpdate(user._id, { $push: { notes: createdNote._id } });
    
            return createdNote;
        } catch (error) {
          throw new Error("Error creating note: " + error.message);
        }
      },
      getAllNotesUtil: async (userId) => {
        try {
          const user = await userDetailsModel.findById(userId);
          
          if (!user) {
            throw new Error('User not found');
          }
  
          // Retrieve the array of note IDs associated with the user
          const noteIds = user.notes;
  
          // Fetch the corresponding note texts
          const notes = await Promise.all(noteIds.map(async (noteId) => {
            const note = await noteDetailsModel.findById(noteId);
            return note ? { id: note._id, text: note.note } : null;
          }));
  
          // Filter out null values (notes not found)
          const filteredNotes = notes.filter((note) => note !== null);
  
          return filteredNotes;
        } catch (error) {
          throw new Error('Error in getAllNotesUtil: ' + error.message);
        }
      },
      getNoteByIdUtil: async (userId, noteId) => {
        try {
          const user = await userDetailsModel.findById(userId);
          if (!user) {
            throw new Error('User not found');
          }
        //   console.log(user.notes.length);
          if (!user.notes.some(note => note.toString() === noteId)) {
            console.log("HELLO");
            throw new Error('Note not found for the user');
          }
          const note = await noteDetailsModel.findById(noteId);
          if (!note) {
            throw new Error('Note not found');
          }
  
          return { id: note._id, text: note.note };
        } catch (error) {
          throw new Error('Error in getNoteByIdUtil: ' + error.message);
        }
      },
      updateNoteUtil: async (userId, noteId, newText) => {
        try {
          const user = await userDetailsModel.findById(userId);
  
          if (!user) {
            throw new Error('User not found');
          }
            
          if (!user.notes.includes(noteId)) {
            throw new Error('Note not found for the user');
          }
  
          const note = await noteDetailsModel.findById(noteId);
  
          if (!note) {
            throw new Error('Note not found');
          }
  
          note.note = newText;
  
          const updatedNote = await note.save();
  
          return { id: updatedNote._id, text: updatedNote.note };
        } catch (error) {
          throw new Error('Error in updateNoteUtil: ' + error.message);
        }
      },
      deleteNoteByIdUtil: async (userId, noteId) => {
        try {
          // Fetch the user from the database
          const user = await userDetailsModel.findById(userId);
          console.log(user);
          console.log(noteId);
          if (!user) {
            throw new Error('User not found');
          }
  
          // Check if the note ID is associated with the user

          if (!user.notes.some(note => note.toString() === noteId)) {
            console.log("HELLO");
            throw new Error('Note not found for the user');
          }
  
          // Remove the note ID from the user's notes array
          user.notes = user.notes.filter((id) => id.toString() !== noteId);
          await user.save();
  
          // Fetch the corresponding note and delete it
          const deletedNote = await noteDetailsModel.deleteOne({ _id: noteId });

          if (!deletedNote) {
            throw new Error('Note not found');
          }
  
          return { id: deletedNote._id, text: deletedNote.note };
        } catch (error) {
          throw new Error('Error in deleteNoteByIdUtil: ' + error.message);
        }
      },
      shareNoteUtil: async (userId, noteId, userEmail) => {
        try {
          // Fetch the user from the database
          const user = await userDetailsModel.findById(userId);
  
          if (!user) {
            throw new Error('User not found');
          }
  
          // Check if the note ID is associated with the user
          if (!user.notes.includes(noteId)) {
            throw new Error('Note not found for the user');
          }
          console.log(userEmail);
          // Fetch the user to share the note with
          const shareUser = await userDetailsModel.findOne({ emailId: userEmail });
  
          if (!shareUser) {
            throw new Error('User not found with the provided email');
          }
  
          // Add the note ID to the user's notes array
          shareUser.notes.push(noteId);
          await shareUser.save();
  
          return { id: noteId, text: 'Note shared successfully' };
        } catch (error) {
          throw new Error('Error in shareNoteUtil: ' + error.message);
        }
      },
      searchNoteUtil: async (userId, keyword) => {
        try {
          // Fetch the user from the database
          const user = await userDetailsModel.findById(userId);
  
          if (!user) {
            throw new Error('User not found');
          }
  
          // Use MongoDB's text search to find notes containing the keyword
          const matchingNotes = await noteDetailsModel.find(
            {
              _id: { $in: user.notes },
              $text: { $search: keyword },
            },
            { score: { $meta: 'textScore' } } // Optional: Include score for sorting
          ).sort({ score: { $meta: 'textScore' } });
  
          return matchingNotes.map((note) => ({
            id: note._id,
            text: note.note,
          }));
        } catch (error) {
          throw new Error('Error in searchNoteUtil: ' + error.message);
        }
      },
    //   searchNoteUtil: async (userId, keyword) => {
    //     try {
    //       // Fetch the user from the database
    //       const user = await userDetailsModel.findById(userId);
  
    //       if (!user) {
    //         throw new Error('User not found');
    //       }
  
    //       // Search for notes containing the keyword
    //       const matchingNotes = [];
  
    //       for (const noteId of user.notes) {
    //         const note = await noteDetailsModel.findById(noteId);
  
    //         if (note && note.note.includes(keyword)) {
    //           matchingNotes.push({
    //             id: noteId,
    //             text: note.note,
    //           });
    //         }
    //       }
    //       return matchingNotes;
    //     } catch (error) {
    //       throw new Error('Error in searchNoteUtil: ' + error.message);
    //     }
    //   },
    };
  };
  
  module.exports = noteService;
