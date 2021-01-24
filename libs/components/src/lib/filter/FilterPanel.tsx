import React from 'react';
import { TagFilter } from './TagFilter';

export interface FilterPanelProps {
  updateFilters(filters): void;
  filters: any;
  availableTags: any;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, availableTags, updateFilters }) => {
  const addTagFilter = (tag: string, negate = false) => {
    if (negate) {
      updateFilters({
        include: filters.include.filter((f) => f !== tag),
        exclude: filters.exclude.concat(tag),
      });
    } else {
      updateFilters({
        include: filters.include.concat(tag),
        exclude: filters.exclude.filter((f) => f !== tag),
      });
    }
  };

  const removeTagFilter = (tag: string) => {
    updateFilters({
      include: filters.include.filter((f) => f !== tag),
      exclude: filters.exclude.filter((f) => f !== tag),
    });
  };

  return (
    <div className="card">
      <h5>Filters</h5>
      <TagFilter
        {...filters}
        availableTags={availableTags}
        addListener={addTagFilter}
        removeListener={removeTagFilter}
      />
    </div>
  );
};
