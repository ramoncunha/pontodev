import React, { useState } from 'react';
import styles from './ReserveModal.module.css';
import { Gift } from '../data/gifts';

interface ReserveModalProps {
  gift: Gift | null;
  onClose: () => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({ gift, onClose }) => {
  const [step, setStep] = useState<'choice' | 'form'>('choice');
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

  const handleOnlyView = () => {
    window.open(gift.storeUrl, '_blank');
  };

  const handleProceedToGift = () => {
    setStep('form');
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
          <p className={styles.subtitle}>
            {step === 'choice' ? 'Você selecionou: ' : 'Você está oferecendo: '}
            <strong>{gift.name}</strong>
          </p>
        </div>

        {step === 'choice' ? (
          <div className={styles.choiceContainer}>
            <button className={styles.secondaryButton} onClick={handleOnlyView}>
              Quero apenas ver o produto na loja
            </button>
            <button className={styles.primaryButton} onClick={handleProceedToGift}>
              Já decidi e vou presentear!
            </button>
          </div>
        ) : (
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
              Confirmar e ir para a loja
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
