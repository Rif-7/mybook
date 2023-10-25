const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, minLength: 2, maxLength: 100 },
  image: { type: String },
  timestamp: { type: Date, default: Date.now, required: true },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

PostSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toRelative();
});

PostSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Post", PostSchema);
