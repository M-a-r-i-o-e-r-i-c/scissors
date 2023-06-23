import { ChangeEvent, useEffect } from 'react';
import { TextField, Typography } from '@mui/material';

interface CustomShortCodeInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkAvailability: (customShortcode: string) => void;
  availabilityStatus: {
    available: boolean | null;
    message: string;
  };
}

export const CustomShortCodeInput = ({
  value,
  onChange,
  checkAvailability,
  availabilityStatus,
}: CustomShortCodeInputProps) => {
  useEffect(() => {
    checkAvailability(value);
  }, [value, checkAvailability]);

  return (
    <>
      <TextField
        value={value}
        name="customShortcode"
        onChange={onChange}
        fullWidth
        variant="filled"
        label="Custom Domain (optional)"
      />
      {availabilityStatus.message && (
        <Typography
          variant="subtitle2"
          color={availabilityStatus.available ? 'success.main' : 'error.main'}
          sx={{ mt: 1 }}
        >
          {availabilityStatus.message}
        </Typography>
      )}
    </>
  );
};
