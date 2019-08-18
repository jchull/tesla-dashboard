import React from 'react';
import './TagList.css';
import {Tag} from './Tag';

interface TagListState {
  tags: Array<string>;
  addListener?: Function;
}

export const TagList: React.FC<TagListState> = (props: TagListState) => {

  const removeTag = (tag: string) => console.log(`redux action todo remove tag: ${tag}`);

  const tags = props.tags.map(tag => <Tag value={tag}
                                          removeListener={removeTag}
                                          key={tag}/>);

  return (
      <div className="tag-list">
        {tags}
      </div>
  );
};

