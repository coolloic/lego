export const COLOR_PK = 'code';

export interface Color {
  [COLOR_PK]: string;
  description?: string;
}

export type ColorRecord = Record<string, Color>;
