import React, {useEffect, useState} from 'react';
import {TagList} from '../common/TagList';
import services from '@service/index.ts';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '@store/store';

export const SessionTagList: React.FC = () => {

  const dispatch = useDispatch();
  const productId = useSelector((store:AppState) => store.product.selectedProductId);
  const sessionId = useSelector((store:AppState) => store.session.selectedSessionId);
  const [tags, setTags] = useState([]);


  function tagsToDisplay(tags: string[]): string[] {
    return tags.map(tag => tag.replace('_', ' '));
  }

  async function addListener(tag: string): Promise<any> {
    // const newTags = await services.queryService.addTag(productId, sessionId, tag);
    // setTags(tagsToDisplay(newTags));
  }

  async function removeListener(tag: string): Promise<any> {
    // const newTags = await services.queryService.removeTag(productId, sessionId, tag);
    // setTags(tagsToDisplay(newTags));
  }



  useEffect(() => {
    // setTags(tagsToDisplay(props.tags));
  }, [productId, sessionId]);


  return (
      <TagList tags={tags}
               removeListener={removeListener}
               addListener={addListener}/>
  );
};

