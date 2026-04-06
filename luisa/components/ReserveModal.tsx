import React, { useState } from 'react';
import styles from './ReserveModal.module.css';
import { Gift } from '../data/gifts';

interface ReserveModalProps {
  gift: Gift | null;
  onClose: () => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({ gift, onClose }) => {
  const [giverName, setGiverName] = useState('');

  if (!gift) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giverName.trim()) return;
    
    // Numa implementação real, salvaríamos isso no backend aqui.
    console.log(`[Banco de Dados] Presente reservado: ${gift.name} por ${giverName}`);
    
    // Redireciona para a loja após "salvar"
    window.open(gift.storeUrl, '_blank');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Presentear</h2>
          <p className={styles.subtitle}>Você está oferecendo: <strong>{gift.name}</strong></p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="giverName" className={styles.label}>
              Seu nome (só a mamãe vai ver)
            </label>
            <input 
              id="giverName"
              type="text" 
              value={giverName}
              onChange={(e) => setGiverName(e.target.value)}
              placeholder="Ex: Titia Ana"
              className={styles.input}
              required
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Confirmar e Ir para a Loja
          </button>
        </form>
      </div>
    </div>
  );
};
