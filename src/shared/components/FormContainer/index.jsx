import './index.less';

const FormContainer = {
  render() {
    return (
      <div class="form-container">
        {this.$slots.default}
      </div>
    );
  },
};

export default FormContainer;
