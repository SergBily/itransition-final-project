import React from 'react';
import { TextField } from '@mui/material';
import PayloadField from '../../../../shared/models/items/payloadField';
import styles from './styles.module.scss';

interface DateFieldProps {
  payload: PayloadField
}

const DateField = ({ payload }: DateFieldProps) => {
  const { key, value, register } = payload;
  return (
    <TextField
      className={styles.textField}
      id={key}
      type="date"
      defaultValue={value}
      fullWidth
      size="small"
      {...register(`customFields.date.0.${key}`)}
    />
  );
};

export default DateField;
