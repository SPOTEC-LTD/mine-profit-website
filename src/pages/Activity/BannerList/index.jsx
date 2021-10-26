const BannerList = {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    className: String,
  },

  render() {
    return (
      <div class={this.className}>
        {this.dataList.map(item => (
          <img
            class='data-img'
            src={item.mainImage}
            alt=""
            onClick={() => {
              this.$emit('handleClick', {
                id: item.activityCommonId,
                path: item.to,
                linkType: item.linkType,
                type: item.type,
              });
            }}
          />
        ))}
      </div>
    );
  },
};

export default BannerList;
