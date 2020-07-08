import React from 'react';

interface TagSelectionListProps {
  tags: string[];

  selectionListener(tag: string): void;
}

export const TagSelectionList: React.FC<TagSelectionListProps> = (
  props: TagSelectionListProps
) => {
  const tags = props.tags.map((tag) => (
    <div key={tag} onClick={() => props.selectionListener(tag)}>
      {tag}
    </div>
  ));

  return <div className="">{tags}</div>;
};
