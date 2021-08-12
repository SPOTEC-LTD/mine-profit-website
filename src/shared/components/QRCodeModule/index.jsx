import QRCode from 'qrcode';
import isFunction from 'lodash/isFunction';

const QRCodeModule = {
  data() {
    return {
      imgUrl: '',
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    method: {
      type: String,
      default: 'toDataURL',
    },
    options: {
      type: Object,
      default: () => {
      },
    },

    getCanvasInstance: {
      type: Function,
      default: () => {
      },
    },
    className: String,
  },

  mounted() {
    const {
      value, method, options, getCanvasInstance,
    } = this;
    const domEl = this.$el;

    const defaultOptions = { errorCorrectionLevel: 'H', margin: 0, width: 124 };
    const finallyOptions = { ...defaultOptions, ...options };

    QRCode[method](value, finallyOptions, (err, result) => {
      if (method === 'toDataURL') {
        this.imgUrl = result;
        this.$emit('getQrCodeUrl', result);
      }

      if (err) {
        throw err;
      }

      isFunction(getCanvasInstance) && getCanvasInstance(result);
      if (method === 'toCanvas') {
        domEl.appendChild(result);
      }
    });
  },

  render() {
    return (
      <div class={this.className}>
        {
          this.imgUrl && <img src={this.imgUrl} alt="" />
        }
      </div>
    );
  },
};

export default QRCodeModule;
