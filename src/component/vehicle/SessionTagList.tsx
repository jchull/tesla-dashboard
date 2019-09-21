import React, {useEffect, useState} from 'react';
import {TagList} from '../common/TagList';
import {queryService} from '@service/Services';
import {SessionTagListProps} from '../../type/state';

export const SessionTagList: React.FC<SessionTagListProps> = props => {

  function tagsToDisplay(tags: string[]): string[] {
    return tags.map(tag => tag.replace('_', ' '));
  }

  async function addListener(tag: string): Promise<any> {
    const newTags = await queryService.addTag(props.vehicleId, props.sessionId, tag);
    setTags(tagsToDisplay(newTags));
  }

  async function removeListener(tag: string): Promise<any> {
    const newTags = await queryService.removeTag(props.vehicleId, props.sessionId, tag);
    setTags(tagsToDisplay(newTags));
  }


  const [tags, setTags] = useState(props.tags || []);

  useEffect(() => {
    setTags(tagsToDisplay(props.tags));
  }, [props.sessionId]);


  return (
      <TagList tags={tags}
               removeListener={removeListener}
               addListener={addListener}/>
  );
};

