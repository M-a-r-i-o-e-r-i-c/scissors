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
  const [form, setForm] = useState({
    name: '',
    longUrl: '',
    customShortcode: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setForm(oldForm => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  // const [showCustomDomainMessage, setShowCustomDomainMessage] = useState(false);

  // const handleCustomDomainFocus: FocusEventHandler<HTMLInputElement> = () => {
  //   if (!form.customShortcode) {
  //     setShowCustomDomainMessage(true);
  //   }
  // };

  // const handleCustomDomainBlur: FocusEventHandler<HTMLInputElement> = () => {
  //   setShowCustomDomainMessage(false);
  // };

  const handleSubmit = async () => {
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
          value={form.name}
          name="name"
          onChange={handleChange}
          sx={{ mb: 3 }}
          fullWidth
          variant="filled"
          label="name"
        />
        <TextField
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
          Create Short URL
        </Button>
      </DialogActions>
    </Dialog>
  );
};
