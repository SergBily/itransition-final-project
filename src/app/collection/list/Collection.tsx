import React from 'react';
import {
  Card, CardActionArea, CardMedia, CardContent, Typography,
} from '@mui/material';
import CollectionStructure from '../../../shared/models/collectionStructure.model';

interface CollectionProps {
  payload: CollectionStructure
}

const Collection = ({ payload }: CollectionProps) => {
  const {
    img, topic, title, description,
  } = payload;

  return (
    <Card sx={{ maxWidth: 272, minHeight: 400, maxHeight: 400 }}>
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
    </Card>
  );
};

export default Collection;
