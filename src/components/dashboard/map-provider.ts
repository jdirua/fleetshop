import { Provider } from 'pigeon-maps';

export const darkProvider: Provider = (x, y, z, dpr) => {
  return `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/${z}/${x}/${y}${dpr && dpr > 1 ? '@2x' : ''}.png`;
};
