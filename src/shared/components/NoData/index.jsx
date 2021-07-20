import classNames from 'classnames';
import noDataImg from '@/assets/rank/noData.png';
import './index.less';

const NoData = {
  props: {
    className: String,
    hasText: { type: Boolean, default: true },
  },
  render() {
    return (
      <div class={classNames('no-data-wrapper', this.className)}>
        <img src={noDataImg} alt="" />
        { this.hasText && <span>{this.$t('noData')}</span> }
      </div>
    );
  },
};

export default NoData;
