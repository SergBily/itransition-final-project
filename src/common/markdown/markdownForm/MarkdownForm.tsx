import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Paper, TextareaAutosize, Tooltip,
} from '@mui/material';
import {
  UseFormGetValues,
  UseFormRegister, UseFormSetValue,
} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { FormattedMessage } from 'react-intl';
import remarkGfm from 'remark-gfm';
import classNames from 'classnames';
import TabPanel from '../TabPanel';
import MarkdownToolbar from '../markdownToolbar/MarkdownToolbar';
import links from '../../../shared/constants/links';
import markdown from '../../../assets/images/markdown.svg';
import insertMarkup from '../../../shared/utils/insertMarkdownSymbol';
import styles from './styles.module.scss';
import checkTitleIsNan from '../../../shared/utils/checkTitleIsNan';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type MarkdownFormPayload = {
  value?: string,
  label: string,
  register: UseFormRegister<Record<string, string>>,
  getValues: UseFormGetValues<Record<string, string>>,
  setValue: UseFormSetValue<Record<string, string>>
};

interface MarkdownFormProps {
  payload: MarkdownFormPayload
}

const MarkdownForm = ({ payload }: MarkdownFormProps) => {
  const {
    value = '', label, register, setValue, getValues,
  } = payload;
  const [valueTabs, setValueTabs] = useState<number>(0);
  const [choosedList, setChoosedList] = useState<string>('');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValueTabs(newValue);
  };

  const handlerKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      insertMarkup(label, choosedList);
    }
  };

  return (
    <Paper elevation={1} className={styles.wrapper}>
      <Box
        component="div"
        className={styles.boxTabs}
      >
        <Tabs
          className={styles.tabs}
          value={valueTabs}
          onChange={handleChange}
          aria-label="tabs"
        >
          <Tab label={<FormattedMessage id="app.collection.markdown.panel" />} {...a11yProps(0)} />
          <Tab label={<FormattedMessage id="app.collection.markdown.panel2" />} {...a11yProps(1)} />
          <MarkdownToolbar
            setValueTextArea={setValue}
            setChoosedList={setChoosedList}
            label={label}
          />
        </Tabs>
      </Box>
      <TabPanel value={valueTabs} index={0}>
        <TextareaAutosize
          className={classNames(styles.textareaAutosize, `label${label}`)}
          maxRows={4}
          minRows={4}
          autoFocus={valueTabs === 0}
          aria-label="maximum height"
          placeholder="Maximum 4 rows"
          defaultValue={value}
          onKeyDown={handlerKeyDown}
          {...register(label === 'descriptionCollection'
            ? label : `customFields.textarea.${checkTitleIsNan(label)}`)}
        />
        <Tooltip title={<FormattedMessage id="app.collection.markdown.support" />}>
          <Box
            className={styles.link}
            component="a"
            href={links.MARKDOWN}
            target="_blank"
            rel="noreferrer"
          >
            <Box
              component="img"
              src={markdown}
              alt="markdown link"
              width={20}
              height={20}
            />
          </Box>
        </Tooltip>
      </TabPanel>
      <TabPanel value={valueTabs} index={1}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {getValues(label === 'descriptionCollection'
            ? label : `customFields.textarea.${checkTitleIsNan(label)}`)}
        </ReactMarkdown>
      </TabPanel>
    </Paper>
  );
};

export default MarkdownForm;
