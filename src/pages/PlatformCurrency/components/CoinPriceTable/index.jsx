import styles from './index.less?module';

const CoinPriceTable = {
  props: {
    columns: { type: Array, default: [] },
    dataSource: { type: Array, default: [] },
    className: String,
  },
  render() {
    return (
      <div class={[styles.wrapper, this.className]}>
        <table class={styles.table}>
          <thead>
            <tr>
              {this.columns.map(item => (
                <th class={[{ [styles['small-th']]: item.small }]}>
                  <div>{item.title}</div>
                  {item.subTitle && <div>{item.subTitle}</div>}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {this.dataSource.map(item => (
              <tr>
                {item.map(text => (
                  <td>{text}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

export default CoinPriceTable;
