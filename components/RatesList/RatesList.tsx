import styles from './RatesList.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

interface Rate {
  key: string;
  value: string;
}

interface RatesListProps {
  rates: Rate[];
}

export default function RatesList({ rates }: RatesListProps) {
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);

  return (
    <ul className={styles.list}>
      {rates.map(({ key, value }) => (
        <li className={styles.item} key={key}>
          <p className={styles.text}>
            1 {key} = {value} {baseCurrency}
          </p>
        </li>
      ))}
    </ul>
  );
}
