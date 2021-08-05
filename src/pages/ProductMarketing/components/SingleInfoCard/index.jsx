import './index.less';

const SingleInfoCard = {
  props: {
    className: { type: String },
    title: { type: String },
    amount: [String, Number],
    deletedPrice: [String, Number],
    unit: { type: String },
  },

  render() {
    return (
      <div class='single-info-card-wrapper'>
        <div class='single-info-title'>{this.title}</div>
        <div class='single-info-details'>
          <span>{this.amount}</span>
          <span class='single-info-unit'>{this.unit}</span>
          {this.deletedPrice && (
            <span class='single-info-deleted-data'>
              {`${this.deletedPrice} ${this.unit}`}
            </span>
          )}
        </div>
      </div>
    );
  },
};

export default SingleInfoCard;
