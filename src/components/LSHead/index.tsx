import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
}

const LSHead: React.FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content={title} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default LSHead;
