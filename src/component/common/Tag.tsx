import React from 'react';

interface TagState {
    value: string;
    color?: string;
    removeListener(tag: string): any;
}

export const Tag: React.FC<TagState> = (props: TagState) => {

    const style = {
        border: `2px solid ${props.color || '#f4f4f4'}`
    };

    return (
        <div className="tag"
            style={style}>
            <span>{props.value}</span>
            { props.removeListener && <button className="remove" onClick={() => props.removeListener && props.removeListener(props.value)}>
                <i className="material-icons">remove</i>
            </button>}
        </div>
    );
};

