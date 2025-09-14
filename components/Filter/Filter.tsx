import { useCurrencyStore } from '@/lib/stores/currencyStore';
import styles from './Filter.module.css';

export default function Filter() {
  const filter = useCurrencyStore((state) => state.filter);
  const setFilter = useCurrencyStore((state) => state.setFilter);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={handleInputChange}
    />
  );
}
