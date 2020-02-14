const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const schema = new mongoose.Schema({
  // user id --> login account
  // add more field: password ...
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: email =>
        !Joi.string()
          .email()
          .validate(email).error,
      msg: "Invalid email format"
    }
  },
  language: {
    type: Array,
    default: ["English"]
  },
  address: {
    type: String
  },
  mobile: {
    type: Number
  },
  avatar: {
    type: String
  },
  introduction: {
    type: String,
    default: "I'm too lazy to give an introduction :)"
  },
  tradies: [
    {
      // datatype of traide id
      type: mongoose.Schema.Types.ObjectId,

      // tradie model name
      ref: "Tradie"
    }
  ]
});

const model = mongoose.model("Customer", schema);

module.exports = model;
