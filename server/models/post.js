const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  picture: { type: String },
  timestamp: { type: Date, default: Date.now, required: true },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

PostSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

exports.default = mongoose.model("Post", PostSchema);
