import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import { useAuthStore } from '../../auth/auth-store';
import { useLayoutStore } from '../../common/stores/use-layout-store';

const Home = () => {
  const layoutState = useLayoutStore();
  const authState = useAuthStore();

  return (
    <Container>
      <Box variant="pre">{JSON.stringify(layoutState, null, 2)}</Box>
      <Box variant="pre">{JSON.stringify(authState, null, 2)}</Box>
    </Container>
  );
};

export const Component = Home;
