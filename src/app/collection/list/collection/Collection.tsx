import React, { useState } from 'react';
import {
  Card, CardActionArea, CardMedia, CardContent, Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import CollectionDashboard from '../collectionDashboard/CollectionDashboard';
import styles from './styles.module.scss';
import AllCollectionsResponse from '../../../../shared/models/allCollections/allCollectionsResponse';
import { deleteCollectionApi } from '../../../../shared/apis/collectionApi';
import getNameImage from '../../../../shared/utils/getNameImage';
import { useAppDispatch } from '../../../../shared/hooks/hooks';
import { getAllCollection, reset } from '../../../../redux/features/allCollectionSlice';
import localStorageKeys from '../../../../shared/constants/localStorageKeys';
import { deleteImage } from '../../../../shared/apis/firebaseApi';
import toastConfig from '../../../../shared/toast/toastConfig';

interface CollectionProps {
  payload: AllCollectionsResponse,
}

const Collection = ({ payload }: CollectionProps) => {
  const {
    imageUrl, topic, title, description, id,
  } = payload;
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const deleteCollection = async () => {
    try {
      if (imageUrl) {
        const imageName = getNameImage(imageUrl);
        await Promise.all([
          deleteImage(imageName),
          deleteCollectionApi(id),
        ]);
      } else {
        await deleteCollectionApi(id);
      }
      dispatch(getAllCollection(localStorage.getItem(localStorageKeys.USERId) as string));
      dispatch(reset());
    } catch (e) {
      toast.error(<FormattedMessage id="app.collection.delete" />, toastConfig);
    }
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
      <CollectionDashboard payload={{
        isHovering, id, title, deleteCollection,
      }}
      />
    </Card>
  );
};

export default Collection;
