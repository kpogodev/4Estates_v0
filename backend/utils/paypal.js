import axios from 'axios'

//Paypal Access Token
const getPayPalAccessToken = async () => {
  const url = 'https://api.sandbox.paypal.com/v1/oauth2/token'
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET,
    },
  }

  try {
    const response = await axios.post(url, params, config)
    return response.data.access_token
  } catch (error) {
    console.log({ name: error.response.data.name, message: error.response.data.message })
    return null
  }
}

//Paypal Subscription Details
export const getPayPalSubscriptionDetails = async (subscriptionId) => {
  const url = `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}`
  const config = {
    headers: {
      Authorization: `Bearer ${await getPayPalAccessToken()}`,
    },
  }

  try {
    const { data } = await axios.get(url, config)
    return data
  } catch (error) {
    console.log({ name: error.response.data.name, message: error.response.data.message })
    return null
  }
}

//Paypal Subscription Suspend
export const suspendPayPalSubscription = async (subscriptionId) => {
  const accessToken = await getPayPalAccessToken()
  const url = `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/suspend`
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(url, { reason: 'User decied to suspend the subscription' }, config)
    return res
  } catch (error) {
    console.log({ name: error.response.data.name, message: error.response.data.message })
  }
}

//Paypal Subscription Reactivate
export const reactivatePayPalSubscription = async (subscriptionId) => {
  const accessToken = await getPayPalAccessToken()
  const url = `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/activate`
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(url, { reason: 'User decied to re-activate the subscription' }, config)
    return res
  } catch (error) {
    console.log({ name: error.response.data.name, message: error.response.data.message })
  }
}

//Paypal Subscription Cancel
export const cancelPayPalSubscription = async (subscriptionId) => {
  const accessToken = await getPayPalAccessToken()
  const url = `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(url, { reason: 'User decied to cancel the subscription' }, config)
    return res
  } catch (error) {
    console.log({ name: error.response.data.name, message: error.response.data.message })
  }
}
