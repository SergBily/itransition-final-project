import React, { useState } from 'react';
import {
  Card, CardActionArea, CardMedia, CardContent, Typography,
} from '@mui/material';
import CollectionStructure from '../../../shared/models/collectionStructure.model';
import CollectionDashboard from './CollectionDashboard';

interface CollectionProps {
  payload: CollectionStructure,
}

const Collection = ({ payload }: CollectionProps) => {
  const {
    img, topic, title, description,
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
      sx={{
        maxWidth: 272,
        minHeight: 400,
        maxHeight: 400,
        position: 'relative',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={img}
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
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: 125, maxHeight: 125, overflow: 'scroll' }}
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
