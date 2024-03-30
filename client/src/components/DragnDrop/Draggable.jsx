
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
    id: props.id,
    data: props.data
  });

  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    boxShadow: active ? '0 0 0 1px var(--primary-color) inset' : undefined,
  };

  // Prevent drag interaction for input elements
  return (
    <div ref={setNodeRef} style={style} data {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}
