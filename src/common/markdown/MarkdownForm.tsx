import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Paper, TextareaAutosize, Tooltip,
} from '@mui/material';
import {
  FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch,
} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { FormattedMessage } from 'react-intl';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';
import TabPanel from './TabPanel';
import MarkdownToolbar from './MarkdownToolbar';
import links from '../../shared/constants/links';
import markdown from '../../assets/images/markdown.svg';
import insertMarkup from '../../shared/utils/insertMarkdownSymbol';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface MarkdownFormProps {
  label: string,
  register: UseFormRegister<FieldValues>,
  watch: UseFormWatch<FieldValues>,
  setValueTextArea: UseFormSetValue<FieldValues>
}

const MarkdownForm = ({
  label, register, watch, setValueTextArea,
}: MarkdownFormProps) => {
  const [value, setValue] = useState<number>(0);
  const [choosedList, setChoosedList] = useState<string>('');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlerKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      insertMarkup('description__textarea', choosedList);
    }
  };

  return (
    <Paper elevation={1} sx={{ mr: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={<FormattedMessage id="app.collection.markdown.panel" />} {...a11yProps(0)} />
          <Tab label={<FormattedMessage id="app.collection.markdown.panel2" />} {...a11yProps(1)} />
          <MarkdownToolbar setValueTextArea={setValueTextArea} setChoosedList={setChoosedList} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TextareaAutosize
          className="description__textarea"
          maxRows={4}
          minRows={4}
          aria-label="maximum height"
          placeholder="Maximum 4 rows"
          style={{ width: '100%' }}
          onKeyDown={handlerKeyDown}
          {...register(`${label}`)}
        />
        <Tooltip title={<FormattedMessage id="app.collection.markdown.support" />}>
          <Box
            component="a"
            href={links.MARKDOWN}
            target="_blank"
            rel="noreferrer"
            sx={{ '&:hover': { fill: 'blue' } }}
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
      <TabPanel value={value} index={1}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {watch('description')}
        </ReactMarkdown>
      </TabPanel>
    </Paper>
  );
};

export default MarkdownForm;
