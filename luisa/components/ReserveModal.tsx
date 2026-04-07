import React, { useState } from 'react';
import styles from './ReserveModal.module.css';
import { Gift } from '../data/gifts';

interface ReserveModalProps {
  gift: Gift | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({ gift, onClose, onSuccess }) => {
  const [step, setStep] = useState<'choice' | 'form'>('choice');
  const [giverName, setGiverName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!gift) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!giverName.trim()) return;
    
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gift_id: gift.id, giver_name: giverName })
      });

      if (response.status === 409) {
        setErrorMsg('Poxa! Alguém acabou de reservar esse presente.');
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Erro ao reservar');
      }
      
      // Sucesso
      onSuccess();
      window.open(gift.storeUrl, '_blank');
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg('Ocorreu um erro ao comunicar com o servidor.');
      setIsLoading(false);
    }
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
            {errorMsg && <div className={styles.errorMessage}>{errorMsg}</div>}
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
                disabled={isLoading}
              />
            </div>
            
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Aguarde...' : 'Confirmar e ir para a loja'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
