'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';

export default function ExchangeForm() {
  const setExchangeInfo = useCurrencyStore((state) => state.setExchangeInfo);

  const handleSubmit = async (formData: FormData) => {
    const value = formData.get('currency') as string;
    // console.log(value);
    const [amount, from, , to] = value.split(' ');
    // console.log(amount);
    // console.log(from);
    // console.log(to);
    const data = await exchangeCurrency({ amount, from, to });
    console.log(data);

    setExchangeInfo(data);
  };

  return (
    <form className={styles.form} action={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
