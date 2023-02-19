import React, { useState } from 'react';
import {
  Card, CardActionArea, CardMedia, CardContent, Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CollectionDashboard from '../collectionDashboard/CollectionDashboard';
import styles from './styles.module.scss';
import AllCollectionsResponse from '../../../../shared/models/allCollections/allCollectionsResponse';

interface CollectionProps {
  payload: AllCollectionsResponse,
}

const Collection = ({ payload }: CollectionProps) => {
  const {
    imageUrl, topic, title, description, id,
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
      id={id}
      className={styles.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className={styles.topic}
          >
            {topic.toUpperCase()}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="p"
            className={styles.title}
          >
            {title}
          </Typography>
          <Typography
            className={styles.description}
            component="div"
            variant="body2"
            color="text.secondary"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description}
            </ReactMarkdown>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CollectionDashboard onItem={isHovering} id={id} title={title} />
    </Card>
  );
};

export default Collection;
