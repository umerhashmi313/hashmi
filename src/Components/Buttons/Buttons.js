import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#021C33',
  color: 'white',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  height: 52,
  width: 323,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#385D84',
  },
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#021C33',
  border: '1px solid #021C33',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  height: 52,
  width: 323,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'white',
    border: '1px solid #021C33',
    color:'#587898'

  },
}));


export const TertiaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#063565',
  color: 'white',
  border: '1px solid #021C33',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  height: 52,
  width: 323,
  textTransform: 'none',
}));

export const QuaternaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#385D84',
  color: 'white',
  border: '1px solid #021C33',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  height: 52,
  width: 323,
  textTransform: 'none',
}));

export const PentaButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#587898',
  border: '1px solid #021C33',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  height: 52,
  width: 323,
  textTransform: 'none',
}));



export const HexaButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#063565',
  border: '1px solid #063565',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  height: 52,
  width: 323,
  textTransform: 'none',
}));


export const OctaButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#587898',
  border: '1px solid #587898',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  height: 52,
  width: 323,
  textTransform: 'none',
}));


export const DecaButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#042648',
  border: '1px solid #042648',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  height: 52,
  width: 323,
  textTransform: 'none',
}));