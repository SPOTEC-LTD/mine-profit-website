import { Statistic } from 'ant-design-vue';

const FetchVerifyCode = {
  props: {
    value: Boolean,
    text: String,
  },
  render() {
    return (
      <div class="ver-send-button">
        {this.value ? (
          <Statistic.Countdown
            value={Date.now() + 1000 * 60}
            format={`${this.text}（ss`}
            suffix="s）"
            onFinish={() => { this.$emit('finish'); }}
          />
        ) : (
          <div class="get-vercode-button" onClick={() => { this.$emit('click'); }}>
            {this.text}
          </div>
        )}
      </div>
    );
  },
};

export default FetchVerifyCode;
