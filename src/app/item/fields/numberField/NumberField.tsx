import React from 'react';
import { TextField } from '@mui/material';
import PayloadField from '../../../../shared/models/items/payloadField.types';
import styles from './styles.module.scss';
import checkTitleIsNan from '../../../../shared/utils/checkTitleIsNan';

interface NumberFieldProps {
  payload: PayloadField
}

const NumberField = ({ payload }: NumberFieldProps) => {
  const { key, value = '', register } = payload;

  return (
    <TextField
      className={styles.textField}
      id={key}
      type="number"
      defaultValue={value}
      fullWidth
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      {...register(`customFields.number.${checkTitleIsNan(key)}`)}
    />
  );
};

export default NumberField;
