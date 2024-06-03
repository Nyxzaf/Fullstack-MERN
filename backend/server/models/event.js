import mongoose, { SchemaTypes } from "mongoose";
const EventSchema = new mongoose.Schema(
  {
    employeeIds: {
      type: SchemaTypes.Array,
      required: true,
      trim: true,
    },
    title: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    description: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    type: {
      type: SchemaTypes.String, //Conferencia, Entrevista, Evento de Integración
      required: true,
      trim: true,
    },
    location: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    locationUrl: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    start: {
      type: SchemaTypes.Date,
    },
    end: {
      type: SchemaTypes.Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
