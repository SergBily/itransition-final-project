import React from 'react';
import {
  Button, Grid, Typography,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import styles from './styles.module.scss';

interface FormButtonGroupProps {
  type: string
}

const FormButtonGroup = ({ type }: FormButtonGroupProps) => (
  <>
    <Grid item xs={8} sm={2}>
      <Button
        fullWidth
        color="info"
        type="submit"
        variant="contained"
      >
        <FormattedMessage id={`app.${type}.button.create`} />
      </Button>
    </Grid>
    <Grid item xs={1}>
      <Link
        to={routes.COLLECTIONS}
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
