import React from 'react';
import {
  Grid, Typography, Box,
} from '@mui/material';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';

type ItemFormFieldPayload = {
  label: string,
  size: string
};

interface ItemFormFieldProps {
  payload: ItemFormFieldPayload,
  children: React.ReactNode
}

const ItemFormField = ({ payload, children }: ItemFormFieldProps) => {
  const { label, size } = payload;
  const rootClass = classNames(styles.root, {
    [styles.positionStart]: size === 'full',
    [styles.positionCenter]: !size,
  });

  return (
    <Grid
      container
      className={rootClass}
    >
      <Grid item xs={12} sm={2}>
        <Box
          component="div"
          className={styles.title}
        >
          <Typography
            variant="h6"
            color="initial"
            className={styles.text}
          >
            {label === 'title' || label === 'tags'
              ? (<FormattedMessage id={`app.item.new.field.${label}`} />)
              : (<span>{ label }</span>)}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        sm={size ? 9 : 4}
        xs={12}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default ItemFormField;
