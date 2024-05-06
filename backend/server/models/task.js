import mongoose, { SchemaTypes } from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    EmployeeId: {
      type: SchemaTypes.ObjectId,
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
    Severity: {
      type: SchemaTypes.String, //low, medium, high, critic
      required: true,
      trim: true,
    },
    WorkHours: {
      type: SchemaTypes.Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
