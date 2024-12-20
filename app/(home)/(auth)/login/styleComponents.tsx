import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

export const CssTextField = styled(TextField)({
  width: '100%',

  '& label.Mui-focused': {
    color: '#999',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#bbb',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ddd',
    },
    '&:hover fieldset': {
      borderColor: '#bbb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#999',
    },
  },
});
