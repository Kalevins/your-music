import styles from './styles.module.scss';

export const LoadingScreen = () => {
  return (
    <main className={styles.main} data-testid={'loadingScreen'}>
      <div className={styles.spinner} />
    </main>
  )
}