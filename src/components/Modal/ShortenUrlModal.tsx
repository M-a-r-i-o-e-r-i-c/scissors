import { useState, ChangeEvent, MouseEventHandler } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CustomShortCodeInput } from '../CustomShortCode/CustomShortCodeInput';

interface ShortenUrlModalProp {
  handleClose: MouseEventHandler<HTMLButtonElement>;
  createShortenLink: (
    name: string,
    longUrl: string,
    customShortcode: string
  ) => Promise<void>;
  checkCustomShortcodeAvailability: (customShortcode: string) => Promise<void>;
  customShortcodeStatus: {
    available: boolean | null;
    message: string;
  };
}

export const ShortenUrlModal = ({
  handleClose,
  createShortenLink,
  checkCustomShortcodeAvailability,
  customShortcodeStatus,
}: ShortenUrlModalProp) => {
  const [errors, setErrors] = useState({
    name: '',
    longUrl: '',
  });
  const [form, setForm] = useState({
    name: '',
    longUrl: '',
    customShortcode: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // setForm(oldForm => ({
    //   ...oldForm,
    //   [event.target.name]: event.target.value,
    // }));
    const { name, value } = event.target;

    let error = '';
    if (name === 'name') {
      if (value.length < 3 || value.length > 15) {
        error = 'Name must be between 3 and 15 characters';
      }
    } else if (name === 'longUrl') {
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
      if (!urlPattern.test(value)) {
        error = 'Invalid URL';
      } else if (value === '') {
        error = 'URL cannot be empty';
      }
    }

    setErrors(oldErrors => ({
      ...oldErrors,
      [name]: error,
    }));

    setForm(oldForm => ({
      ...oldForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    //     const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    // const regex = new RegExp(expression);
    let error = false;

    if (form.name.length < 3 || form.name.length > 15) {
      setErrors(oldErrors => ({
        ...oldErrors,
        name: 'Name must be between 3 and 15 characters',
      }));
      error = true;
    }
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    if (!urlPattern.test(form.longUrl) || form.longUrl === '') {
      setErrors(oldErrors => ({
        ...oldErrors,
        longUrl: form.longUrl === '' ? 'URL cannot be empty' : 'Invalid URL',
      }));
      error = true;
    }
    if (error) {
      return;
    }

    try {
      setSubmitting(true);
      await createShortenLink(form.name, form.longUrl, form.customShortcode);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={true} fullWidth onClose={handleClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Shorten URL
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          error={!!errors.name}
          helperText={errors.name}
          value={form.name}
          name="name"
          onChange={handleChange}
          sx={{ mb: 3 }}
          fullWidth
          variant="filled"
          label="name"
        />
        <TextField
          error={!!errors.longUrl}
          helperText={errors.longUrl}
          value={form.longUrl}
          name="longUrl"
          onChange={handleChange}
          fullWidth
          variant="filled"
          label="Long URL"
          style={{ marginBottom: '20px' }}
        />
        {/* <CustomShortCodeInput value={form.customShortcode} onChange={handleChange} /> */}
        <CustomShortCodeInput
          value={form.customShortcode}
          onChange={handleChange}
          checkAvailability={checkCustomShortcodeAvailability}
          availabilityStatus={customShortcodeStatus}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button sx={{mr:2}} variant="contained" onClick={handleSubmit} disabled={submitting}>Create Short URL</Button> */}
        <Button
          sx={{ mr: 2 }}
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting || customShortcodeStatus.available === false}
        >
          {submitting ? (
            <CircularProgress size={22} sx={{ color: '#fff' }} />
          ) : (
            'Create Short URL'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
