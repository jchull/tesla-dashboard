import {TagList} from '../tags/TagList';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '@store/store';
import {createSelector} from '@reduxjs/toolkit';

function tagsToDisplay(tags: string[]): string[] {
  return tags.map(tag => tag.replace('_', ' '));
}

export const SessionTagList: React.FC = () => {

  const dispatch = useDispatch();
  const sessionIdSelector = (store: AppState) => store.session.selectedSessionId;
  const sessionsSelector = (store: AppState) => store.session.sessions;
  const tagsSelector = createSelector([sessionsSelector, sessionIdSelector],
                                      (sessions, selectedSessionId) => {
                                        const session = sessions.find(session => session._id === selectedSessionId);
                                        return tagsToDisplay(session && session.tags ? session.tags : []);
                                      }
  );

  const tags = useSelector(tagsSelector);

  async function addListener(tag: string): Promise<void> {
    // TODO: use redux for adding/removing tags
    // const newTags = await services.queryService.addTag(productId, sessionId, tag);
    // setTags(tagsToDisplay(newTags));
    // dispatch()
  }

  async function removeListener(tag: string): Promise<void> {
    // const newTags = await services.queryService.removeTag(productId, sessionId, tag);
    // setTags(tagsToDisplay(newTags));
  }

  return (
      <TagList tags={tags}
               removeListener={removeListener}
               addListener={addListener}/>
  );
};

