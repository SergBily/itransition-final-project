import React, { useState } from 'react';
import {
  Card, CardActionArea, CardMedia, CardContent, Typography, Skeleton,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import CollectionDashboard from '../collectionDashboard/CollectionDashboard';
import styles from './styles.module.scss';
import AllCollectionsResponse from '../../../../shared/models/allCollections/allCollectionsResponse.model';
import { deleteCollectionApi } from '../../../../shared/apis/collectionApi';
import getNameImage from '../../../../shared/utils/getNameImage';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import { getAllCollection, allCollectionReset } from '../../../../redux/features/allCollectionSlice';
import { deleteImage } from '../../../../shared/apis/firebaseApi';
import toastConfig from '../../../../shared/toast/toastConfig';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import routes from '../../../../shared/constants/routes';
import { defaultImagesName } from '../../../../shared/constants/collectionDefaultImage';
import getManager from '../../../../shared/utils/getManager';

interface CollectionProps {
  payload: AllCollectionsResponse;
  manageId: string | undefined;
}

const Collection = ({ payload, manageId }: CollectionProps) => {
  const {
    imageUrl, topic, title, description, id,
  } = payload;
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(selectUser);
  const { status } = useAppSelector(((state) => state.collections));
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const deleteCollection = async () => {
    try {
      const imageName = getNameImage(imageUrl);
      if (!defaultImagesName.includes(imageName)) {
        await Promise.all([
          deleteImage(imageName, getManager(manageId, userId)),
          deleteCollectionApi(id),
        ]);
      } else {
        await deleteCollectionApi(id);
      }
      dispatch(getAllCollection(getManager(manageId, userId)));
      dispatch(allCollectionReset());
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
      <Link
        className={styles.link}
        to={manageId ? `${routes.COLLECTION}${id}/${manageId}` : `${routes.COLLECTION}${id}`}
      >
        <CardActionArea>
          {status === 'loading'
            ? (<Skeleton width={272} height={160} variant="rounded" />)
            : (
              <CardMedia
                component="img"
                height="160"
                image={imageUrl}
                alt={title}
              />
            )}
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="p"
              className={styles.topic}
            >
              <FormattedMessage id={`app.collection.topic.${topic}`} />
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
      </Link>
      <CollectionDashboard
        payload={{
          isHovering, id, title, deleteCollection,
        }}
        manageId={manageId}
      />
    </Card>
  );
};

export default Collection;
