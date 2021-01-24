import React from 'react';

interface TagSelectionListProps {
  tags: string[];

  selectionListener(tag: string): void;
}

export const TagSelectionList: React.FC<TagSelectionListProps> = (props: TagSelectionListProps) => {
  const { tags, selectionListener } = props;
  const tagList = tags.map((tag) => (
    <div key={tag} onClick={() => selectionListener(tag)}>
      {tag}
    </div>
  ));

  return <div className="">{tagList}</div>;
};
