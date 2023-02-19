import React, { useState } from 'react';
import {
  Card, CardActionArea, CardMedia, CardContent, Typography,
} from '@mui/material';
import CollectionStructure from '../../../../shared/models/newCollection/collectionStructure.model';
import CollectionDashboard from '../collectionDashboard/CollectionDashboard';
import styles from './styles.module.scss';

interface CollectionProps {
  payload: CollectionStructure,
}

const Collection = ({ payload }: CollectionProps) => {
  const {
    image, topic, title, description,
  } = payload;
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Card
      className={styles.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {topic}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            className={styles.description}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CollectionDashboard onItem={isHovering} />
    </Card>
  );
};

export default Collection;
