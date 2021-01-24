import React from 'react';
import './Tabs.scss';

interface TabProps {
  tabs: string[];
  selectedIndex: number;

  onSelect(index: number): any;
}

export const Tabs: React.FC<TabProps> = (props) => {
  function mapItemsToElements(items: string[], selectedIndex): JSX.Element[] {
    return items.map((item, index) => (
      <button
        key={item}
        onClick={() => props.onSelect(index)}
        className={index === selectedIndex ? 'selected tab' : 'tab'}
      >
        {item}
      </button>
    ));
  }

  const content = mapItemsToElements(props.tabs, props.selectedIndex);

  return <div className="tab-buttons">{content}</div>;
};
