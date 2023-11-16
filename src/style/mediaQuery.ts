type MediaQueryProps = {
  mobile: number;
  tablet: number;
  desktop: number;
};

const sizes: MediaQueryProps = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (acc, label) => {
    acc[label] = (style: String) =>
      `@media (max-width: ${sizes[label]}px) { ${style} }`;
    return acc;
  },
  {} as { [index: string]: Function },
);
