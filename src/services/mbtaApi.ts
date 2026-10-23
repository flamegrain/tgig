/**
 * MBTA V3 API Service
 * Documentation: https://api-v3.mbta.com/docs/swagger/index.html
 */

export const MBTA_API_KEY = '77bda4f84b3d4a0796bd6e66ae0d11a7';
export const MBTA_BASE_URL = 'https://api-v3.mbta.com';

export interface MbtaAlert {
  id: string;
  header: string;
  shortHeader: string;
  serviceEffect: string;
  effect: string;
  severity: number;
  routes: string[];
  url?: string;
  updatedAt: string;
}

export interface MbtaLivePrediction {
  id: string;
  routeId: string;
  directionId: number;
  arrivalTime: string | null;
  departureTime: string | null;
  status?: string;
  stopId: string;
}

// Fallback alerts in case user is offline or API times out
const FALLBACK_ALERTS: MbtaAlert[] = [
  {
    id: 'fb-green',
    header: 'Green Line: Normal service with scheduled signal maintenance near Government Center.',
    shortHeader: 'Green Line: Regular Service',
    serviceEffect: 'Green Line Notice',
    effect: 'NOTICE',
    severity: 1,
    routes: ['Green-B', 'Green-C', 'Green-D', 'Green-E'],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fb-red',
    header: 'Red Line: Operating with 10-minute headways between Alewife and Braintree/Ashmont.',
    shortHeader: 'Red Line: Normal',
    serviceEffect: 'Red Line Normal',
    effect: 'NOTICE',
    severity: 1,
    routes: ['Red'],
    updatedAt: new Date().toISOString(),
  },
];

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number = 3500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

const headers = {
  'x-api-key': MBTA_API_KEY,
  'Accept': 'application/vnd.api+json',
};

/**
 * Fetch all active Rapid Transit Subway routes (Red, Orange, Blue, Green branches)
 */
export async function fetchSubwayRoutes() {
  try {
    const res = await fetchWithTimeout(
      `${MBTA_BASE_URL}/routes?filter[type]=0,1`,
      { headers }
    );
    if (!res.ok) throw new Error(`MBTA API error: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return [];
  }
}

/**
 * Fetch active alerts for rapid transit lines
 */
export async function fetchActiveAlerts(): Promise<MbtaAlert[]> {
  try {
    const routesParam = 'Red,Orange,Blue,Green-B,Green-C,Green-D,Green-E';
    const res = await fetchWithTimeout(
      `${MBTA_BASE_URL}/alerts?filter[route]=${routesParam}&filter[datetime]=CURRENT`,
      { headers },
      4000
    );
    if (!res.ok) throw new Error(`MBTA API error: ${res.status}`);
    const data = await res.json();

    const alerts = (data.data || []).map((item: any) => {
      const informedRoutes: string[] = [];
      (item.attributes.informed_entity || []).forEach((entity: any) => {
        if (entity.route && !informedRoutes.includes(entity.route)) {
          informedRoutes.push(entity.route);
        }
      });

      return {
        id: item.id,
        header: item.attributes.header || '',
        shortHeader: item.attributes.short_header || item.attributes.header || '',
        serviceEffect: item.attributes.service_effect || 'Service Notice',
        effect: item.attributes.effect || 'NOTICE',
        severity: item.attributes.severity || 1,
        routes: informedRoutes,
        url: item.attributes.url || undefined,
        updatedAt: item.attributes.updated_at || '',
      };
    });

    return alerts.length > 0 ? alerts : FALLBACK_ALERTS;
  } catch (err) {
    console.warn('MBTA API timed out or network blocked, using local fallback:', err);
    return FALLBACK_ALERTS;
  }
}

/**
 * Get nearest MBTA stations to given coordinates
 */
export async function fetchNearestStops(lat: number, lng: number, radiusKm: number = 1.0) {
  try {
    const degreesRadius = radiusKm * 0.009;
    const res = await fetchWithTimeout(
      `${MBTA_BASE_URL}/stops?filter[latitude]=${lat}&filter[longitude]=${lng}&filter[radius]=${degreesRadius}&filter[route_type]=0,1`,
      { headers },
      3000
    );
    if (!res.ok) throw new Error(`MBTA API error: ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    return [];
  }
}
