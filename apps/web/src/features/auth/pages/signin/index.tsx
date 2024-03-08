import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';
import type { AxiosError } from 'axios';
import { useAuth } from '../../../../auth/hooks/use-auth';
import { FormInput } from '../../../../common/components/form/form-input';
import { GenericForm } from '../../../../common/components/form/generic-form';
import { useNotificationStore } from '@/web/state-management';
import { signInSchema, type SignInSchemaType } from '../../types';
import styles from './styles.module.scss';
import { useState } from 'react';

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signin } = useAuth();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  const handleSignin = async (data: SignInSchemaType) => {
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
          <SpaceBetween direction="vertical" size="xl">
            <GenericForm
              header={<Header variant="h2">Sign in</Header>}
              variant="embedded"
              formId="signin-form"
              schema={signInSchema}
              onSubmit={handleSignin}
            >
              <FormInput<SignInSchemaType>
                disableBrowserAutocorrect
                testId="signin-input-username"
                name="username"
                label="Username"
                spellcheck={false}
                autoComplete={false}
              />
              <FormInput<SignInSchemaType>
                sensitive
                disableBrowserAutocorrect
                name="password"
                testId="signin-input-password"
                label="Password"
                type="password"
                spellcheck={false}
                autoComplete={false}
              />
            </GenericForm>
            <Button
              fullWidth
              form="signin-form"
              formAction="submit"
              variant="primary"
              loading={isLoading}
              loadingText="Signing in"
            >
              Signin
            </Button>
          </SpaceBetween>
        </Container>
      </div>
    </div>
  );
};

export const Component = SignInPage;
