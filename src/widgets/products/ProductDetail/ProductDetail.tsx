import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetProductQuery } from '../../../app/api/productsApi';

interface ProductDetailProps {
  productId: number;
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { t } = useTranslation();
  const { data: product, isLoading, isError } = useGetProductQuery(productId, { skip: productId <= 0 });

  if (productId <= 0) {
    return <p>{t('product.notFound')}</p>;
  }

  if (isLoading) return <p>{t('product.loading')}</p>;
  if (isError) return <p style={{ color: 'var(--error-color, #c00)' }}>{t('product.error')}</p>;
  if (!product) return <p>{t('product.notFound')}</p>;

  return (
    <div>
      <p><Link to="/products">{t('product.back')}</Link></p>
      <h1>{product.title}</h1>
      {product.thumbnail && (
        <img src={product.thumbnail} alt={product.title} style={{ maxWidth: 200, marginBottom: 16 }} />
      )}
      <p><strong>{t('product.description')}:</strong> {product.description}</p>
      <p><strong>{t('product.category')}:</strong> {product.category}</p>
      <p><strong>{t('product.price')}:</strong> {product.price} €</p>
      <p><strong>{t('product.rating')}:</strong> {product.rating}</p>
      {product.brand != null && (
        <p><strong>{t('product.brand')}:</strong> {product.brand}</p>
      )}
      {product.stock != null && (
        <p><strong>{t('product.stock')}:</strong> {product.stock}</p>
      )}
    </div>
  );
}
