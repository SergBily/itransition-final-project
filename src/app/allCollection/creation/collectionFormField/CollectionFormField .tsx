import React from 'react';
import {
  Grid, Typography, Box,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface CollectionFormFieldProps {
  label: string,
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  children: React.ReactNode
}

const CollectionFormField = ({ label, Icon, children }: CollectionFormFieldProps) => {
  const rootClass = classNames(styles.root, {
    [styles.positionStart]: label === 'description' || label === 'image',
    [styles.positionCenter]: label !== 'description',
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
          <Icon />
          <Typography
            variant="h6"
            color="initial"
            className={styles.text}
          >
            <FormattedMessage id={`app.collection.new.field.${label}`} />
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        sm={label === 'description' ? 9 : 4}
        xs={12}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default CollectionFormField;
