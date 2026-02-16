import axios from 'axios';
import type { Province, Ward } from '@shared/types/location';
import { API_ENDPOINTS } from '@shared/constants';

export const getProvincesRequest = async (): Promise<Province[]> => {
  const res = await axios.get(`${API_ENDPOINTS.LOCATION}/p/`);
  return res.data ?? [];
};

export const getWardsByProvinceRequest = async (
  provinceCode: number,
): Promise<Ward[]> => {
  const res = await axios.get(
    `${API_ENDPOINTS.LOCATION}/p/${provinceCode}?depth=2`,
  );

  return res.data?.wards ?? [];
};
