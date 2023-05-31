const mongoose = require("mongoose");
const Friend = require("./friend");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: function () {
      return !this.facebookId;
    },
  },
  password: { type: String, minLength: 6 },
  profilePicUrl: { type: String },
  facebookId: { type: String },
  accessToken: { type: String },
});

UserSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual("friend_details").get(async function () {
  try {
    let friendDetail = await Friend.findOne({ userId: this.id });
    if (!friendDetail) {
      friendDetail = new friendDetail({ userId: this.id });
      friendDetail = await friendDetail.save();
    }
    return friendDetail;
  } catch (err) {
    console.error("Error retrieving friend details", err);
    throw new Error("Failed to retrieve friend details");
  }
});

module.exports = mongoose.model("User", UserSchema);
