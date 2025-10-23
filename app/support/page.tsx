'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');

  const donationOptions = [
    { amount: '5', label: 'Coffee' },
    { amount: '10', label: 'Lunch' },
    { amount: '25', label: 'Dinner' },
    { amount: '50', label: 'Feast' }
  ];

  const handleDonate = () => {
    const amount = selectedAmount === 'custom' ? customAmount : selectedAmount;
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please select or enter a valid amount');
      return;
    }

    // In a real app, you would integrate with a payment processor here
    alert(`Thank you for your donation of $${amount}! This would redirect to a payment processor in a real app.`);
    
    // Reset form
    setSelectedAmount('');
    setCustomAmount('');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Support Fantasy Names</h1>
        <p className={styles.subtitle}>
          Help keep the magic alive and the names flowing!
        </p>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.heart}>✨</div>
        
        <p className={styles.message}>
          Fantasy Name Generator is completely free and will always be. 
          If you&apos;ve found our tool helpful for your creative projects, 
          consider supporting us with a small donation.
        </p>

        {/* Donation Options */}
        <div className={styles.donationOptions}>
          {donationOptions.map((option) => (
            <div
              key={option.amount}
              className={`${styles.donationOption} ${
                selectedAmount === option.amount ? styles.selected : ''
              }`}
              onClick={() => {
                setSelectedAmount(option.amount);
                setCustomAmount('');
              }}
            >
              <div className={styles.amount}>${option.amount}</div>
              <div className={styles.label}>{option.label}</div>
            </div>
          ))}
        </div>

        {/* Custom Amount */}
        <div className={styles.customAmount}>
          <input
            type="number"
            placeholder="Custom amount"
            className={styles.customInput}
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount('custom');
            }}
            min="1"
          />
        </div>

        {/* Donate Button */}
        <button
          className={styles.donateButton}
          onClick={handleDonate}
        >
          Donate Now 🪄
        </button>

        {/* Free Message */}
        <div className={styles.freeMessage}>
          <p>Don&apos;t worry, the site will always be completely free to use!</p>
        </div>

        {/* Alternative Support Options */}
        <div className={styles.alternatives}>
          <h3 className={styles.alternativesTitle}>Other ways to support</h3>
          <div className={styles.alternativeOptions}>
            <a href="/" className={styles.alternativeOption}>
              <span className={styles.emoji}>📚</span>
              <span>Use our names in your projects</span>
            </a>
            <a href="/" className={styles.alternativeOption}>
              <span className={styles.emoji}>👥</span>
              <span>Share with friends</span>
            </a>
            <a href="/support" className={styles.alternativeOption}>
              <span className={styles.emoji}>💡</span>
              <span>Suggest improvements</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}