import React, { useEffect, useState } from 'react';
import {
  Box, Grid,
} from '@mui/material';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import TagsField from '../../fields/tagsField/TagsField';
import TitleField from '../../fields/titleField/TitleField';
import FormButtonGroup from '../../../../common/formButtonGroup/FormButtonGroup';
import ItemFormField from '../itemFormField/ItemFormField';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import { createItem, newItemReset } from '../../../../redux/features/newItemSlice';
import NewItemRequest from '../../../../shared/models/items/newItemRequest.model';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import Spinner from '../../../../common/spinner/Spinner';
import toastConfig from '../../../../shared/toast/toastConfig';
import styles from './styles.module.scss';
import routes from '../../../../shared/constants/routes';

interface ItemFormProps {
  getCustomFields: () => JSX.Element[],
  handleSubmit: UseFormHandleSubmit<Record<string, string>>,
  errors: FieldErrors<Record<string, string>>,
  id: string,
  register: UseFormRegister<Record<string, string>>
}

const ItemForm = ({
  getCustomFields, handleSubmit, errors, id, register,
}: ItemFormProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useAppSelector(selectUser);
  const {
    errors: error, item, errorMessage, status,
  } = useAppSelector((state) => state.newItem);

  useEffect(() => {
    if (status === 'success') {
      toast.success(<FormattedMessage
        id="app.item.response.success"
        values={{ title: item?.title }}
      />, toastConfig);
      navigate(`${routes.COLLECTION}${id}`);
    }
    console.log(status);

    dispatch(newItemReset());
  }, [status]);

  const onFormSubmit = (data: any): void => {
    const itemData: NewItemRequest = {
      ...data,
      tags,
      userId,
      collectionId: id,
    };
    dispatch(createItem(itemData));
  };

  return (
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
          <FormButtonGroup type="item" id={id} />
        </Box>
      </form>
      {status === 'loading' && <Spinner />}
    </Grid>
  );
};

export default ItemForm;
