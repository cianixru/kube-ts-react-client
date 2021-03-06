import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import _isNil from 'ramda/src/isNil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PasswordField from '../../atoms/PasswordField';
import { REGISTER, REMIND_PASSWORD } from '../../constants/routes';
import { LoginOptions, loginRequested } from '../../redux/auth/actionCreators';
import { State } from '../../redux/rootReducer';
import loginSchema from '../../utils/schemas/login';
import useStyles from './styles';

export interface Props {
  readonly showRemindPassword?: boolean;
  readonly registerLinkProps?: any;
}

const LoginForm = ({
  showRemindPassword = true,
  registerLinkProps = {},
}: Props) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const { loginLoading } = useSelector(({ auth }: State) => auth);

  const dispatch = useDispatch();

  const login = (options: LoginOptions) => dispatch(loginRequested(options));

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        {t('auth.login')}
      </Typography>

      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: '', password: '' }}
        validateOnChange={false}
        onSubmit={login}
        render={({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => {
          const hasEmailError = Boolean(errors.email && touched.email);
          const hasPasswordError = Boolean(errors.password && touched.password);

          return (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                helperText={errors.email}
                error={hasEmailError}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('auth.email')}
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <PasswordField
                helperText={errors.password}
                error={hasPasswordError}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('auth.password')}
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Button
                disabled={loginLoading}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.submit}
              >
                {t('auth.loginAction')}
              </Button>

              <Grid container>
                {showRemindPassword && (
                  <Grid item xs>
                    <Link to={REMIND_PASSWORD}>{t('auth.forgotPassword')}</Link>
                  </Grid>
                )}
                <Grid item>
                  <Link to={REGISTER} {...registerLinkProps}>
                    {t('auth.dontHaveAccount')}
                  </Link>
                </Grid>
              </Grid>
            </form>
          );
        }}
      />
    </div>
  );
};
// tslint:disable-next-line:max-file-line-count
export default LoginForm;
