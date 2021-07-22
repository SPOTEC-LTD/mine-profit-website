import FooterLayout from '@/pages/Account/HashRate/List/components/FooterLayout';
import TotalIncomeCellList from '@/pages/Account/HashRate/List/components/TotalIncomeCellList';
import PledgeStatusTag from '../components/PledgeStatusTag';

const CardFooter = {
  props: ['data'],
  render() {
    const { data } = this;
    return (
      <FooterLayout
        scopedSlots={{
          topExtra: () => <TotalIncomeCellList data={data} />,
          leftContent: () => <PledgeStatusTag status={data.status} />,
        }}
      />
    );
  },
};

export default CardFooter;
