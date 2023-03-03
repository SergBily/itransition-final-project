import React from 'react';
import {
  Card, CardActionArea, CardContent, Typography, Fab, Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import routes from '../../../../shared/constants/routes';
import styles from './styles.module.scss';

interface CollectionCreatorProps {
  id: string | undefined
}

const CollectionCreator = ({ id }: CollectionCreatorProps) => (
  <Card className={styles.root}>
    <Link
      to={id ? `${routes.COLLECTION_CREATE}/${id}` : routes.COLLECTION_CREATE}
      className={styles.link}
    >
      <CardActionArea className={styles.card}>
        <Tooltip title={<FormattedMessage id="app.collection.create2" />}>
          <Fab
            component="div"
            color="info"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            <FormattedMessage id="app.collection.create" />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Link>
  </Card>
);

export default CollectionCreator;
