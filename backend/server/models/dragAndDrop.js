import mongoose, { SchemaTypes } from "mongoose";
const DragDropSchema = new mongoose.Schema(
  {
    title: {
        type: SchemaTypes.String,
        required: true,
        trim: true,
      },
    name: {
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
            type:  SchemaTypes.Date,
        }
    },

},
{ timestamps: true }
);

export default mongoose.model("Drag", DragDropSchema);