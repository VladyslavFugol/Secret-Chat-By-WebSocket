import styles from './Error.module.scss'

function Error() {
  return (
    <div className={styles.container}>
      <h1>Not authorized</h1>
      <h2>Sorry</h2>
    </div>
  )
}

export default Error
