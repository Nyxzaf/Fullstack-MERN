import { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Paper, List, ListItem, ListItemText, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const style = {
  width: '100px',
};

const DraggableItem = ({ id, text, moveItem }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveItem(item.id, dropResult.listId);
      }
    },
  }));

  return (
    <ListItem
      ref={drag}
      style={{ ...style, opacity: isDragging ? 0.5 : 1 }}
      dense
    >
      <ListItemText primary={text} />
    </ListItem>
  );
};

const DroppableList = ({ items = [], listId, moveItem }) => {
  const [, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: () => ({ listId }),
  }));

  return (
    <Paper ref={drop} style={style}>
      <List dense>
        {items.map((text, index) => (
          <DraggableItem
            key={uuidv4()} 
            id={`${listId}-${index}`}
            text={text}
            moveItem={moveItem}
          />
        ))}
      </List>
    </Paper>
  );
};

const App = () => {
  const [lists, setLists] = useState({
    list1: ['Item 1', 'Item 2', 'Item 3'],
    list2: ['Item 4', 'Item 5'],
    list3: ['Item 6', 'Item 7'], 
  });

  const moveItem = useCallback((draggedId, targetListId) => {
    const [sourceListId, sourceIndex] = draggedId.split('-');
    const sourceIndexNumber = parseInt(sourceIndex, 10);
    const draggedItem = lists[sourceListId][sourceIndexNumber];

    setLists((prevLists) => {
      const sourceList = [...prevLists[sourceListId]];
      const targetList = targetListId === sourceListId ? sourceList : [...(prevLists[targetListId] || [])];

      sourceList.splice(sourceIndexNumber, 1);

      const targetIndex = targetListId === sourceListId && sourceIndexNumber < targetList.length
        ? sourceIndexNumber
        : targetList.length;

      targetList.splice(targetIndex, 0, draggedItem);

      const newLists = {
        ...prevLists,
        [sourceListId]: sourceList,
        [targetListId]: targetList,
      };

      if (sourceList.length === 0) {
        delete newLists[sourceListId];
      }

      return newLists;
    });
  }, [lists]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', padding: '32px' }}>
        <Grid item>
          <DroppableList items={lists.list1} listId="list1" moveItem={moveItem} />
        </Grid>
        <Grid item>
          <DroppableList items={lists.list2} listId="list2" moveItem={moveItem} />
        </Grid>
        <Grid item>
          <DroppableList items={lists.list3} listId="list3" moveItem={moveItem} />
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default App;
