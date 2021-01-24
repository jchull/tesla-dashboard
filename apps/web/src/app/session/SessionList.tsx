import React, { useLayoutEffect, useRef, useState } from 'react'
import './session.style.scss'

import { useDispatch, useSelector } from 'react-redux'

import { SessionListItem } from './SessionListItem'
import { fetchSessionListAction, selectSession, SessionState } from './actions'
import { AppState } from '../store'

export const SessionList: React.FC<SessionState> = (props) => {
  const dispatch = useDispatch()
  const scroll = useRef<HTMLDivElement>(null)
  const loading = useSelector((store: AppState) => store.session.loading)
  const loadedCount = useSelector(
    (store: AppState) => store.session.loadedCount
  )
  const totalCount = useSelector((store: AppState) => store.session.totalCount)
  const selectedProductId = useSelector(
    (store: AppState) => store.product.selectedProductId
  )

  const [lastRequestTime, setLastRequestTime] = useState(Date.now()
                                                             .valueOf())

  useLayoutEffect(() => {
    scroll.current.addEventListener('scroll', onScroll)
    return () => scroll.current.removeEventListener('scroll', onScroll)
  })

  const onScroll = (event: Event) => {
    if (
      !loading &&
      loadedCount < totalCount &&
      Date.now()
          .valueOf() - lastRequestTime > 1000 &&
      // @ts-ignore
      event.target.scrollHeight -
      // @ts-ignore
      event.target.clientHeight -
      // @ts-ignore
      event.target.scrollTop -
      100 <
      0
    ) {
      setLastRequestTime(Date.now()
                             .valueOf())
      dispatch(
        fetchSessionListAction(selectedProductId, {
          start: loadedCount,
          size: 100
        })
      )
    }
  }

  return (
    <div className='session-list'>
      <div className='sessions'
           ref={scroll}>
        {props.sessions.length
          ? props.sessions.map((session) => (
            <SessionListItem
              session={session}
              selected={session._id === props.selectedSessionId}
              selectionHandler={() => dispatch(selectSession(session._id))}
              key={session._id}
            />
          ))
          : null}
      </div>
    </div>
  )
}
