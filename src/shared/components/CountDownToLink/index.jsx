import { Statistic } from 'ant-design-vue';
import isObject from 'lodash/isObject';
import PrimaryButton from '@/shared/components/PrimaryButton';
import jumpPageImage from '@/assets/account/jump-page-image.png';
import locationServices from '@/shared/services/location/locationServices';
import BaseModal from '../BaseModal';
import './index.less';

const CountDownToLink = {
  props: {
    show: Boolean,
    time: { type: Number, default: 400000 },
    to: [String, Object],
    pageName: String,
    operatingSuccess: String,
    promptText: String,
  },

  methods: {
    handleConfirm() {
      if (this.to) {
        this.toPage();
      }
      this.$emit('confirm');
    },

    onChange({ seconds }) {
      if (seconds === 0) {
        if (this.to) {
          this.toPage();
        }
        this.$emit('confirm');
      }
    },

    toPage() {
      if (isObject(this.to)) {
        const { path, ...option } = this.to;
        locationServices.push(path, option);
      } else {
        locationServices.push(this.to);
      }
    },
  },

  render() {
    const content = (
      <div class='count-down-dialog'>
        <div class='count-down-mention'>
          <img src={jumpPageImage} alt="" class='count-down-img'/>
          <span class='count-down-mention-content'>{this.operatingSuccess}</span>
        </div>

        <div class='count-down-time'>
          <Statistic.Countdown
            value={Date.now() + this.time}
            format="ss"
            onFinish={this.onChange}
            class='count-down-clock'
          />
          <span>{this.promptText || `${this.$t('linkToPageInTime')} ${this.pageName}`}</span>
        </div>

        <PrimaryButton class='count-down-confirm-btn' onClick={this.handleConfirm}>
          {this.$t('confirm')}
        </PrimaryButton>
      </div>
    );

    return (
      <BaseModal
        width={270}
        value={this.show}
        scopedSlots={{
          content: () => content,
        }}
      />
    );
  },
};

export default CountDownToLink;
