import Select, { SingleValue } from 'react-select';

import symbols from './symbols.json';

import './ReactSelect.css';
import styles from './SelectRates.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

interface OptionType {
  value: string;
  label: string;
}

interface SelectRatesProps {
  baseCurrency: string;
}

export default function SelectRates({ baseCurrency }: SelectRatesProps) {
  const setBaseCurrency = useCurrencyStore((state) => state.setBaseCurrency);
  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setBaseCurrency(selectedOption.value);
    }
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        options={symbols}
        className={styles.select}
        classNamePrefix="react-select"
        isSearchable
        onChange={handleChange}
        value={{ value: baseCurrency, label: baseCurrency }}
      />
    </div>
  );
}
