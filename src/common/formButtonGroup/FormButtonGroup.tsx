import React from 'react';
import {
  Button, Grid, Typography,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import styles from './styles.module.scss';

interface FormButtonGroupProps {
  type: string,
  id: string,
  manageId: string | undefined
}

const FormButtonGroup = ({ type, id, manageId }: FormButtonGroupProps) => {
  const manageCollection = manageId ? `${routes.COLLECTIONS}/${manageId}` : routes.COLLECTIONS;
  const manageIlem = manageId ? `${routes.COLLECTION}${id}/${manageId}` : `${routes.COLLECTION}${id}`;
  return (
    <>
      <Grid item xs={8} sm={2}>
        <Button
          fullWidth
          color="info"
          type="submit"
          variant="contained"
        >
          <FormattedMessage id={`app.groups.button.create.${type}`} />
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Link
          to={type === 'item1' || type === 'item2' ? manageIlem : manageCollection}
          className={styles.link}
        >
          <Typography variant="button">
            <FormattedMessage id="app.collection.button.cancel" />
          </Typography>
        </Link>
      </Grid>
    </>
  );
};
export default FormButtonGroup;
