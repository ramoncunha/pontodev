import React from 'react';
import styles from './GiftCard.module.css';
import { Gift } from '../data/gifts';

interface GiftCardProps {
  gift: Gift;
  index: number;
  onReserve: (gift: Gift) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, index, onReserve }) => {
  return (
    <div 
      className={styles.card} 
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className={styles.imageContainer}>
        <img src={gift.imageUrl} alt={gift.name} className={styles.image} />
        <div className={styles.overlay}>
          <button 
            className={styles.reserveButton}
            onClick={() => onReserve(gift)}
          >
            Presentear
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{gift.name}</h3>
        <p className={styles.price}>{gift.priceLabel}</p>
      </div>
    </div>
  );
};
