const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requestRecieved: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  requestSent: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Friend", FriendSchema);
