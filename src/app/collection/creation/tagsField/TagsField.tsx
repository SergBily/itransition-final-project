import React, { useState } from 'react';
import {
  Box, TextField, Stack, Chip, InputAdornment,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { v4 as uuid4 } from 'uuid';
import styles from './styles.module.scss';

interface TagsFieldProps {
  setTags: React.Dispatch<React.SetStateAction<string[]>>,
  tags: string[]
}

const TagsField = ({ setTags, tags }: TagsFieldProps) => {
  const [nameTag, setNameTag] = useState<string>('');

  const handleSaveTag = (): void => {
    setTags((p) => {
      if (p.includes(nameTag)) {
        return p;
      }
      return [...p, nameTag];
    });
    setNameTag('');
  };

  const handleDelete = (e: React.MouseEvent) => {
    const f = ((e.currentTarget as HTMLOrSVGImageElement)
      .parentElement as HTMLDivElement).dataset.name as string;
    setTags((p) => p.filter((b) => b !== f));
  };

  return (
    <Box
      component="div"
      className={styles.root}
    >
      <Stack
        direction="row"
        spacing={1}
        className={styles.stack}
      >
        {tags.map((s) => (
          <Chip
            key={uuid4()}
            data-name={s}
            label={s}
            variant="outlined"
            onDelete={handleDelete}
          />
        ))}
      </Stack>
      <Box component="div" className={styles.boxInput}>
        <TextField
          fullWidth
          className={styles.textField}
          id="title-field"
          value={nameTag}
          onChange={(e) => setNameTag(e.target.value)}
          size="small"
          InputProps={{
            endAdornment:
  <InputAdornment position="end">
    <Box
      component="button"
      type="button"
      onClick={handleSaveTag}
      className={styles.button}
    >
      <SaveIcon color="info" className={styles.icon} />
    </Box>
  </InputAdornment>,
          }}
        />
      </Box>
    </Box>
  );
};

export default TagsField;
