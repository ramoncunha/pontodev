import { useState } from 'react';
import styles from './App.module.css';
import { initialGifts, Gift } from './data/gifts';
import { GiftCard } from './components/GiftCard';
import { ReserveModal } from './components/ReserveModal';

function App() {
  const [gifts] = useState<Gift[]>(initialGifts);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const handleReserve = (gift: Gift) => {
    setSelectedGift(gift);
  };

  const handleCloseModal = () => {
    setSelectedGift(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Chá de Bebê da Luisa</h1>
        <p className={styles.subtitle}>
          Estamos muito felizes em compartilhar esse momento especial com você. 
          Aqui estão algumas sugestões de presentinhos que preparamos com muito carinho.
        </p>
      </header>

      <main>
        <div className={styles.grid}>
          {gifts.map((gift, index) => (
            <GiftCard 
              key={gift.id} 
              gift={gift} 
              index={index} 
              onReserve={handleReserve} 
            />
          ))}
        </div>
      </main>

      {/* Modal Render */}
      {selectedGift && (
        <ReserveModal 
          gift={selectedGift} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;
