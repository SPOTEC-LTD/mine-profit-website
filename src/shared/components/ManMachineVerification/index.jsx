import { mapActions, mapState, mapMutations } from 'vuex';
import { Spin } from 'ant-design-vue';
import Notification from '@/shared/services/Notification';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_SHOW_MAN_MACHINE_VERIFICATION,
  GET_PICTURE,
  REQ_CHECK,
  UPDATE_CAPTCHA_VERIFICATION,
  UPDATE_IS_VERIFICATION_SUCCESS,
} from '@/modules/manMachineVerification';
import { aesEncrypt } from './utils/ase';
import './index.less';

const ManMachineVerification = {
  data() {
    return {
      passFlag: '', // 是否通过的标识
      startMoveTime: '', // 移动开始的时间
      endMoveTime: '', // 移动结束的时间
      tipsBackColor: '', // 提示词的背景颜色
      tipWords: '',
      vSpace: 22,
      text: '',
      blockSize: {
        height: 32,
        width: 63,
      },
      setSize: {
        imgHeight: 175,
        imgWidth: 350,
        barHeight: 15,
        barWidth: 350,
      },
      top: 0,
      left: 0,
      moveBlockLeft: undefined,
      leftBarWidth: 0,
      // 移动中样式
      leftBarBackgroundColor: '#cbe0f2',
      iconClass: 'icon-right',
      status: false, // 鼠标状态
      isEnd: false, // 是够验证完成
      showRefresh: true,
      transitionLeft: '',
      transitionWidth: '',
    };
  },
  computed: {
    ...mapState({
      backImgBase: state => state.manMachineVerification.blockPuzzleCaptcha.originalImageBase64,
      blockBackImgBase: state => state.manMachineVerification.blockPuzzleCaptcha.jigsawImageBase64,
      backToken: state => state.manMachineVerification.blockPuzzleCaptcha.token,
      secretKey: state => state.manMachineVerification.blockPuzzleCaptcha.secretKey,
      getPictureLoading: state => state.loading.effects[`${MAN_MACHINE_VERIFICATION}/${GET_PICTURE}`],
    }),
    barArea() {
      return this.$el.querySelector('.verify-bar-area');
    },
  },
  watch: {
    // type变化则全面刷新
    type: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
  mounted() {
    this.getData();
    this.init();
  },
  methods: {
    ...mapActions(MAN_MACHINE_VERIFICATION, [GET_PICTURE, REQ_CHECK]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [
      UPDATE_SHOW_MAN_MACHINE_VERIFICATION,
      UPDATE_CAPTCHA_VERIFICATION,
      UPDATE_IS_VERIFICATION_SUCCESS,
    ]),
    init() {
      this[UPDATE_IS_VERIFICATION_SUCCESS](false);
      window.removeEventListener('mousemove', e => {
        this.move(e);
      });

      // 鼠标松开
      window.removeEventListener('mouseup', () => {
        this.end();
      });

      window.addEventListener('mousemove', e => {
        this.move(e);
      });

      // 鼠标松开
      window.addEventListener('mouseup', () => {
        this.end();
      });
    },
    // 鼠标按下
    start(e) {
      e = e || window.event;
      let x;
      if (!e.touches) {
        // 兼容PC端
        x = e.clientX;
      } else {
        // 兼容移动端
        x = e.touches[0].pageX;
      }
      this.startLeft = Math.floor(x - this.barArea.getBoundingClientRect().left);
      this.startMoveTime = +new Date(); // 开始滑动的时间
      if (this.isEnd === false) {
        this.text = '';
        this.leftBarBackgroundColor = '#cbe0f2';
        this.iconColor = '#fff';
        e.stopPropagation();
        this.status = true;
      }
    },
    // 鼠标移动
    move(e) {
      e = e || window.event;
      if (this.status && this.isEnd === false) {
        let x;
        if (!e.touches) {
          x = e.clientX;
        } else {
          x = e.touches[0].pageX;
        }
        const barAreaLeft = this.barArea.getBoundingClientRect().left;
        let moveBlockLeft = x - barAreaLeft - this.blockSize.width / 2; // 小方块相对于父元素的left值
        const maxMoveWidth = this.barArea.offsetWidth - this.blockSize.width;
        if (moveBlockLeft >= maxMoveWidth) {
          moveBlockLeft = maxMoveWidth;
        }
        if (moveBlockLeft <= 0) {
          moveBlockLeft = 0;
        }
        // 拖动后小方块的left值
        this.moveBlockLeft = `${moveBlockLeft}px`;
        this.leftBarWidth = `${moveBlockLeft + 2}px`;
      }
    },

    // 鼠标松开
    end() {
      this.endMoveTime = +new Date();
      // 判断是否重合
      if (this.status && this.isEnd === false) {
        let moveLeftDistance = parseInt((this.moveBlockLeft || '').replace('px', ''), 10);
        moveLeftDistance = (moveLeftDistance * 350) / parseInt(this.setSize.imgWidth, 10);
        moveLeftDistance *= 2;
        const data = {
          pointJson: this.secretKey
            ? aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), this.secretKey)
            : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
          token: this.backToken,
        };
        this[REQ_CHECK](data)
          .then(() => {
            this.isEnd = true;
            this.passFlag = true;
            this.leftBarBackgroundColor = 'rgba(92, 184, 92, 0.5)';
            this.tipWords = `${((this.endMoveTime - this.startMoveTime) / 1000).toFixed(2)}s验证成功`;
            const captchaVerification = this.secretKey
              ? aesEncrypt(
                `${this.backToken}---${JSON.stringify({ x: moveLeftDistance, y: 5.0 })}`,
                this.secretKey,
              )
              : `${this.backToken}---${JSON.stringify({ x: moveLeftDistance, y: 5.0 })}`;
            this[UPDATE_CAPTCHA_VERIFICATION](captchaVerification);
            setTimeout(() => {
              this.tipWords = '';
              this.closeBox();
              this[UPDATE_IS_VERIFICATION_SUCCESS](true);
            }, 1000);
          })
          .catch(error => {
            const { message } = error;
            this.passFlag = false;
            this.$parent.$emit('error', this);
            this.tipWords = message;
            this.leftBarBackgroundColor = 'rgba(217, 83, 79, 0.5)';
            setTimeout(() => {
              this.refresh();
            }, 1000);
          });
        this.status = false;
      }
    },
    closeBox() {
      this[UPDATE_SHOW_MAN_MACHINE_VERIFICATION](false);
    },
    refresh() {
      this.showRefresh = true;

      this.transitionLeft = 'left .3s';
      this.moveBlockLeft = 0;

      this.leftBarWidth = 0;
      this.transitionWidth = 'width .3s';

      this.leftBarBackgroundColor = '#cbe0f2';
      this.iconClass = 'icon-right';
      this.isEnd = false;
      this.tipWords = '';

      this.getData();
      setTimeout(() => {
        this.transitionWidth = '';
        this.transitionLeft = '';
        this.text = this.explain;
      }, 300);
    },

    getData() {
      this[GET_PICTURE]().catch(error => {
        const { message } = error;
        Notification.error(message);
        this.closeBox();
      });
    },
  },
  render() {
    return (
      <div class="mask">
        <div class="verify-box">
          <div class="verify-box-top">请拖动下方滑块完成验证</div>
          <div class="verify-box-bottom">
            <div style={{ position: 'relative' }}>
              <div
                class="verify-img-out"
                style={{ height: `${parseInt(this.setSize.imgHeight, 10) + this.vSpace}px` }}
              >
                <Spin spinning={this.getPictureLoading}>
                  <div
                    class="verify-img-panel"
                    style={{
                      width: `${this.setSize.imgWidth}px`,
                      height: `${this.setSize.imgHeight}px`,
                    }}
                  >
                    {this.backImgBase && (
                      <img
                        src={`data:image/png;base64,${this.backImgBase}`}
                        alt=""
                        style={{ width: '100%', height: '100%', display: 'block' }}
                      />
                    )}

                    <transition name="tips">
                      {this.tipWords && (
                        <span class={['verify-tips', this.passFlag ? 'suc-bg' : 'err-bg']}>{this.tipWords}</span>
                      )}
                    </transition>
                  </div>
                </Spin>
              </div>
              <div
                class="verify-bar-area"
                style={{
                  width: `${this.setSize.imgWidth}px`,
                  height: `${this.setSize.barHeight}px`,
                  lineHeight: `${this.setSize.barHeight}px`,
                }}
              >
                <span class="verify-msg">{this.text}</span>
                <div
                  class="verify-left-bar"
                  style={{
                    width: `${this.leftBarWidth}`,
                    height: `${this.setSize.barHeight}px`,
                    backgroundColor: this.leftBarBackgroundColor,
                    transaction: this.transitionWidth,
                  }}
                >
                  <div
                    class="verify-move-block"
                    style={{
                      height: `${this.setSize.barHeight}px`,
                      left: this.moveBlockLeft,
                      transition: this.transitionLeft,
                    }}
                    onMousedown={this.start}
                  >
                    <i class={['verify-icon', this.iconClass]} />
                    <div
                      class="verify-sub-block"
                      style={{
                        width: `${Math.floor((parseInt(this.setSize.imgWidth, 10) * 77) / 350)}px`,
                        height: `${this.setSize.imgHeight}px`,
                        top: `-${parseInt(this.setSize.imgHeight, 10) + this.vSpace}px`,
                        backgroundSize: `${this.setSize.imgWidth} ${this.setSize.imgHeight}`,
                      }}
                    >
                      {this.blockBackImgBase && (
                        <img
                          src={`data:image/png;base64,${this.blockBackImgBase}`}
                          alt=""
                          style={{ width: '100%', height: '100%', display: 'block' }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="verify-operate">
            <a onClick={this.refresh}>刷新</a>
            <a onClick={this.closeBox}>关闭</a>
          </div>
        </div>
      </div>
    );
  },
};

export default ManMachineVerification;
