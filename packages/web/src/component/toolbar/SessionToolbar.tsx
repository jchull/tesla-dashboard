import React from 'react'
import './toolbar.style.scss'
import { useDispatch } from 'react-redux'
import { removeSessionAction } from '@teslapp/web/src/component/session/actions'
import { fetchProductListAction } from '../product/actions'

interface SessionToolbarState {
  sessionId?: string;
}

export const SessionToolbar: React.FC<SessionToolbarState> = (
  props: SessionToolbarState
) => {
  const dispatch = useDispatch()

  async function deleteCurrent() {
    const _id = props.sessionId

    if (_id) {
      dispatch(removeSessionAction(_id))
    }
  }

  async function syncNow() {
    dispatch(fetchProductListAction(true))
  }

  return (
    <div className="toolbar">
      <button className="warn"
              onClick={() => deleteCurrent()}>
        <i className="material-icons">delete</i>
      </button>

      <button onClick={() => syncNow()}>
        <i className="material-icons">sync</i>
      </button>
    </div>
  )
}
