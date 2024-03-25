import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { useNotificationStore } from '@/web/state-management';
import { useAuth } from '../../../../auth/hooks/use-auth';
import { FormInput } from '../../../../../../../libs/shared/web/form/src/form-input';
import { GenericForm } from '../../../../../../../libs/shared/web/form/src/generic-form';
import { signupSchema, type SignupSchemaType } from '../../types';
import styles from '../styles.module.scss';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signin } = useAuth();
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleSignup = async (data: SignupSchemaType) => {
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
    <div className={styles.container}>
      <div className={styles['auth-form']}>
        <Container>
          <SpaceBetween direction='vertical' size='xl'>
            <GenericForm
              header={<Header variant='h2'>Sign up</Header>}
              variant='embedded'
              formId='signup-form'
              schema={signupSchema}
              onSubmit={handleSignup}
            >
              <FormInput<SignupSchemaType>
                disableBrowserAutocorrect
                testId='signin-input-username'
                name='username'
                label='Username'
                spellcheck={false}
                autoComplete={false}
              />
              <FormInput<SignupSchemaType>
                sensitive
                disableBrowserAutocorrect
                name='password'
                testId='signin-input-password'
                label='Password'
                type='password'
                spellcheck={false}
                autoComplete={false}
              />
            </GenericForm>
            <Button
              fullWidth
              form='signin-form'
              formAction='submit'
              variant='primary'
              loading={isLoading}
              loadingText='Signing in'
            >
              Sign up
            </Button>
            <hr />
            <Button
              fullWidth
              variant='normal'
              onClick={(event) => {
                event.preventDefault();
                navigate('/signin');
              }}
            >
              Sign in
            </Button>
          </SpaceBetween>
        </Container>
      </div>
    </div>
  );
};

export const Component = SignupPage;
