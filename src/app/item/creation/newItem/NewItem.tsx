import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox, Grid, Paper, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import gsap from 'gsap';
import classNames from 'classnames';
import MarkdownForm from '../../../../common/markdown/markdownForm/MarkdownForm';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/stateHooks';
import ItemFormField from '../../form/itemFormField/ItemFormField';
import StringField from '../../fields/stringField/StringField';
import NumberField from '../../fields/numberField/NumberField';
import DateField from '../../fields/dateField/DateField';
import generateKey from '../../../../shared/utils/UniqueKey';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import { getItemsCollection } from '../../../../redux/features/ItemsCollectionSlice';
import checkTitleIsNan from '../../../../shared/utils/checkTitleIsNan';
import toastConfig from '../../../../shared/toast/toastConfig';
import { createItem, itemReset } from '../../../../redux/features/itemSlice';
import routes from '../../../../shared/constants/routes';
import TitleField from '../../fields/titleField/TitleField';
import TagsField from '../../fields/tagsField/TagsField';
import FormButtonGroup from '../../../../common/formButtonGroup/FormButtonGroup';
import Spinner from '../../../../common/spinner/Spinner';
import Collection from '../../../../shared/models/allCollections/collection.type';
import getManager from '../../../../shared/utils/getManager';
import ControlMode from '../../../../common/controlMode/ControlMode';

const customFieldsInit = {
  number: {},
  string: {},
  textarea: {},
  date: {},
  checkbox: {},
};

const createField = (label: string, size: string, children: JSX.Element): JSX.Element => (
  <ItemFormField payload={{ label, size }} key={generateKey()}>
    {children}
  </ItemFormField>
);

const NewItem = () => {
  const {
    register, handleSubmit, getValues, setValue, formState: { errors },
  } = useForm<Record<string, string>>();
  const [fields, setFields] = useState<JSX.Element[] | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, manageId } = useParams();
  const { userId } = useAppSelector(selectUser);
  const { collection, status } = useAppSelector((state) => state.items);
  const {
    errors: errorsBD, item, errorMessage, status: newItemStatus,
  } = useAppSelector((state) => state.item);

  useEffect(() => {
    dispatch(getItemsCollection(id as string));
    const animation = gsap.timeline();
    animation.to('.new', {
      x: '100%', opacity: 1, duration: 0.7, ease: 'circ',
    });
    animation.to('.box__custom', {
      height: 'auto', opacity: 1, duration: 0.9, ease: 'circ',
    });
  }, []);

  useEffect(() => {
    if (newItemStatus === 'success') {
      toast.success(<FormattedMessage
        id="app.item.response.success"
        values={{ title: item?.title }}
      />, toastConfig);
      navigate(manageId
        ? `${routes.COLLECTION}${id}/${manageId}`
        : `${routes.COLLECTION}${id}`);
      dispatch(itemReset());
    }
  }, [newItemStatus]);

  const onFormSubmit = (data: Record<string, string>): void => {
    const itemData: any = {
      title: data.title,
      customFields: data?.customFields
        ? data.customFields : customFieldsInit,
      tags,
      userId: getManager(manageId, userId),
      collectionId: id as string,
    };
    dispatch(createItem(itemData));
  };

  const getCustomFields = (c: Collection): JSX.Element[] => {
    const elementsJsx = Object.entries(c.customFields).map(
      (e) => e[1].map((v: string) => {
        let m: JSX.Element;
        switch (e[0]) {
          case 'string':
            m = (
              createField(
                v,
                '',
                <StringField payload={{ key: v, register }} />,
              )
            );
            break;
          case 'number':
            m = (
              createField(
                v,
                '',
                <NumberField payload={{ key: v, register }} />,
              )
            );
            break;
          case 'textarea':
            m = (
              createField(
                v,
                'full',
                <MarkdownForm payload={{
                  label: v, register, getValues, setValue,
                }}
                />,
              )
            );
            break;
          case 'date':
            m = (
              createField(
                v,
                '',
                <DateField payload={{ key: v, register }} />,
              )
            );
            break;
          default:
            m = (
              createField(
                v,
                '',
                <Checkbox {...register(`customFields.checkbox.${checkTitleIsNan(v)}`)} />,
              )
            );
            break;
        }
        return m;
      }),
    );
    return elementsJsx.flat();
  };

  useEffect(() => {
    if (status === 'success') {
      setFields(getCustomFields(collection as Collection));
    }
  }, [status]);

  return (
    <>
      <Paper
        elevation={5}
        className={classNames(styles.wrapper, 'new')}
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
                value: '', errorsBD, errorMessage, errors, register,
              }}
              />
            </ItemFormField>
            <ItemFormField payload={{ label: 'tags', size: '' }}>
              <TagsField setTags={setTags} tags={tags} />
            </ItemFormField>
            <Box
              component="div"
              className={classNames(styles.boxCustom, 'box__custom')}
            >
              {fields && fields.map((e) => e)}
            </Box>
            <Box
              component="div"
              className={styles.buttonsBlock}
            >
              <FormButtonGroup type="item1" id={id as string} manageId={manageId} />
            </Box>
          </form>
          {(newItemStatus === 'loading' || status === 'loading') && <Spinner />}
        </Grid>
      </Paper>
      { manageId && (<ControlMode />) }
    </>
  );
};

export default NewItem;
