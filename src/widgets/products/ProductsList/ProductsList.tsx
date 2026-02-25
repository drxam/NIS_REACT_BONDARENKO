import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../../app/api/productsApi';
import { useAppSelector } from '../../../app/store/hooks';
import { selectProductsPageSize } from '../../../app/store/selectors';

export function ProductsList() {
  const { t } = useTranslation();
  const pageSize = useAppSelector(selectProductsPageSize);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const queryParams = useMemo(() => {
    const params: { limit: number; skip: number; q?: string } = {
      limit: pageSize,
      skip: page * pageSize,
    };
    if (search.trim()) params.q = search.trim();
    return params;
  }, [pageSize, page, search]);

  const { data, isLoading, isError } = useGetProductsQuery(queryParams);

  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);
  const hasPrev = page > 0;
  const hasNext = page < totalPages - 1;

  return (
    <div>
      <h1>{t('products.title')}</h1>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="search"
          placeholder={t('products.search')}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          style={{ padding: 8, minWidth: 200 }}
        />
      </div>

      {isLoading && <p>{t('products.loading')}</p>}
      {isError && <p style={{ color: 'var(--error-color, #c00)' }}>{t('products.error')}</p>}

      {!isLoading && !isError && data?.products && (
        <>
          {data.products.length === 0 ? (
            <p>{t('products.empty')}</p>
          ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {data.products.map((product) => (
                  <li key={product.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <strong>{product.title}</strong>
                      <span style={{ marginLeft: 8 }}>{product.category}</span>
                      <span style={{ marginLeft: 8 }}>— {product.price} €</span>
                      <span style={{ marginLeft: 8 }}>★ {product.rating}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
                <button type="button" disabled={!hasPrev} onClick={() => setPage((p) => p - 1)}>
                  {t('products.prev')}
                </button>
                <span>
                  {page * pageSize + 1}–{Math.min((page + 1) * pageSize, total)} {t('products.of')} {total}
                </span>
                <button type="button" disabled={!hasNext} onClick={() => setPage((p) => p + 1)}>
                  {t('products.next')}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
