import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { disconnect, openSocket } from '../../../common/socket/socket';
import { getItemData } from '../../../redux/features/itemPageSlice';
import { selectUser } from '../../../redux/selectors/authSelectors';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import sendComment from '../../../common/socket/handlers/commentHandler';
import BodyItemPage from './body/BodyItemPage';
import Comments from './comments/Comments';
import styles from './styles.module.scss';
import TitleItemPage from './title/TitleItemPage';
import CommentRequest from '../../../shared/models/comment/commentRequest';
import { updateVisitsItem } from '../../../shared/apis/itemApi';

const ItemPage = () => {
  const { userId, name } = useAppSelector(selectUser);
  const { itemId, id } = useParams();
  const dispatch = useAppDispatch();
  const {
    item, collection, comments,
  } = useAppSelector((state) => state.itemPage);

  useEffect(() => {
    dispatch(getItemData({
      userId,
      itemId: itemId as string,
      collectionId: id as string,
    }));
    updateVisitsItem(itemId as string);
    openSocket(itemId as string);
    return () => disconnect();
  }, []);

  const saveComment = (text: string) => {
    const requestData: CommentRequest = {
      userId,
      collectionId: id as string,
      itemId: itemId as string,
      text,
      sender: name,
    };
    sendComment(requestData);
  };

  return (
    <Grid
      container
      className={styles.root}
    >
      {item && collection && comments
        && (
        <>
          <Grid item xs={12}>
            <TitleItemPage item={item} collection={collection} />
          </Grid>
          <Grid item xs={12}>
            <BodyItemPage item={item} />
          </Grid>
          <Grid item xs={12}>
            <Comments saveComment={saveComment} comments={comments} />
          </Grid>
        </>
        )}
    </Grid>
  );
};

export default ItemPage;
