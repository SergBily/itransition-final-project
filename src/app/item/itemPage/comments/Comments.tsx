import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
  Button, Paper, TextareaAutosize, Typography,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.scss';
import screenSize from '../../../../shared/constants/screenSize';
import { useAppSelector } from '../../../../shared/hooks/hooks';
import { selectUser } from '../../../../redux/selectors/authSelectors';
import CommentResponse from '../../../../shared/models/comment/commentResponse';
import generateKey from '../../../../shared/utils/UniqueKey';

interface TabPanelProps {
  index: number;
  value: number;
  children: React.ReactNode;
}

const TabPanel = (props: TabPanelProps) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

interface CommentsProps {
  saveComment: (e: string) => void;
  comments: CommentResponse[];
}

const Comments = ({ saveComment, comments }: CommentsProps) => {
  const [value, setValue] = useState(0);
  const [textComment, setTextComment] = useState<string>('');
  const [widthSize, setWidthSize] = useState<number>(screenSize.INITIAL);
  const { userId } = useAppSelector(selectUser);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const reportWindowSize = () => {
    setWidthSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', reportWindowSize);
    gsap.to('.styles_wrapper__AJaFW', {
      y: '-250px', opacity: 1, duration: 0.9, ease: 'circ',
    });
    return () => window.removeEventListener('resize', reportWindowSize);
  }, []);

  const handleComment = () => {
    saveComment(textComment);
    setTextComment('');
    setValue(0);
  };

  return (
    <Paper
      elevation={6}
      className={styles.wrapper}
    >
      <Box component="div" className={styles.root}>
        <Box component="div" className={styles.tabs}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs"
            orientation={widthSize < screenSize[600] ? 'vertical' : 'horizontal'}
          >
            <Tab label={<FormattedMessage id="app.item.comments.view" />} {...a11yProps(0)} />
            {userId && <Tab label={<FormattedMessage id="app.item.comments.write" />} {...a11yProps(1)} />}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            component="div"
            key={generateKey()}
            className={styles.blockCommentTitle}
          >
            <Typography variant="body1">
              <FormattedMessage id="app.item.comments.sender" />
            </Typography>
            <Typography variant="body1">
              <FormattedMessage id="app.item.comments.comment" />
            </Typography>
          </Box>
          {comments.length !== 0
            ? (comments.map((c) => (
              <Paper
                key={generateKey()}
                elevation={4}
                className={styles.blockComment}
              >
                <Box
                  component="div"
                  className={styles.block}
                >
                  <Box
                    component="span"
                    className={styles.sender}
                  >
                    {c.sender}

                  </Box>
                  <Box component="span">
                    {c.text}
                  </Box>
                </Box>
              </Paper>
            )))
            : (<FormattedMessage id="app.item.comments.all" />)}
        </TabPanel>
        { userId && (
        <TabPanel value={value} index={1}>
          <TextareaAutosize
            className={styles.textareaAutosize}
            maxRows={8}
            minRows={4}
            value={textComment}
            onChange={((e) => setTextComment(e.target.value))}
            aria-label="maximum height"
          />
          <Button
            variant="outlined"
            className={styles.btn}
            onClick={handleComment}
          >
            <FormattedMessage id="app.item.comments.btn" />
          </Button>
        </TabPanel>
        )}
      </Box>
    </Paper>
  );
};

export default Comments;
