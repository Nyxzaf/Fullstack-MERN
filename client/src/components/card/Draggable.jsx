import PropTypes from 'prop-types'
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform)
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

Draggable.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

export default Draggable;
