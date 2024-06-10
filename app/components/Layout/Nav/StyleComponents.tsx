import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

export const btnStyle = {
  color: '#444 !important',
  fontSize: '18px',
  padding: '10px 20px',
  fontWeight: '500',
  backgroundColor: 'transparent !important',
  '&:hover': {
    backgroundedColor: 'rgba(255,255,255,.2) !important',
    color: '#000 !important',
  },
};

export const mgnbBtnStyle = {
  ...btnStyle,
  width: '100%',
  justifyContent: 'start',
};

export const authBtnStyle = {
  color: '#666 !important',
  fontSize: 15,
  padding: '10px',
  fontWeight: '400',
  backgroundColor: 'transparent !important',
  '&:hover': {
    color: '#333 !important',
    background: 'rgba(255,255,255,.2) !important',
  },
};

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    color: 'rgba(0, 0, 0)',
    marginTop: '22px !important',
    backdropFilter: 'blur(10px) !important',
  },
}));
