export interface Timeslot{
  week:  string
  date: string
  time: string
  level: string
  spots: string
}


 const levelBadgeColor: Map<string, string> = new Map<string, string>([
  ['>25m', 'cyan'],
  ['50m - 100m', 'purple'],
  ['Entry Level', 'emerald'],
  ['25m - 50m', 'red'],
]);

export const getColorByLevel= (level: string): string => {
  return levelBadgeColor.get(level) || 'red';
};
