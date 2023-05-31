import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Stack, Chip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { FormattedMessage } from 'react-intl';
import generateKey from '../../../../shared/utils/UniqueKey';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/stateHooks';
import { getTags } from '../../../../redux/features/itemSlice';
import Tags from '../../../../shared/models/items/tags.module';

const filter = createFilterOptions<Tags>();

// const top100Films: Tags[] = [{ title: 'hello' }, { title: 'bye' }, { title: 'Gud' }];

interface TagsFieldProps {
  setTags: React.Dispatch<React.SetStateAction<string[]>>,
  tags: string[]
}

const TagsField = ({ setTags, tags }: TagsFieldProps) => {
  const [nameTag, setNameTag] = useState<string>('');
  const [allTags, setAllTags] = useState<Tags[] | null>(null);
  const {
    tags: tagsBD, tagsStatus,
  } = useAppSelector((store) => store.item);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

  useEffect(() => {
    if (tagsStatus === 'success') {
      setAllTags(tagsBD);
    }
  }, [tagsStatus]);

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
            key={generateKey()}
            data-name={s}
            label={s}
            variant="outlined"
            onDelete={handleDelete}
          />
        ))}
      </Stack>
      {allTags && (
        <Box component="div" className={styles.fieldBlock}>
          <Autocomplete
            className={styles.textField}
            value={nameTag}
            onChange={(_event, newValue) => {
              if (typeof newValue === 'string') {
                setNameTag(newValue);
              } else if (newValue && newValue.inputValue) {
                setNameTag(newValue.inputValue);
              } else {
                setNameTag(newValue?.title as string);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option.title);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="tags"
            options={allTags}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.title;
            }}
            renderOption={(props, option) => <li {...props} key={generateKey()}>{option.title}</li>}
            sx={{ width: '100%' }}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label={<FormattedMessage id="app.item.new.field.tags.placeholder" />}
              />
            )}
          />
          <Box component="div">
            <Box
              component="button"
              type="button"
              onClick={handleSaveTag}
              className={styles.button}
            >
              <SaveIcon color="info" className={styles.icon} fontSize="large" />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TagsField;
