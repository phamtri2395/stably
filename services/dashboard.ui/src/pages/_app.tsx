import App, { AppProps } from 'next/app';
import Head from 'next/head';
import { BrowserView, MobileView } from 'react-device-detect';

import { GLOBAL_TITLE } from '@common/constants';
import { Core } from '@containers/core';
import { DesktopLayout } from '@containers/layout';

class CustomApp extends App<AppProps> {
  render = (): JSX.Element => {
    const { Component } = this.props;

    return (
      <Core>
        <Head>
          <title>{GLOBAL_TITLE}</title>
        </Head>

        <BrowserView>
          <DesktopLayout>
            <Component />
          </DesktopLayout>
        </BrowserView>

        <MobileView>Mobile UI is comming soon</MobileView>
      </Core>
    );
  };
}

export default CustomApp;
