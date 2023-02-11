import React from 'react';
import {
  Card, CardActionArea, CardContent, Typography, Fab, Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import routes from '../../../shared/constants/routes';

const CollectionCreator = () => {
  console.log(1);

  return (
    <Card
      sx={{
        maxWidth: 272,
        minHeight: 400,
        maxHeight: 400,
        position: 'relative',
      }}
    >
      <Link
        to={routes.COLLECTIONCREATE}
        style={{
          textDecoration: 'none',
          backgroundColor: 'red',
        }}
      >
        <CardActionArea
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3,
            alignItems: 'center',
            minHeight: 400,
          }}
        >
          <Tooltip title={<FormattedMessage id="app.collection.create2" />}>
            <Fab component="div" color="info" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: 'center' }}
            >
              <FormattedMessage id="app.collection.create" />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default CollectionCreator;