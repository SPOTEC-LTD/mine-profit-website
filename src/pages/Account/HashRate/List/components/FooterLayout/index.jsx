import styles from './index.less?module';

const FooterLayout = {
  render() {
    return (
      <div>
        {this.$scopedSlots.topExtra && this.$scopedSlots.topExtra() }
        <div class={styles.footer}>
          <div>{this.$scopedSlots.leftContent()}</div>
          <div>{this.$scopedSlots.rightContent()}</div>
        </div>
      </div>

    );
  },
};

export default FooterLayout;
