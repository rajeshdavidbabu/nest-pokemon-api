import fetch from 'cross-fetch';

export async function fetchData(url) { 
  const response = await fetch(url);
  return response.json();
}

export function isArrayWithNonZeroLength(input) { 
    return Array.isArray(input) && input.length;
}