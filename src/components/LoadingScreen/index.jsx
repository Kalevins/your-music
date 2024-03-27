import styles from './styles.module.scss';

export const LoadingScreen = () => {
  return (
    <main className={styles.main}>
      <div className={styles.spinner} />
    </main>
  )
}