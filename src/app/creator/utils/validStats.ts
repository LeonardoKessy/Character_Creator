export const STATS = ['con', 'str', 'dex', 'wis', 'int', 'cha'] as const;
export type Stat = typeof STATS[number];