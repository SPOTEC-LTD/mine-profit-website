import './index.less';

const Paragraph = {
  props: {
    row: { type: Number, default: 1 },
  },
  data() {
    return {
      textDomHeight: 0,
      rowHeight: 0,
      text: '',
      maxHeight: 0,
      initHeight: 0,
    };
  },
  watch: {
    text() {
      this.handleContent();
    },
  },
  mounted() {
    this.getTextDomHeight();
    this.getText();
    this.getMaxHeight();
    this.getInitHeight();
  },
  methods: {
    getTextDomHeight() {
      this.$nextTick(() => {
        this.textDomHeight = this.$refs.text.getBoundingClientRect().height;
      });
    },
    getInitHeight() {
      this.$nextTick(() => {
        this.initHeight = this.$refs.text.getBoundingClientRect().height;
      });
    },
    getText() {
      this.text = this.$slots.default ? this.$slots.default[0].text : '';
    },
    getMaxHeight() {
      this.maxHeight = parseInt(window.getComputedStyle(this.$refs.text).lineHeight, 10) * this.row;
    },
    handleContent() {
      this.$nextTick(() => {
        if (this.textDomHeight > this.maxHeight) {
          this.text = this.text.slice(0, this.text.length - 1);
        }
        if (this.initHeight > this.maxHeight && this.textDomHeight <= this.maxHeight) {
          this.text = `${this.text.slice(0, this.text.length - 3)}...`;
        }

        this.getTextDomHeight();
      });
    },
  },
  render() {
    return (
      <div ref="content" style={{ maxHeight: `${this.maxHeight}px` }} class="paragraph-content">
        <div ref="text" class="paragraph-text">{this.text}</div>
      </div>
    );
  },
};

export default Paragraph;
