const BaseContainer = {
  props: ['contentClassName'],

  render() {
    return (
      <div class="container">
        <div class="content">
          <slot />
        </div>
      </div>
    );
  },
};

export default BaseContainer;
