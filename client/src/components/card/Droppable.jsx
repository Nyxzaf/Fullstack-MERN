import { useDroppable } from "@dnd-kit/core";
import PropTypes from 'prop-types'
const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <div ref={setNodeRef} className="droppable-container">
      {children}
    </div>
  );
};

Droppable.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };
  
export default Droppable;
