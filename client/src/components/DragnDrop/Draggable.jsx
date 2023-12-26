import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = 
  
  transform ? {
    cursor : 'move',
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {cursor : 'move'};

  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}