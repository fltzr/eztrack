import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import { useEffect } from 'react';

import { useLayoutStore } from '@/web/state-management';

import logo from '../../../public/eztrack.png';

import styles from './styles.module.scss';

const SplashPage = () => {
  const layout = useLayoutStore((s) => s.setState);

  useEffect(() => {
    layout({
      domainTitle: 'welcome',
      navigationHidden: true,
      toolsHidden: true,
    });
  }, [layout]);

  return (
    <div className={styles['splash-main']}>
      <div className={styles['splash-container']}>
        <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
          <div>
            <div className={styles['splash-header']}>Eztrack</div>
            <Header variant='h1'>Track everything.</Header>
          </div>

          <div className={styles['logo-container']}>
            <div className={styles['logo-background']}></div>
            <img className={styles.logo} src={logo} alt='logo' />
          </div>
        </Grid>
      </div>
    </div>
  );
};

export const Component = SplashPage;
