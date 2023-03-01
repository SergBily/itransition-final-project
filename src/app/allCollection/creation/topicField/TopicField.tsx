import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';
import CollectionStructure from '../../../../shared/models/newCollection/collectionStructure.model';
import requiredValidator from '../../../../shared/validators/requiredValidator';

const topics = ['books', 'cars', 'wine', 'stamps', 'paintings'];

interface TopicFieldProps {
  register: UseFormRegister<Record<string, string>>;
  errors: FieldErrors<CollectionStructure>;
  selectValue?: string | undefined;
}

const TopicField = (payload: TopicFieldProps) => {
  const { register, errors, selectValue = '' } = payload;

  return (
    <>
      <Box
        component="div"
        className={styles.root}
      >
        <FormControl fullWidth>
          <InputLabel id="topic-select-label">
            <FormattedMessage id="app.collection.topic.select" />
          </InputLabel>
          <Select
            labelId="topic-select-label"
            id="topic-select"
            label="Topic"
            size="small"
            value={selectValue}
            defaultValue=""
            error={!!errors.topic?.message}
            {...register(
              'topic',
              requiredValidator('app.collection.response.error.topic'),
            )}
          >
            {topics.map((e) => (
              <MenuItem key={e} value={e}>
                <FormattedMessage id={`app.collection.topic.select.${e}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="p" className={styles.error}>
        {!!errors.topic?.message
              && (
                <FormattedMessage id={errors.topic?.message} />
              )}
      </Box>
    </>
  );
};

export default TopicField;
