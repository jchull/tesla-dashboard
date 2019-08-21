import React from 'react';
import './TagList.css';
import {Tag} from './Tag';
import {TagInput} from './TagInput';

interface TagListProps {
  tags: Array<string>;

  addListener(tag: string): any;

  removeListener(tag: string): any;
}

export const TagList: React.FC<TagListProps> = (props: TagListProps) => {

  const tags = props.tags.map(tag => <Tag value={tag}
                                          removeListener={props.removeListener}
                                          key={tag}/>);
  return (
      <div className="tag-list">
        {tags}
        {props.addListener &&
          <TagInput addListener={props.addListener}/>
        }
      </div>
  );
};

