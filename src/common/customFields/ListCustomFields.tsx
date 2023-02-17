import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {
  Chip, InputAdornment, Stack, TextField,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { v4 as uuid4 } from 'uuid';
import { FormattedMessage } from 'react-intl';
import CustomFields from '../../shared/models/customFields.model';
import styles from './styles.module.scss';
import screenSize from '../../shared/constants/viewMobile';

type Fields = 'number' | 'string' | 'textarea' | 'data' | 'checkbox';

const typesField = [
  { type: 'number', name: 'number field' },
  { type: 'string', name: 'string field' },
  { type: 'textarea', name: 'textarea field' },
  { type: 'data', name: 'data field' },
  { type: 'checkbox', name: 'checkbox field' },
];

interface ListCustomFieldsProps {
  setCustomItemFields: React.Dispatch<React.SetStateAction<CustomFields>>,
}

const ListCustomFields = ({ setCustomItemFields }: ListCustomFieldsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [titleField, settitleField] = useState<string>('');
  const [isTitleField, setisTitleField] = useState<boolean>(false);
  const [selectedField, setselectedField] = useState<Fields>('number');
  const [addedField, setaddedField] = useState<string[]>([]);
  const [widthSize, setWidthSize] = useState<number>(screenSize.INITIAL);
  const reportWindowSize = () => {
    setWidthSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', reportWindowSize);
    return () => window.removeEventListener('resize', reportWindowSize);
  }, []);

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const handleTypeField = (e: React.MouseEvent<HTMLDivElement>): void => {
    const typeField = (e.target as HTMLButtonElement).dataset.type;
    setOpen(false);
    setTimeout(() => setisTitleField(true), 300);
    setselectedField(typeField as Fields);
  };

  const handleSaveTitleField = (): void => {
    setaddedField((p) => [...p, titleField]);
    setCustomItemFields((pre) => ({ ...pre, [selectedField]: [...pre[selectedField], titleField] }));
    setisTitleField(false);
    settitleField('');
  };

  const handleCloseTitleField = (): void => {
    setisTitleField(false);
    settitleField('');
  };

  const handleDelete = (e: React.MouseEvent) => {
    const f = ((e.currentTarget as HTMLOrSVGImageElement)
      .parentElement as HTMLDivElement).dataset.name as string;
    setaddedField((p) => p.filter((r) => r !== f));
    setCustomItemFields((p) => {
      for (const [key, value] of Object.entries(p)) {
        p[key as Fields] = value.filter((b: string) => b !== f);
      }
      return p;
    });
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        className={styles.stack}
      >
        {addedField.map((s) => (
          <Chip
            key={uuid4()}
            data-name={s}
            label={s}
            variant="outlined"
            onDelete={handleDelete}
          />
        ))}
      </Stack>
      <Box
        component="div"
        className={styles.openBox}
      >
        {!isTitleField ? (
          <SpeedDial
            className={styles.speedDial}
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon />}
            direction={widthSize < screenSize[600] ? 'down' : 'right'}
            onOpen={handleOpen}
            onClose={handleClose}
            open={open}
          >
            {(typesField.map((t) => (
              <SpeedDialAction
                className={styles.speedDialAction}
                data-type={t.type}
                id={t.name}
                key={t.name}
                icon={<FormattedMessage id={`app.collection.custom.fields.${t.type}`} />}
                onClick={handleTypeField}
              />
            ))
          )}
          </SpeedDial>
        )
          : (
            <Box component="div" className={styles.boxInput}>
              <TextField
                className={styles.textField}
                id="title-field"
                value={titleField}
                onChange={(e) => settitleField(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment:
              <InputAdornment position="start">
                <FormattedMessage id={`app.collection.custom.fields.${selectedField}`} />
              </InputAdornment>,
                }}
              />
              <Box
                component="button"
                type="button"
                onClick={handleSaveTitleField}
                className={styles.button}
              >
                <SaveIcon color="info" className={styles.icon} />
              </Box>
              <Box
                component="button"
                type="button"
                onClick={handleCloseTitleField}
                className={styles.button}
              >
                <CancelIcon color="info" className={styles.icon} />
              </Box>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default ListCustomFields;
