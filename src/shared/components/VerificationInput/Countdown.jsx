import { Statistic } from 'ant-design-vue';

const Countdown = {
  props: {
    value: Boolean,
    showDivider: Boolean,
  },
  render() {
    return (
      <div class="ver-send-button">
        {this.showDivider && <div class="ver-divider" />}
        {this.value ? (
          <Statistic.Countdown
            value={Date.now() + 1000 * 60}
            format="ss"
            suffix="s"
            onFinish={() => { this.$emit('finish'); }}
          />
        ) : (
          <div class="get-vercode-button" onClick={() => { this.$emit('click'); }}>
            {this.$t('fetchVerificationCode')}
          </div>
        )}
      </div>
    );
  },
};

export default Countdown;
