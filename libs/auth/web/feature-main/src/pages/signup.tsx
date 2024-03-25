import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  return <Container header={<Header variant='h1'>Sign up</Header>}></Container>;
};

export const Component = SignupPage;
