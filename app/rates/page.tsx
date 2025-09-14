'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import { memo, useEffect, useMemo } from 'react';
import css from './RatesPage.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import Loader from '@/components/Loader/Loader';
import RatesList from '@/components/RatesList/RatesList';
import { latestRates } from '@/lib/service/exchangeAPI';
import Filter from '@/components/Filter/Filter';

const RatesListMemo = memo(RatesList);

export default function RatesPage() {
  const { baseCurrency, rates, filter, isLoading, isError, setRates, setIsLoading, setIsError } =
    useCurrencyStore();
  const filteredRates = useMemo(() => {
    return rates
      .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter.toLowerCase()))
      .map(([key, value]) => ({ key, value: Number(1 / value).toFixed(2) }));
  }, [baseCurrency, filter, rates]);

  useEffect(() => {
    if (!baseCurrency) return;
    setIsLoading(true);
    latestRates(baseCurrency)
      .then((data) => setRates(data))
      .catch((error) => setIsError(error))
      .finally(() => setIsLoading(false));
  }, [baseCurrency, setIsError, setIsLoading, setRates]);

  if (!baseCurrency) return <Loader />;

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          {rates.length > 0 && <Filter />}
          {filteredRates.length > 0 && <RatesListMemo rates={filteredRates} />}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
          {isLoading && <Loader />}
        </Container>
      </Section>
    </main>
  );
}
