  import mongoose, { SchemaTypes } from "mongoose";
const EmployeeSchema = new mongoose.Schema(
  {
    DNI: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    Name: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    LastName: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    DateOfBirth: {
      type: SchemaTypes.Date,
      required: true,
      trim: true,
    },
    Email: {
      type: SchemaTypes.String,
      trim: true,
    },
    Phone: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    Position: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    Salary: {
      type: SchemaTypes.Number,
      required: true,
      trim: true,
    },
    Active: {
      //Para saber si esta actualmente trabajando o no
      type: SchemaTypes.Boolean,
      default: true,
    },
    InactiveDate: {
      type: SchemaTypes.Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
