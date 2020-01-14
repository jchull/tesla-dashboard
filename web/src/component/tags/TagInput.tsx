import React from 'react';

interface TagInputProps {
  addListener(tag: string): any;
}

export const TagInput: React.FC<TagInputProps> = (props: TagInputProps) => {
  const tagInput = React.createRef<HTMLInputElement>();
  const [inputExpanded, setInputExpanded] = React.useState(false);

  function handleKeyDown(event: any) {
    if (event.key === 'Enter' && tagInput.current) {
      props.addListener(tagInput.current.value);
      tagInput.current.value = '';
      setInputExpanded(false);
    }
  }

  React.useEffect(() => {
    if (inputExpanded && tagInput.current) {
      tagInput.current.focus();
    }
  }, [inputExpanded]);

  return (
    <div className="tag-input">
      <button
        className="add"
        aria-label="Show new tag entry"
        onClick={() => props.addListener && setInputExpanded(!inputExpanded)}
      >
        <i className="material-icons">add</i>
      </button>
      <input
        onKeyDown={handleKeyDown}
        className={inputExpanded ? 'show' : 'hide'}
        ref={tagInput}
        aria-label="Enter new tag"
      />
    </div>
  );
};
