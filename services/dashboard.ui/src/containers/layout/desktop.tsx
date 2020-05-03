import { Layout, Row } from 'antd';
import PropTypes, { InferProps } from 'prop-types';

import styles from './styles.scss';

const { Header, Content, Footer } = Layout;

const DesktopLayout = ({ children }: InferProps<typeof DesktopLayout>): JSX.Element => (
  <div>
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <Row className={styles.menu}>
          <a href="/" className={styles.logo}>
            <img alt="logo" src="/logo.svg" />
            Bid-ask spread
          </a>
        </Row>
      </Header>

      <Content className={styles.content}>{children}</Content>

      <Footer className={styles.footer}>&copy; 2020 Bid-ask spread</Footer>
    </Layout>
  </div>
);

DesktopLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

DesktopLayout.defaultProps = {
  children: null,
};

export { DesktopLayout };
