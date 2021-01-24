import axios from 'axios'
import { Configuration, TeslaAccount, Vehicle } from '@tesla-dashboard/types'
import { VehicleData } from '@tesla-dashboard/tesla-types'

export const fetchToken = async (
  config: Configuration,
  teslaAccount: TeslaAccount,
  grant_type: string,
  password?: string
): Promise<TeslaAccount> => {
  const data = {
    email: teslaAccount.email,
    client_id: config.teslaClientKey,
    client_secret: config.teslaClientSecret,
    grant_type,
    [grant_type]:
      password?.length && grant_type === 'password'
        ? password
        : teslaAccount[grant_type],
  }

  try {
    const res = await axios({
      method: 'post',
      url: `${config.ownerBaseUrl}/oauth/token?grant_type=${grant_type}`,
      data,
      headers: {
        'User-Agent': 'coderado-tesla-sync',
      },
    })
    console.log('Authenticated with Tesla API')
    teslaAccount.access_token = res.data.access_token
    teslaAccount.refresh_token = res.data.refresh_token
    teslaAccount.token_expires_in = res.data.expires_in
    teslaAccount.token_created_at = Date.now()
    return teslaAccount
  } catch (e) {
    console.error('Unable to authenticate with Tesla API', e)
  }
}

export const fetchVehicles = async (
  config: Configuration,
  teslaAccount: TeslaAccount
): Promise<Vehicle[]> => {
  const response = await axios.get(
    `${config.ownerBaseUrl}/api/1/vehicles`,
    buildAuthorizedTeslaConfig(teslaAccount.access_token)
  )
  return response?.data?.response
}

export const fetchVehicleData = async (
  config: Configuration,
  teslaAccount: TeslaAccount,
  id_s: string
): Promise<VehicleData | undefined> => {
  const vehicleData = await axios.get(
    `${config.ownerBaseUrl}/api/1/vehicles/${id_s}/vehicle_data`,
    buildAuthorizedTeslaConfig(teslaAccount.access_token)
  )
  return vehicleData?.data?.response
}

export const fetchNearbyChargers = async (
  config: Configuration,
  teslaAccount: TeslaAccount,
  id_s: string
) => {
  const response = await axios.get(
    `${config.ownerBaseUrl}/api/1/vehicles/${id_s}/nearby_charging_sites`,
    buildAuthorizedTeslaConfig(teslaAccount.access_token)
  )
  return response?.data?.response
}

export const fetchVehicle = async (
  config: Configuration,
  teslaAccount: TeslaAccount,
  id_s: string
) => {
  const response = await axios.get(
    `${config.ownerBaseUrl}/api/1/vehicles/${id_s}`,
    buildAuthorizedTeslaConfig(teslaAccount.access_token)
  )
  return response?.data?.response
}

const buildAuthorizedTeslaConfig = (token: string) => ({
  headers: {
    'User-Agent': 'coderado-tesla-sync',
    Authorization: `Bearer ${token}`,
  },
})
