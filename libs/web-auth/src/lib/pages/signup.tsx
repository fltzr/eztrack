import Container from '@cloudscape-design/components/container';
import { useNavigate } from 'react-router-dom';

import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

import { FormDatePicker, FormInput, FormSelect, GenericForm } from '@/web/form';
import styles from './styles.module.scss';
import Button from '@cloudscape-design/components/button';
import { type SignupSchema, signupSchema } from '../types';
import { signup } from '../api';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: SignupSchema) => {
    try {
      await signup(data);
      navigate('/home', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Container header={<Icon name='keyboard' variant='subtle' size='big' />}>
          <ColumnLayout columns={2}>
            <Header variant='h1'>Sign up</Header>
            <GenericForm
              schema={signupSchema}
              formId='form-signup'
              onSubmit={handleSignup}
              secondaryActions={
                <Box margin={{ top: 'xxxl' }}>
                  <Button
                    variant='link'
                    onClick={(event) => {
                      event.preventDefault();
                      navigate('/signin', { replace: true });
                    }}
                  >
                    Have an account?
                  </Button>
                </Box>
              }
              actions={
                <Box margin={{ top: 'xxxl' }}>
                  <Button variant='primary' form='form-signup'>
                    Sign up
                  </Button>
                </Box>
              }
            >
              <SpaceBetween size='m'>
                <ColumnLayout columns={2}>
                  <FormInput<SignupSchema> name='firstName' label='First name' />
                  <FormInput<SignupSchema> name='lastName' label='Last name' />
                </ColumnLayout>
                <ColumnLayout columns={2}>
                  <FormInput<SignupSchema> name='email' label='Email' />
                  <FormInput<SignupSchema> name='username' label='Username' />
                </ColumnLayout>
                <FormInput<SignupSchema> sensitive name='password' label='Password' />
                <FormInput<SignupSchema> sensitive name='confirmPassword' label='Confirm password' />
                <ColumnLayout columns={2}>
                  <FormDatePicker<SignupSchema>
                    name='birthDate'
                    label='Birth date'
                    placeholder='YYYY/MM/DD'
                  />
                  <FormSelect<SignupSchema>
                    name='gender'
                    label='Gender'
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                      { value: 'not-specified', label: 'Prefer to not specify' },
                    ]}
                  />
                </ColumnLayout>
                <ColumnLayout columns={2}>
                  <FormInput<SignupSchema>
                    name='zipCode'
                    type='number'
                    inputMode='numeric'
                    label='Zip code'
                  />
                </ColumnLayout>
              </SpaceBetween>
            </GenericForm>
          </ColumnLayout>
        </Container>
      </div>
    </div>
  );
};

export const Component = SignupPage;
