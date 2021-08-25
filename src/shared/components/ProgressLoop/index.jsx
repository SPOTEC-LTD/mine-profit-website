import classNames from 'classnames';
import numberUtils from 'aa-utils/lib/numberUtils';

import './index.less';

const ProgressLoop = {
  props: {
    width: {
      type: [Number, String],
      default: 100,
    },

    strokeWidth: {
      type: [Number, String],
      default: 1,
    },

    // 开口圆
    strokeColor: {
      type: String,
      default: '',
    },

    // 底圆
    trailColor: {
      type: String,
      default: '',
    },

    percent: Number,

    className: {
      type: String,
      default: '',
    },
  },

  computed: {
    circleParams() {
      const diameter = numberUtils.minus(this.width, this.strokeWidth);
      const radius = numberUtils.divide(diameter, 2);
      const perimeter = numberUtils.times(Math.PI, diameter);
      const strokeDashoffset = numberUtils.times(perimeter, this.percent);
      const circleCenterX = numberUtils.divide(this.width, 2);

      return {
        radius,
        perimeter,
        strokeDashoffset,
        circleCenterX,
      };
    },
  },

  render() {
    const { width, strokeWidth, strokeColor, trailColor } = this;
    const { radius, circleCenterX, perimeter, strokeDashoffset } = this.circleParams;
    const circleList = [
      { color: trailColor, dashoffset: 0 },
      { color: strokeColor, dashoffset: strokeDashoffset },
    ];

    return (
      <div class={classNames('circle-box', this.className)}>
        <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
          {circleList.map(({ color, dashoffset }, index) => (
            <circle
              key={index}
              cx={circleCenterX}
              cy={circleCenterX}
              r={radius}
              fill="none"
              stroke-width={strokeWidth}
              stroke={color}
              transform={`rotate(-90, ${circleCenterX}, ${circleCenterX})`}
              style={{
                strokeDasharray: perimeter,
                strokeDashoffset: dashoffset,
              }}
            />
          ))}
        </svg>
        <div class={'circle-content'}>
          {this.$slots.default}
        </div>
      </div>
    );
  },
};

export default ProgressLoop;
