const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
