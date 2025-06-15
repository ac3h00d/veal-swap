// pages/index.js
import Layout from '../components/Layout';

export default function Home() {
  const fakeTokens = [
    { name: 'Fentanyl', mcap: '$36.7K' },
    { name: 'Unemployed Corp', mcap: '$10.3K' },
    { name: 'Pumps Gone Crazy', mcap: '$19.6K' },
    { name: 'Toothless', mcap: '$9.7K' },
  ];

  return (
    <Layout>
      <div className="tokenGrid">
        {fakeTokens.map((token, index) => (
          <div key={index} className="tokenCard">
            <h3>{token.name}</h3>
            <p>Market Cap: {token.mcap}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}