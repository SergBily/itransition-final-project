import React, { useEffect } from 'react';
import {
  Box, Chip, Rating, Typography,
} from '@mui/material';
import classNames from 'classnames';
import gsap from 'gsap';
import { FormattedMessage } from 'react-intl';
import ItemStructure from '../../../../shared/models/items/itemStructure.model';
import CollectionResponse from '../../../../shared/models/newCollection/collectionResponse.model';
import styles from './styles.module.scss';
import generateKey from '../../../../shared/utils/UniqueKey';

interface TitleItemPageProps {
  item: ItemStructure,
  collection: CollectionResponse
}

const TitleItemPage = ({ item, collection }: TitleItemPageProps) => {
  // const [value, setValue] = React.useState<number | null>(2);
  useEffect(() => {
    gsap.to('.title', {
      x: '100%', opacity: 1, duration: 0.9, ease: 'circ',
    });
  }, []);

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
          <Rating name="read-only" value={4.5} precision={0.5} readOnly />
        </Box>
      </Box>
      <Typography
        variant="h2"
        className={styles.title}
      >
        {item.title}
      </Typography>
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
