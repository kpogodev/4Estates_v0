import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

const range = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12500, 15000, 17500,
  20000, 25000, 30000, 35000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
]

function PriceInputs() {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()

  const minOptions = useMemo(() => {
    return maxPrice > 0 ? range.filter((num) => num < maxPrice) : range
  }, [maxPrice])

  const maxOptions = useMemo(() => {
    return range.filter((num) => num > minPrice)
  }, [minPrice])

  const handleMinPriceChange = useCallback(
    (e) => {
      setMinPrice(+e.target.value)

      if (+e.target.value === 0) {
        let current = Object.fromEntries(searchParams.entries())
        current['price[gte]'] && delete current['price[gte]']
        return setSearchParams(current)
      }

      setSearchParams({ ...Object.fromEntries(searchParams.entries()), 'price[gte]': e.target.value })
    },
    [searchParams, setSearchParams]
  )

  const handleMaxPriceChange = useCallback(
    (e) => {
      setMaxPrice(+e.target.value)

      if (+e.target.value === 0) {
        let current = Object.fromEntries(searchParams.entries())
        current['price[lte]'] && delete current['price[lte]']
        return setSearchParams(current)
      }

      setSearchParams({ ...Object.fromEntries(searchParams.entries()), 'price[lte]': e.target.value })
    },
    [searchParams, setSearchParams]
  )

  useEffect(() => {
    searchParams.get('price[gte]') && setMinPrice(+searchParams.get('price[gte]'))
    searchParams.get('price[lte]') && setMaxPrice(+searchParams.get('price[lte]'))
  }, [searchParams])

  return (
    <div className='flex gap-2'>
      <div className='form-control'>
        <label className='label py-0 text-sm'>Min Price:</label>
        <select name='min_price' className='select select-sm select-bordered text-black' value={minPrice} onChange={handleMinPriceChange}>
          <option value={0}>No min</option>
          {minOptions.map((option) => (
            <option key={nanoid()} value={option}>
              {`${option} PCM`}
            </option>
          ))}
        </select>
      </div>
      <div className='form-control'>
        <label className='label py-0 text-sm'>Max Price:</label>
        <select name='max_price' className='select select-sm select-bordered text-black' value={maxPrice} onChange={handleMaxPriceChange}>
          <option value={0}>No max</option>
          {maxOptions.map((option) => (
            <option key={nanoid()} value={option}>
              {`${option} PCM`}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default PriceInputs
