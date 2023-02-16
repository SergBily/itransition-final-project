import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';

const topics = ['books', 'cars', 'wine', 'stamps', 'paintings'];

interface TopicFieldProps {
  register: UseFormRegister<FieldValues>,
}

const TopicField = ({ register }: TopicFieldProps) => (
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
        defaultValue=""
        {...register('topic')}
      >
        {topics.map((e) => (
          <MenuItem key={e} value={e}>
            <FormattedMessage id={`app.collection.topic.select.${e}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default TopicField;
