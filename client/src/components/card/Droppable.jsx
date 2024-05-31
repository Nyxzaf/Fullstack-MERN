import { useDroppable } from "@dnd-kit/core";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Grid item md={4} xs={12} ref={setNodeRef}>
      {children}
    </Grid>
  );
};

Droppable.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Droppable;
