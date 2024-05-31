import mongoose, { SchemaTypes } from "mongoose";
const EventSchema = new mongoose.Schema(
  {
    EmployeeIds: {
      type: SchemaTypes.Array,
      required: true,
      trim: true,
    },
    Title: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    Description: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    Type: {
      type: SchemaTypes.String, //Conferencia, Entrevista, Evento de Integración
      required: true,
      trim: true,
    },
    Location: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    LocationUrl: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    Start: {
      type: SchemaTypes.Date,
    },
    End: {
      type: SchemaTypes.Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
