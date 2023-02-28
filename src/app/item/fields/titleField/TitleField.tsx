import React from 'react';
import { Box, TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from './styles.module.scss';
import requiredValidator from '../../../../shared/validators/requiredValidator';

type TitleFieldPayload = {
  value: string | undefined,
  register: UseFormRegister<Record<string, string>>,
  errors: FieldErrors<Record<string, string>>,
  errorsBD: string[],
  errorMessage: string
};

interface TitleFieldProps {
  payload: TitleFieldPayload
}

const TitleField = ({ payload }: TitleFieldProps) => {
  const {
    errors, errorsBD, errorMessage, value, register,
  } = payload;

  return (
    <>
      <TextField
        className={styles.textField}
        error={(errorsBD && errorsBD[0] === 'title') || !!errors.title?.message}
        fullWidth
        id="title"
        type="text"
        size="small"
        autoFocus
        defaultValue={value}
        {...register(
          'title',
          requiredValidator('app.collection.response.error.title2'),
        )}
      />
      <Box component="p" className={styles.error}>
        {!!errors.title?.message
      && (
        <FormattedMessage id={errors.title?.message} />
      )}
        {errorsBD && errorsBD[0] === 'title'
      && (
      <FormattedMessage id={errorMessage} />
      )}
      </Box>
    </>
  );
};

export default TitleField;
