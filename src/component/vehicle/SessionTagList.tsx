import React from 'react';
import {TagList} from '../common/TagList';
import {QueryService} from '../../service/QueryService';

interface SessionTagListProps {
  vehicleId: string;
  sessionId: string;
  tags: Array<string>;
}

export const SessionTagList: React.FC<SessionTagListProps> = (props: SessionTagListProps) => {

  const queryService = new QueryService();

  function tagsToDisplay(tags: Array<string>): Array<string> {
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


  const [tags, setTags] = React.useState(props.tags || []);

  React.useEffect(() => {
    setTags(tagsToDisplay(props.tags));
  }, [props.sessionId]);


  return (
      <TagList tags={tags}
               removeListener={removeListener}
               addListener={addListener}/>
  );
};

