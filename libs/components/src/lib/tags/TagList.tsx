import React from 'react'
import './tag.style.scss'
import { Tag } from './Tag'
import { TagInput } from './TagInput'

interface TagListProps {
  tags: string[]

  addListener(tag: string)

  removeListener(tag: string)
}

export const TagList: React.FC<TagListProps> = (props: TagListProps) => {
  const tags = props.tags.map((tag) => (
    <Tag value={tag}
         removeListener={props.removeListener}
         key={tag} />
  ))
  return (
    <div className='card tag-list'>
      <h5>Tags</h5>
      {tags}
      {props.addListener && <TagInput addListener={props.addListener} />}
    </div>
  )
}
