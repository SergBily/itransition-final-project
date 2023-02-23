import React, { useEffect, useState } from 'react';
import {
  Box, Checkbox, Grid, Paper, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import MarkdownForm from '../../../../common/markdown/markdownForm/MarkdownForm';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import Spinner from '../../../../common/spinner/Spinner';
import toastConfig from '../../../../shared/toast/toastConfig';
import ItemFormField from '../itemFormField/ItemFormField';
import TagsField from '../tagsField/TagsField';
import { reset } from '../../../../redux/features/newCollectionSlice';
import StringField from '../stringField/StringField';
import NumberField from '../numberField/NumberField';
import DateField from '../dateField/DateField';
import generateKey from '../../../../shared/utils/UniqueKey';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import { createItem } from '../../../../redux/features/itemSlice';
import {
  selectItem, selectStatus,
  selectErrorMessage, selectErrors,
} from '../../../../redux/selectors/newItemSelector';
import TitleField from '../titleField/TitleField';
import FormButtonGroup from '../../../../common/formButtonGroup/FormButtonGroup';

const test = {
  string: [{ COULEUR: 'Blanccc' }],
  number: [{ DEGRÉ: 12 }, { Work: 15 }],
  textarea: [{ CULTURE: '_HVE_ (Haute Valeur Environnementale)' },
    { this: 'tutu' }],
  date: [{ MILLÉSIME: '2020-11-12' }],
  checkbox: [{ checkbox: true }],
};

const NewItem = () => {
  const {
    register, handleSubmit, watch, setValue, formState: { errors },
  } = useForm<Record<string, string>>();
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const item = useAppSelector(selectItem);
  const errorMessage = useAppSelector(selectErrorMessage);
  const error = useAppSelector(selectErrors);
  const { userId } = useAppSelector(selectUser);

  // const navigate = useNavigate();

  useEffect(() => {
    if (status === 'success') {
      toast.success(<FormattedMessage
        id="app.item.response.success"
        values={{ title: item?.title }}
      />, toastConfig);
      // navigate(routes.COLLECTIONS);
      dispatch(reset());
    }
  }, [status]);

  const onFormSubmit = async (data: any): Promise<void> => {
    const itemData = {
      ...data,
      tags,
      userId,
      collectionId: '63f4f7e3645a7fe1a427fe89',
    };
    console.log(itemData);

    dispatch(createItem(itemData));
  };

  const getCustomFields = () => {
    let res: JSX.Element[] = [];
    for (const [key, value] of Object.entries(test)) {
      const bb = value.map((e) => Object.entries(e).map((v) => {
        let m: JSX.Element;
        switch (key) {
          case 'string':
            m = (
              <ItemFormField payload={{ label: v[0], size: '' }} key={generateKey()}>
                <StringField payload={{ key: v[0], value: v[1], register }} />
              </ItemFormField>
            );
            break;
          case 'number':
            m = (
              <ItemFormField payload={{ label: v[0], size: '' }} key={generateKey()}>
                <NumberField payload={{ key: v[0], value: v[1], register }} />
              </ItemFormField>
            );
            break;
          case 'textarea':
            m = (
              <ItemFormField payload={{ label: v[0], size: 'full' }} key={generateKey()}>
                <MarkdownForm payload={{
                  label: v[0], value: v[1], register, watch, setValue,
                }}
                />
              </ItemFormField>
            );
            break;
          case 'date':
            m = (
              <ItemFormField payload={{ label: v[0], size: '' }} key={generateKey()}>
                <DateField payload={{ key: v[0], value: v[1], register }} />
              </ItemFormField>
            );
            break;
          default:
            m = (
              <ItemFormField payload={{ label: v[0], size: '' }} key={generateKey()}>
                <Checkbox {...register(`customFields.checkbox.0.${v[0]}`)} />
              </ItemFormField>
            );
            break;
        }
        return m;
      }));
      res = [...res, ...bb.flat()];
    }
    return res;
  };

  return (
    <Paper
      elevation={5}
      className={styles.wrapper}
    >
      <Typography
        variant="h3"
        className={styles.title}
      >
        <FormattedMessage id="app.item.creator.header" />
      </Typography>
      <Grid container>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className={styles.form}
        >
          <ItemFormField payload={{ label: 'title', size: '' }}>
            <TitleField payload={{
              value: '', error, errorMessage, errors, register,
            }}
            />
          </ItemFormField>
          <ItemFormField payload={{ label: 'tags', size: '' }}>
            <TagsField setTags={setTags} tags={tags} />
          </ItemFormField>
          {getCustomFields().map((e) => e)}
          <Box
            component="div"
            className={styles.buttonsBlock}
          >
            <FormButtonGroup type="item" />
          </Box>
        </form>
      </Grid>
      {status === 'loading' && <Spinner />}
    </Paper>
  );
};

export default NewItem;
