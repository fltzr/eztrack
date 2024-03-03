import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

export const RouteError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.log(`Error: ${JSON.stringify(error, null, 2)}`);

  return (
    <Container
      variant='default'
      header={
        <Header variant='h1' description='We hit a roadblock.'>
          Uh oh!
        </Header>
      }
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='primary'
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}>
            Go back
          </Button>
        </div>
      }>
      <Box variant='code'>
        {isRouteErrorResponse(error) ?
          error.data
        : JSON.stringify(error, null, 2)}
      </Box>
    </Container>
  );
};
