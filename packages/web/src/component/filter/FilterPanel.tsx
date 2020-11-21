import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { TagFilter } from './TagFilter'
import { updateFilters } from '../session/actions'


export const FilterPanel: React.FC = () => {
  const { filters, availableTags } = useSelector(
    (store: AppState) => store.session
  )

  const addTagFilter = (tag: string, negate = false) => {
    if (negate) {
      updateFilters({
        include: filters.include.filter((f) => f !== tag),
        exclude: filters.exclude.concat(tag)
      })
    } else {
      updateFilters({
        include: filters.include.concat(tag),
        exclude: filters.exclude.filter((f) => f !== tag)
      })
    }
  }

  const removeTagFilter = (tag: string) => {
    updateFilters({
      include: filters.include.filter((f) => f !== tag),
      exclude: filters.exclude.filter((f) => f !== tag)
    })
  }

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
  )
}
