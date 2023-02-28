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
  id: string
}

const FormButtonGroup = ({ type, id }: FormButtonGroupProps) => (
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
        to={type === 'item1' || type === 'item2' ? `${routes.COLLECTION}${id}` : routes.COLLECTIONS}
        className={styles.link}
      >
        <Typography variant="button">
          <FormattedMessage id="app.collection.button.cancel" />
        </Typography>
      </Link>
    </Grid>
  </>
);
export default FormButtonGroup;
