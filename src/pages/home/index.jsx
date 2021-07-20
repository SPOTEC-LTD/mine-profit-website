import BaseContainer from '@/shared/components/BaseContainer';
import BlockChainDate from '@/pages/home/BlockChainDate';
import ProductMarket from '@/pages/home/ProductMarket';
import Banner from './Banner';

const Home = {
  render() {
    return (
      <div>
        <Banner />
        <BaseContainer>
          <BlockChainDate />
          <ProductMarket />
        </BaseContainer>
      </div>
    );
  },
};

export default Home;
