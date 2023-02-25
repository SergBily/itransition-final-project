import React from 'react';
import { TextField } from '@mui/material';
import PayloadField from '../../../../shared/models/items/payloadField';
import styles from './styles.module.scss';
import checkTitleIsNan from '../../../../shared/utils/checkTitleIsNan';

interface StringFieldProps {
  payload: PayloadField
}

const StringField = ({ payload }: StringFieldProps) => {
  const { key, value = '', register } = payload;
  return (
    <TextField
      className={styles.textField}
      id={key}
      type="text"
      defaultValue={value}
      fullWidth
      size="small"
      {...register(`customFields.string.${checkTitleIsNan(key)}`)}
    />
  );
};

export default StringField;
