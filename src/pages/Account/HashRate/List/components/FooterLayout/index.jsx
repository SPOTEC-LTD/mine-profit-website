import styles from './index.less?module';

const FooterLayout = {
  render() {
    return (
      <div>
        {
          this.$scopedSlots.topExtra &&
          (
            <div class={styles['top-extra']}>
              {this.$scopedSlots.topExtra()}
            </div>
          )
         }
        <div class={styles.footer}>
          <div>{this.$scopedSlots.leftContent()}</div>
          {
            this.$scopedSlots.rightContent && (
              <div>{this.$scopedSlots.rightContent()}</div>
            )
          }
        </div>
      </div>

    );
  },
};

export default FooterLayout;
