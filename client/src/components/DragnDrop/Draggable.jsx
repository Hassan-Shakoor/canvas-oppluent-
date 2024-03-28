import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: props.data
  });

  const style =
    transform ? {
      cursor: 'default',
      transform: `translate3d(0, ${transform.y}px, 0)`,
      zIndex: 200
    } : { cursor: 'default', zIndex: 200 };

  // Prevent drag interaction for input elements

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}