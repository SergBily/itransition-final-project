import React from 'react';
import {
  Grid, Typography, Box,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { FormattedMessage } from 'react-intl';

interface CollectionFormFieldProps {
  label: string,
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
  children: React.ReactNode
}

const CollectionFormField = ({ label, Icon, children }: CollectionFormFieldProps) => {
  console.log(1);

  return (
    <Grid
      container
      sx={{
        alignItems: label === 'description' ? 'flex-start' : 'center',
        gap: 4,
        mt: 2,
      }}
    >
      <Grid item xs={2}>
        <Box sx={{
          display: 'flex',
          gap: 3,
          alignItems: 'center',
          ml: 1,
        }}
        >
          <Icon />
          <Typography
            variant="h5"
            color="initial"
          >
            <FormattedMessage id={`app.collection.new.field.${label}`} />
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={label === 'description' ? 9 : 4}>
        {children}
      </Grid>
    </Grid>
  );
};

export default CollectionFormField;
