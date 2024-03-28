import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

export const btnStyle = {
  color: '#444 !important',
  fontSize: '18px',
  padding: '10px 20px',
  fontWeight: '500',
  backgroundColor: 'transparent',
  '&:hover': {
    color: '#000 !important',
  },
};

export const mgnbBtnStyle = {
  ...btnStyle,
  width: '100%',
  justifyContent: 'start',
};

export const authBtnStyle = {
  color: '#999',
  fontSize: 15,
  padding: '10px',
  fontWeight: '400',
  '&:hover': {
    color: '#333',
    background: '#fafafa',
  },
};

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fefefe',
    color: 'rgba(0, 0, 0)',
    top: '24px',
  },
}));
