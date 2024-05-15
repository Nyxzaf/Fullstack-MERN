import cors from "cors";
import express from "express";
import EmployeeRoutes from "./server/routers/employee.routes.js";
import TaskRoute from "./server/routers/task.routes.js"
//import DragDrops from "./server/routers/dragAndDrop.routes.js"
const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(TaskRoute)
app.use(EmployeeRoutes);
//app.use(DragDrops)

export default app;
