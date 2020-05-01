import React from 'react';
import './tag.style.scss';

interface TagFilterProps {
  include: string[];
  exclude: string[];

  addListener(tag: string, exclude: boolean): void;

  removeListener(tag: string, exclude: boolean): void;
}

export const TagFilter: React.FC<TagFilterProps> = (props: TagFilterProps) => {
  return (
    <div className="card tag-list">
      <h5>Tags</h5>
    </div>
  );
};
