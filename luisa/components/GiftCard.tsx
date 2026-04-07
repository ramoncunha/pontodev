import React from 'react';
import styles from './GiftCard.module.css';
import { Gift } from '../data/gifts';

interface GiftCardProps {
  gift: Gift;
  index: number;
  isReserved: boolean;
  onReserve: (gift: Gift) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, index, isReserved, onReserve }) => {
  return (
    <div 
      className={`${styles.card} ${isReserved ? styles.reservedCard : ''}`} 
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className={styles.imageContainer}>
        <img src={gift.imageUrl} alt={gift.name} className={styles.image} />
        {!isReserved && (
          <div className={styles.overlay}>
            <button 
              className={styles.reserveButton}
              onClick={() => onReserve(gift)}
            >
              Presentear
            </button>
          </div>
        )}
        {isReserved && (
          <div className={styles.reservedOverlay}>
            <span className={styles.reservedTag}>Já Presenteado</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{gift.name}</h3>
        <p className={styles.price}>{gift.priceLabel}</p>
      </div>
    </div>
  );
};
