import styles from './styles.module.css'
const LoadingSpinner = (): JSX.Element => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default LoadingSpinner
