import QRCode from 'qrcode';
import isFunction from 'lodash/isFunction';

const QRcode = {
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
      <div>
        {
          this.imgUrl && <img src={this.imgUrl} alt="" />
        }
      </div>
    );
  },
};

export default QRcode;
