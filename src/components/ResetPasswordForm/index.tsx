// tslint:disable:no-magic-numbers
/* istanbul ignore next */
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import _defaultTo from 'ramda/src/defaultTo';
import React from 'react';
import { RouteProps } from 'react-router';
import PasswordField from '../../atoms/PasswordField';
import { PASSWORD_HELPER_TEXT } from '../../constants';
import {
  ResetPasswordOptions,
  resetPasswordRequested,
} from '../../redux/auth/actionCreators';
import { AuthState } from '../../redux/auth/reducer';
import resetPasswordSchema from '../../utils/schemas/resetPassword';
import useStyles from './styles';

interface ResetPasswordFormProps extends AuthState, RouteProps {
  readonly resetPassword: (
    options: ResetPasswordOptions
  ) => ReturnType<typeof resetPasswordRequested>;
}

const ResetPasswordForm = ({
  resetPasswordLoading,
  resetPassword,
  location,
}: ResetPasswordFormProps) => {
  const classes = useStyles();

  const params =
    location !== undefined ? new URLSearchParams(location.search) : null;

  const tokenParam = params !== null ? params.get('token') : '';

  const token = _defaultTo('')(tokenParam);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Reset password
        </Typography>

        <Formik
          validationSchema={resetPasswordSchema}
          initialValues={{ password: '', passwordConfirmation: '' }}
          validateOnChange={false}
          onSubmit={values => resetPassword({ ...values, token })}
          render={({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => {
            const hasPasswordError = Boolean(
              errors.password && touched.password
            );
            const hasPasswordConfirmationError = Boolean(
              errors.passwordConfirmation && touched.passwordConfirmation
            );

            return (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <PasswordField
                      helperText={PASSWORD_HELPER_TEXT}
                      error={hasPasswordError}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="New password"
                      id="password"
                      autoComplete="off"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <PasswordField
                      helperText={PASSWORD_HELPER_TEXT}
                      error={hasPasswordConfirmationError}
                      variant="outlined"
                      required
                      fullWidth
                      name="passwordConfirmation"
                      label="New password confirmation"
                      id="passwordConfirmation"
                      autoComplete="off"
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      disabled={resetPasswordLoading}
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.submit}
                    >
                      Reset password
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        />
      </div>
    </Container>
  );
};

// tslint:disable-next-line:max-file-line-count
export default ResetPasswordForm;
