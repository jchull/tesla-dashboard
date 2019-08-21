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

  const addListener = async (tag: string) => {
    const newTags = await queryService.addTag(props.vehicleId, props.sessionId, tag);
    setTags(tagsToDisplay(newTags));
  };

  const removeListener = async (tag: string) => {
    const newTags = await queryService.removeTag(props.vehicleId, props.sessionId, tag);
    setTags(tagsToDisplay(newTags));
  };

  const tagsToDisplay = (tags : Array<string>) => tags.map(tag => tag.replace('_', ' '));

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

