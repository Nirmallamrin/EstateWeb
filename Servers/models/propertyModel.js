import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String},
  imageUrl: { type: String,  },
  ownerEmail: { type: String },
});

const Property = mongoose.model("Property", PropertySchema);

export default Property;
