import { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from '@mui/icons-material';

const MarkDownEditor = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const textFieldRef = useRef<HTMLTextAreaElement>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const storedContent = localStorage.getItem('markdownContent');
    if (storedContent) {
      setMarkdownContent(storedContent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('markdownContent', markdownContent);
  }, [markdownContent]);

  const handleToolbarClick = (format: string) => {
    const textField = textFieldRef.current;

    if (!textField) {
      console.error('textField is undefined');
      return;
    }

    const start = textField.selectionStart;
    const end = textField.selectionEnd;
    const selectedText = textField.value.slice(start, end);
    const newText =
      textField.value.slice(0, start) +
      format +
      selectedText +
      format +
      textField.value.slice(end);
    setMarkdownContent(newText);
    textField.focus();
  };

  const downloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([markdownContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'markdown.md';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Grid
      style={{
        width: '100%',
        display: matches ? 'flex' : 'block',
        justifyContent: matches ? 'space-between' : 'center',
      }}
    >
      <Grid item xs={12} md={6} style={{ marginRight: matches ? '10px' : '0' }}>
        <Box>
          <TextField
            label="Markdown Content"
            multiline
            rows={20}
            fullWidth
            value={markdownContent}
            onChange={e => setMarkdownContent(e.target.value)}
            inputRef={textFieldRef}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Toolbar>
            <IconButton onClick={() => handleToolbarClick('**')}>
              <FormatBold />
            </IconButton>
            <IconButton onClick={() => handleToolbarClick('*')}>
              <FormatItalic />
            </IconButton>
            <IconButton onClick={() => handleToolbarClick('__')}>
              <FormatUnderlined />
            </IconButton>
          </Toolbar>
          <Box mt={2}>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </Box>
          <Box mt={2}>
            <Button
              onClick={downloadMarkdown}
              style={{
                border: '2px solid blue',
              }}
            >
              Download
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MarkDownEditor;
