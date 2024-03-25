import Container from '@cloudscape-design/components/container';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

import { FormInput, GenericForm } from '@/web/shared/form';
import styles from './styles.module.scss';
import Button from '@cloudscape-design/components/button';

const signinSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

type SigninSchema = z.infer<typeof signinSchema>;

const SigninPage = () => {
  const navigate = useNavigate();

  const handleSignin = (data: SigninSchema) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Container header={<Icon name='keyboard' variant='subtle' size='big' />}>
          <ColumnLayout columns={2}>
            <Header variant='h1'>Sign in</Header>
            <GenericForm
              schema={signinSchema}
              formId='form-signin'
              onSubmit={handleSignin}
              secondaryActions={
                <Box margin={{ top: 'xxxl' }}>
                  <Button
                    variant='link'
                    onFollow={(event) => {
                      event.preventDefault();
                      navigate('/forgot');
                    }}
                  >
                    Forgot something?
                  </Button>
                </Box>
              }
              actions={
                <Box margin={{ top: 'xxxl' }}>
                  <SpaceBetween direction='horizontal' size='xs'>
                    <Button
                      variant='link'
                      onClick={(event) => {
                        event.preventDefault();
                        navigate('/signup');
                      }}
                    >
                      Create account
                    </Button>
                    <Button variant='primary' form='form-signin'>
                      Sign in
                    </Button>
                  </SpaceBetween>
                </Box>
              }
            >
              <SpaceBetween size='m'>
                <FormInput<SigninSchema> name='username' label='Username' />
                <FormInput<SigninSchema> sensitive name='password' label='Password' />
              </SpaceBetween>
            </GenericForm>
          </ColumnLayout>
        </Container>
      </div>
    </div>
  );
};

export const Component = SigninPage;
