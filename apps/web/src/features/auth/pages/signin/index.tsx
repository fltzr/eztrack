import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ColumnLayout from '@cloudscape-design/components/column-layout';

import { useAuth } from '../../../../auth/hooks/use-auth';
import { FormInput } from '../../../../../../../libs/shared/web/form/src/form-input';
import { GenericForm } from '../../../../../../../libs/shared/web/form/src/generic-form';
import { useNotificationStore } from '@/web/state-management';
import { signinSchema, type SigninSchemaType } from '../../types';
import Box from '@cloudscape-design/components/box';

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signin } = useAuth();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleSignin = async (data: SigninSchemaType) => {
    setIsLoading(true);
    await signin(data)
      .then(() => {
        addNotification({
          type: 'success',
          id: `notification-signin-success-${Date.now()}`,
          header: 'Successfully signed in',
          dismissible: true,
          autoDismiss: true,
        });

        navigate('/');
      })
      .catch((error: AxiosError) => {
        addNotification({
          type: 'error',
          id: `notification-signin-error-${Date.now()}`,
          header: error.message,
          dismissible: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    // <div className={styles.container}>
    //   <div className={styles['auth-form']}>
    <Container header={<Header variant='h2'>Sign in</Header>}>
      <ColumnLayout columns={2}>
        <SpaceBetween direction='vertical' size='xl'></SpaceBetween>
        <SpaceBetween direction='vertical' size='xl'>
          <GenericForm
            variant='embedded'
            formId='signin-form'
            schema={signinSchema}
            onSubmit={handleSignin}
          >
            <FormInput<SigninSchemaType>
              disableBrowserAutocorrect
              testId='signin-input-username'
              name='username'
              label='Email or username'
              spellcheck={false}
              autoComplete={false}
            />
            <FormInput<SigninSchemaType>
              sensitive
              disableBrowserAutocorrect
              name='password'
              testId='signin-input-password'
              placeholder='Enter your password'
              type='password'
              spellcheck={false}
              autoComplete={false}
            />
          </GenericForm>
          <Box float='right'>
            <SpaceBetween direction='horizontal' size='s'>
              <Button
                fullWidth
                variant='normal'
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/signup');
                }}
              >
                Signup
              </Button>
              <Button
                fullWidth
                form='signin-form'
                formAction='submit'
                variant='primary'
                loading={isLoading}
                loadingText='Signing in'
              >
                Signin
              </Button>
            </SpaceBetween>
          </Box>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
    //   </div>
    // </div>
  );
};

export const Component = SignInPage;
