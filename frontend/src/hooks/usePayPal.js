import { useEffect, useState } from 'react'
import axios from 'axios'

const usePayPal = () => {
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/v1/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription&currency=GBP`
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    addPayPalScript()

    return () => {
      if (window.paypal) {
        setSdkReady(false)
        document.body.removeChild(document.querySelector('script[src*="paypal"]'))
      }
    }
  }, [])

  return { sdkReady }
}

export default usePayPal
