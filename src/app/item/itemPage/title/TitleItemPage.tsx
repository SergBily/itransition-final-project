import React, { useEffect } from 'react';
import {
  Box, Chip, Rating, Typography, Tooltip,
} from '@mui/material';
import classNames from 'classnames';
import gsap from 'gsap';
import { FormattedMessage } from 'react-intl';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ItemStructure from '../../../../shared/models/items/itemStructure.model';
import CollectionResponse from '../../../../shared/models/newCollection/collectionResponse.model';
import styles from './styles.module.scss';
import generateKey from '../../../../shared/utils/UniqueKey';
import { useAppSelector } from '../../../../shared/hooks/hooks';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import { like } from '../../../../redux/features/itemPageSlice';
import { addLikeItem, removeLikeItem } from '../../../../shared/apis/itemApi';
import { store } from '../../../../redux/store';

interface TitleItemPageProps {
  item: ItemStructure,
  collection: CollectionResponse
}

const TitleItemPage = ({ item, collection }: TitleItemPageProps) => {
  const [value, setValue] = React.useState<number | null>(0);
  const { userId } = useAppSelector(selectUser);
  useEffect(() => {
    setValue(item.visits);
    gsap.to('.title', {
      x: '100%', opacity: 1, duration: 0.9, ease: 'circ',
    });
  }, []);

  const handleAddLike = async () => {
    const updatedItem = await addLikeItem([item.id, userId]);
    store.dispatch(like(updatedItem.data));
  };

  const handleRemoveLike = async () => {
    const updatedItem = await removeLikeItem([item.id, userId]);
    store.dispatch(like(updatedItem.data));
  };

  return (
    <Box
      component="div"
      className={classNames(styles.root, 'title')}
    >
      <Box
        component="div"
        className={styles.containerRating}
      >
        <Box
          component="div"
          className={styles.topic}
        >
          <Typography variant="subtitle1">{collection.topic.toUpperCase()}</Typography>
          <Typography variant="body1">{collection.title}</Typography>
        </Box>
        <Box
          component="div"
          className={styles.rating}
        >
          <Typography component="legend">
            <FormattedMessage id="app.item.rating" />
          </Typography>
          <Rating name="read-only" value={value} precision={5} readOnly />
        </Box>
      </Box>
      <Box component="div" className={styles.boxTitle}>
        <Typography
          variant="h2"
          className={styles.title}
        >
          {item.title}
        </Typography>
        {userId && (item.likes && item.likes.includes(userId))
          ? (
            <Tooltip title="Like">
              <Box
                component="button"
                className={styles.btnLikes}
                onClick={handleRemoveLike}
              >
                <FavoriteIcon fontSize="large" color="error" />
              </Box>
            </Tooltip>
          )
          : (
            <Tooltip title="Like">
              <Box
                component="button"
                className={styles.btnLikes}
                onClick={handleAddLike}
              >
                <FavoriteBorderIcon fontSize="large" color="error" />
              </Box>
            </Tooltip>
          )}
      </Box>
      <Box
        component="div"
        className={styles.boxChip}
      >
        {item.tags.map((tag) => (
          <Chip
            label={tag}
            key={generateKey()}
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};

export default TitleItemPage;
