const assetPaths = import.meta.glob(`@/assets/*.{jpg,jpeg,png}`, {
  query: { format: 'avif;png', as: 'meta:src;format;aspect;width;height' },
  import: 'default',
  eager: true
});

const entryPaths = import.meta.glob(`@/pages/BlogEntry/entries/*/*.{jpg,jpeg,png}`, {
  query: { format: 'avif;png', as: 'meta:src;format;aspect;width;height' },
  import: 'default',
  eager: true
});

export const allImagePaths = { ...assetPaths, ...entryPaths };
