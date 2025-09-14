'use client';

import Link from 'next/link';
import { MdCurrencyExchange } from 'react-icons/md';
import { usePathname } from 'next/navigation';

import styles from './Header.module.css';
import SelectRates from '../SelectRates/SelectRates';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function Header() {
  const pathname = usePathname();
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <MdCurrencyExchange className={styles.logo} />
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link href="/" className={pathname === '/' ? styles.active : styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/rates" className={pathname === '/rates' ? styles.active : styles.link}>
                Rates
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {baseCurrency && <SelectRates baseCurrency={baseCurrency} />}
    </header>
  );
}
