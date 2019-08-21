import React from 'react';
import './TagList.css';
import {Tag} from './Tag';

interface TagListProps {
  tags: Array<string>;

  addListener(tag: string): any;

  removeListener(tag: string): any;
}

export const TagList: React.FC<TagListProps> = (props: TagListProps) => {

  const tags = props.tags.map(tag => <Tag value={tag}
                                          removeListener={props.removeListener}
                                          key={tag}/>);
// TODO: show input before addListener
  return (
      <div className="tag-list">
        {tags}
        {props.addListener &&
        <button className="add"
                onClick={() => props.addListener && props.addListener('abc 123')}>
          <i className="material-icons">add</i>
        </button>
        }
      </div>
  );
};

