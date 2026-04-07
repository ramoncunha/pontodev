'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { initialGifts, Gift } from '../data/gifts';
import { GiftCard } from '../components/GiftCard';
import { ReserveModal } from '../components/ReserveModal';

export default function Home() {
  const [gifts] = useState<Gift[]>(initialGifts);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [reservedIds, setReservedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservedGifts = async () => {
    try {
      const res = await fetch('/api/gifts');
      if (res.ok) {
        const data = await res.json();
        setReservedIds(data.reserved_ids || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservedGifts();
  }, []);

  const handleReserve = (gift: Gift) => {
    setSelectedGift(gift);
  };

  const handleCloseModal = () => {
    setSelectedGift(null);
  };

  const handleSuccess = () => {
    fetchReservedGifts();
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
        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: '40px', color: '#8b879e' }}>Carregando presentes...</div>
        ) : (
          <div className={styles.grid}>
            {gifts.map((gift, index) => (
              <GiftCard 
                key={gift.id} 
                gift={gift} 
                index={index} 
                onReserve={handleReserve}
                isReserved={reservedIds.includes(gift.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal Render */}
      {selectedGift && (
        <ReserveModal 
          gift={selectedGift} 
          onClose={handleCloseModal} 
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
