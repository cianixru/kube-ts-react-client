// tslint:disable:no-magic-numbers
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  form: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: '100%', // Fix IE 11 issue.
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
