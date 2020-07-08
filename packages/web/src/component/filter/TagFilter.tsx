import React, { useState } from 'react';
import { TagSelectionList } from '../tags/TagSelectionList';

interface TagFilterProps {
  include: string[];
  exclude: string[];
  availableTags: string[];

  addListener(tag: string, exclude: boolean): void;

  removeListener(tag: string): void;
}

export const TagFilter: React.FC<TagFilterProps> = (props: TagFilterProps) => {
  const [showTagSelection, setTagSelectionShowing] = useState(false);
  const toggleTagSelection = () => setTagSelectionShowing(!showTagSelection);

  const renderTagSelection = (availableTags: string[], exclude = false) => {
    const tagSelected = (tag: string) => {
      console.log(`tag selected: ${tag}`);
    };

    return (
      <>
        <button onClick={() => setTagSelectionShowing(false)}>X</button>
        <TagSelectionList
          tags={availableTags}
          selectionListener={tagSelected}
        />
      </>
    );
  };

  return (
    <div className="">
      <button onClick={() => setTagSelectionShowing(true)}>+</button>
      <button onClick={() => setTagSelectionShowing(true)}>-</button>
      <h6>Include</h6>
      {props.include}
      <h6>Exclude</h6>
      {props.exclude}
      {renderTagSelection(props.availableTags)}
    </div>
  );
};
