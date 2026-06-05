/**
 * SPEC-FR-9.1.1, SPEC-FR-9.1.2, SPEC-FR-9.2.1, SPEC-FR-9.2.2
 */

import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Text} from '@gravity-ui/uikit'
import {fetchProductOffers, fetchShops} from '@/features/shops/api/shopsApi'
import {ProductOffersList} from '@/features/shops/ProductOffersList'
import {ShopCard} from '@/features/shops/ShopCard'

/**
 * @spec SPEC-FR-9.1.1 - Страница магазинов
 * @spec SPEC-FR-9.2.1 - Товарные предложения выбранного магазина
 */
export function ShopsPage() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)

  const {data: shops = [], isLoading} = useQuery({
    queryKey: ['shops'],
    queryFn: fetchShops,
  })

  const {data: offers = []} = useQuery({
    queryKey: ['product-offers', selectedShopId],
    queryFn: () => fetchProductOffers(selectedShopId ?? undefined),
    enabled: Boolean(selectedShopId),
  })

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <Text variant="header-1">Магазины экипировки</Text>

      {isLoading && <Text>Загрузка магазинов...</Text>}

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12}}>
        {shops.map((shop) => (
          <div key={shop.id} onClick={() => setSelectedShopId(shop.id)}>
            <ShopCard shop={shop} onSelect={setSelectedShopId} />
          </div>
        ))}
      </div>

      {selectedShopId && (
        <div>
          <Text variant="subheader-2">Товарные предложения</Text>
          <div style={{marginTop: 12}}>
            <ProductOffersList
              offers={offers}
              shopName={shops.find((s) => s.id === selectedShopId)?.name ?? 'Магазин'}
            />
          </div>
        </div>
      )}
    </div>
  )
}
