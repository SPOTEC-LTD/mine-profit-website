import CircleShutdownOutlined from 'ahoney/lib/icons/CircleShutdownOutlined';
import SquareSwitchOutlined from 'ahoney/lib/icons/SquareSwitchOutlined';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import classNames from 'classnames';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import locationServices from '@/shared/services/location/locationServices';
import { OFF } from '@/pages/Account/HashRate/consts/shutdownStatus';
import { PRODUCT } from '@/pages/Account/HashRate/consts/hashrateType';
import { getShutDownReasonMap } from '@/pages/Account/HashRate/consts/shutdownReason';
import PowerOffButton from '@/shared/components/PowerOffButton';
import { hashRateTurnOnPath, transferHashratePath } from '@/router/consts/urls';
import { CLOSE } from '@/pages/Account/HashRate/consts/pledgeSourceType';
import { POWER_OFF } from '@/shared/consts/powerStatus';
import FooterLayout from '../components/FooterLayout';
import StatusTag from '../components/StatusTag';
import styles from './index.less?module';

const CardFooter = {
  props: ['data'],

  methods: {
    getButtonDataSource(data) {
      return [
        {
          label: this.$t('hashrateOpen'),
          icon: <CircleShutdownOutlined />,
          onClick: () => {
            locationServices.push(hashRateTurnOnPath, { params: { productTemplateId: data.id } });
          },
        },
        {
          label: this.$t('hashrateOperationTransfer'),
          icon: <SquareSwitchOutlined />,
          onClick: () => {
            locationServices.push(transferHashratePath, {
              params: { productTemplateId: data.productTemplateId },
              query: { source: CLOSE, hashrateType: data.hashrateType, hasPowerOff: POWER_OFF },
            });
          },
        },
      ];
    },

    getCardFooterNode() {
      const { data } = this;
      const isShutdown = data.shutdownStatus === OFF;
      const isShowFooterButton = data.type === PRODUCT && isShutdown;

      const topExtra = isShutdown ? (
        <div class={styles['shutdown-reason']}>
          <InfoCircleFilled />
          <span>{getShutDownReasonMap(data.shutdownReason)}</span>
        </div>
      ) : '';

      const buttonGroupNode = (
        <div class={classNames(styles.footer, { [styles['no-footer']]: !isShowFooterButton })}>
          {
            isShowFooterButton && (
              <FooterButtonGroup dataSource={this.getButtonDataSource(data)} />
            )
          }
        </div>
      );

      const tagNode = (
        <StatusTag
          color={isShutdown ? '#cacaca' : '#ffd407'}
          tagText={isShutdown ? <PowerOffButton /> : this.$t('hashrateOpening')}
        />
      );

      return { topExtra, buttonGroupNode, tagNode };
    },
  },

  render() {
    const { topExtra, buttonGroupNode, tagNode } = this.getCardFooterNode();

    return (
      <FooterLayout
        scopedSlots={{
          topExtra: () => topExtra,
          leftContent: () => tagNode,
          rightContent: () => buttonGroupNode,
        }}
      />
    );
  },
};

export default CardFooter;
