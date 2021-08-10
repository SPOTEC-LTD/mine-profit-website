import './index.less';

const FormContainer = {
  props: {
    title: { type: String },
    className: { type: String },
  },
  render() {
    return (
      <div class={this.className}>
        {this.title && <div class="form-container-title">{this.title}</div>}
        <div class={['form-container', { 'form-container-has-title': this.title }]}>
          {this.$slots.default}
        </div>
      </div>
    );
  },
};

export default FormContainer;
