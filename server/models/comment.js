const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, minLength: 1, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

CommentSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toRelative(DateTime.DATETIME_MED);
});

CommentSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Comment", CommentSchema);
