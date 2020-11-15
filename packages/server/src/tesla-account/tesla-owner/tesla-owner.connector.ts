import axios from 'axios'
import { tesla, types } from '@teslapp/common'


export const fetchToken = async (
  config: types.Configuration,
  teslaAccount: types.TeslaAccount,
  grant_type: string,
  password?: string
) => {
  const data = {
    email: teslaAccount.email,
    client_id: config.teslaClientKey,
    client_secret: config.teslaClientSecret,
    grant_type
  }
  if (password?.length && grant_type === 'password') {
    data[grant_type] = password
  } else {
    data[grant_type] = teslaAccount[grant_type]
  }
  const res = await axios({
    method: 'post',
    url: `${config.ownerBaseUrl}/oauth/token?grant_type=${grant_type}`,
    data,
    headers: {
      'User-Agent': 'coderado-tesla-sync'
    }
  })
  console.log('Authenticated with Tesla API')
  const { access_token, refresh_token, token_expires_in } = res.data
  return {
    ...teslaAccount,
    access_token,
    refresh_token,
    token_expires_in,
    token_created_at: Date.now()
  }
}

export const fetchVehicles = async (config: types.Configuration,
                                    teslaAccount: types.TeslaAccount): Promise<types.Vehicle[]> => {
  const response = await axios.get(
    `${config.ownerBaseUrl}/api/1/vehicles`,
    buildAuthorizedTeslaConfig(teslaAccount.access_token)
  )
  return response?.data?.response
}

export const fetchVehicleData = async (
  config: types.Configuration,
  teslaAccount: types.TeslaAccount,
  id_s: string
): Promise<tesla.VehicleData | undefined> => {
  const vehicleData = await axios.get(
    `${config.ownerBaseUrl}/api/1/vehicles/${id_s}/vehicle_data`,
    buildAuthorizedTeslaConfig(teslaAccount.access_token)
  )
  return vehicleData?.data?.response
}

export const fetchNearbyChargers = async (config: types.Configuration, teslaAccount: types.TeslaAccount, id_s: string) => {
  const response = await axios.get(
    `${config.ownerBaseUrl}/api/1/vehicles/${id_s}/nearby_charging_sites`,
    buildAuthorizedTeslaConfig(teslaAccount.access_token)
  )
  return response?.data?.response
}

export const fetchVehicle = async (config: types.Configuration,
                                   teslaAccount: types.TeslaAccount, id_s: string) => {
  const response = await axios.get(
    `${config.ownerBaseUrl}/api/1/vehicles/${id_s}`,
    buildAuthorizedTeslaConfig(teslaAccount.access_token))
  return response?.data?.response
}


const buildAuthorizedTeslaConfig = (token) => ({
    headers: {
      'User-Agent': 'coderado-tesla-sync',
      Authorization: `Bearer ${token}`
    }
  }
)
