import fetch from 'cross-fetch';

export async function fetchData(url): Promise<any> {
  const response = await fetch(url);
  return response.json();
}

export function isArrayWithNonZeroLength(input): boolean {
  return Boolean(Array.isArray(input) && input.length);
}
