var mongoose = require("mongoose"),
Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
});
noteSchema.index({ note: "text" });
// Create the Note model
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
