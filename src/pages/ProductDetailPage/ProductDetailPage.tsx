import { useParams } from 'react-router-dom';
import { ProductDetail } from '../../widgets/products/ProductDetail/ProductDetail';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  return <ProductDetail productId={id ? Number(id) : 0} />;
}
