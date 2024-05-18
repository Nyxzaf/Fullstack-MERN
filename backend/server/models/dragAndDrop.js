import mongoose, { SchemaTypes } from "mongoose";
const DragDropSchema = new mongoose.Schema(
  {
    EmployeeId: {
      type: SchemaTypes.ObjectId,
      required: true,
      trim: true,
    },
    title: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    Employee: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    severity: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    description: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    duration: {
      start: {
        type: SchemaTypes.Date,
      },
      end: {
        type: SchemaTypes.Date,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Drag", DragDropSchema);
