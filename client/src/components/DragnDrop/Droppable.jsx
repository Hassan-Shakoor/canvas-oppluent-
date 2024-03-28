// Droppable.js
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable({ id, onDrop, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id.toString(), // Ensure id is a string
    onDrop: onDrop,
  });

  const style = {
    boxShadow: isOver ? '0 0 0 1px var(--primary-color) inset': undefined,
  };

return (
  <div ref={setNodeRef} style={style}>
    {children}
  </div>
);
}
