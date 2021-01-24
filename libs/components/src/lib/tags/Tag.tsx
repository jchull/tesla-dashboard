import React from 'react'

interface TagState {
  value: string
  color?: string

  removeListener(tag: string): any
}

export const Tag: React.FC<TagState> = (props) => {
  const { color, value, removeListener } = props
  const style = {
    border: `2px solid ${color || '#f4f4f4'}`
  }

  const handleRemove = (tag) => () => removeListener && removeListener(tag)

  return (
    <div className='tag'
         style={style}>
      <span>{value}</span>
      {removeListener && (
        <button className='remove'
                onClick={handleRemove(value)}>
          <i className='material-icons'>remove</i>
        </button>
      )}
    </div>
  )
}
