import styles from './styles.module.scss'

export function Pagination ({
  pagination = {
    offset: 0,
    limit: 20
  },
  setPagination = () => {},
  numberElements = 0,
  intervalElements = 10
}) {
  const { offset, limit } = pagination
  const numberPages = new Array(Math.ceil(numberElements / limit)).fill(0).map((_, index) => index) || [0]
  const numberItemsPerPage = new Array(5).fill(0).map((_, index) => (index + 1) * intervalElements)

  const handleLimit = (number) => {
    setPagination({
      ...pagination,
      limit: number,
      offset: 0
    })
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.pages}>
        <button onClick={() => setPagination({
          ...pagination,
          offset: 0
        })}>
          {'<'}
        </button>
        {numberPages.filter((number) => {
          const start = Math.floor(offset / limit)
          if (start < 2) return number >= 0 && number <= 4
          if (start > numberPages.length - 3) return number >= numberPages.length - 5 && number <= numberPages.length - 1
          return number >= start - 2 && number <= start + 2
        }).map((number, index) => (
          <button
            key={index}
            onClick={() => setPagination({
              ...pagination,
              offset: number * limit
            })}
            id={number * limit === offset ? styles.active : null}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setPagination({
              ...pagination,
              offset: numberPages[numberPages.length - 1] * limit
            })
          }
        >
          {'>'}
        </button>
      </div>
      <div className={styles.number}>
        {numberItemsPerPage.map((number, index) => (
          <button
            key={index}
            onClick={() => handleLimit(number)}
            id={number === limit ? styles.active : null}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}
