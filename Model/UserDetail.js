var mongoose = require("mongoose"),
Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema(
  {
    name: String,
    emailId: { type: String, unique: true },
    password: String,
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note', // Reference to the 'Note' model
      }],
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.UserDetail ||
  mongoose.model("UserDetail", userSchema);