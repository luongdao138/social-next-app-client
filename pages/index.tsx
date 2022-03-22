import PageWithLayout from 'constants/page';
import MainLayout from 'layouts/MainLayout';
import Image from 'next/image';
import api from 'services/api';
import useToast from 'utils/hooks/useToast';
import styles from '../styles/Home.module.css';

const HomePage: PageWithLayout = () => {
  const { addToast } = useToast();

  const getPrivateResources = async () => {
    try {
      const res = await api.get('/user/private');
      addToast({ message: res.data.msg, severity: 'success' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout loginRequired>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href='https://nextjs.org'>Next.js!</a>
          </h1>

          <div>
            <button onClick={getPrivateResources}>Test Auth</button>
            <button
              onClick={() => {
                addToast({
                  message: 'This is a success toast from Luong',
                  severity: 'success',
                });
              }}
            >
              Toast success
            </button>
            <button
              onClick={() => {
                addToast({
                  message: 'This is a error toast from Luong',
                  severity: 'error',
                });
              }}
            >
              Toast error
            </button>
            <button
              onClick={() => {
                addToast({
                  message: 'This is a warning from Luong',
                  severity: 'warning',
                });
              }}
            >
              Toast warning
            </button>
            <button
              onClick={() => {
                addToast({
                  message: 'This is a info toast from Luong',
                  severity: 'info',
                });
              }}
            >
              Toast info
            </button>
          </div>

          <p className='text-2xl my-4'>
            Get started by editing <code className={styles.code}>pages/index.tsx</code>
          </p>

          <div className={styles.grid}>
            <a href='https://nextjs.org/docs' className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href='https://nextjs.org/learn' className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href='https://github.com/vercel/next.js/tree/canary/examples'
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </MainLayout>
  );
};

export default HomePage;
