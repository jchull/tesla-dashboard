import { TagList } from '../tags/TagList';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/store';
import { createSelector } from '@reduxjs/toolkit';
import {
  addSessionTagAction,
  removeSessionTagAction
} from '@component/session/actions';

function tagsToDisplay(tags: string[]): string[] {
  return tags.map((tag) => tag.replace('_', ' '));
}

export const SessionTagList: React.FC = () => {
  const dispatch = useDispatch();
  const sessionIdSelector = (store: AppState) =>
    store.session.selectedSessionId;
  const sessionsSelector = (store: AppState) => store.session.sessions;
  const tagsSelector = createSelector(
    [sessionsSelector, sessionIdSelector],
    (sessions, selectedSessionId) => {
      const session = sessions.find(
        (session) => session._id === selectedSessionId
      );
      return tagsToDisplay(session && session.tags ? session.tags : []);
    }
  );

  const tags = useSelector(tagsSelector);
  const sessionId = useSelector(sessionIdSelector);

  async function addListener(tag: string): Promise<void> {
    if (sessionId && tag && tag.length) {
      dispatch(addSessionTagAction(sessionId, tag));
    }
  }

  async function removeListener(tag: string): Promise<void> {
    if (sessionId && tag && tag.length) {
      dispatch(removeSessionTagAction(sessionId, tag));
    }
  }

  return (
    <TagList
      tags={tags}
      removeListener={removeListener}
      addListener={addListener}
    />
  );
};
