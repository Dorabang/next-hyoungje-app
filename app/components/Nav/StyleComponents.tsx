import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';

export const btnStyle = {
  color: '#666',
  fontSize: 18,
  fontFamily: 'Noto Sans KR',
  padding: '10px 20px',
  fontWeight: '400',
  ':hover': {
    color: '#333',
    background: '#fafafa',
  },
};

export const authBtnStyle = {
  color: '#999',
  fontSize: 15,
  fontFamily: 'Noto Sans KR',
  padding: '10px',
  fontWeight: '400',
  ':hover': {
    color: '#333',
    background: '#fafafa',
  },
};

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0)',
    marginTop: '20px',
  },
}));
