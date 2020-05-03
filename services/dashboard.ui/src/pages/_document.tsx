import Document, {
  Html, Head, Main, NextScript, DocumentInitialProps,
} from 'next/document';
import { ReactElement } from 'react';

class CustomDocument extends Document {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): ReactElement {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Adamina:400,700&display=swap&subset=vietnamese"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>

        <style global jsx>
          {`
            html,
            body {
              height: 100vh;
              min-height: 100vh;
              background-color: #fff;
            }
          `}
        </style>
      </Html>
    );
  }
}

export default CustomDocument;
