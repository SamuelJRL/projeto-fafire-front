import type { Subscription } from "../types/Subscription";

function isValidDate(dateStr: string): boolean {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function getClosestSubscription(subscriptions: Subscription[]): Subscription | null {
  const today = new Date();

  const validSubs = subscriptions.filter(sub => isValidDate(sub.startDate));

  const futureSubs = validSubs.filter(sub => {
    const subDate = new Date(sub.startDate);
    return subDate >= today;
  });

  if (futureSubs.length === 0) {
    return null;
  }

  let closest = futureSubs[0];
  let closestDate = new Date(closest.startDate);

  for (const sub of futureSubs) {
    const subDate = new Date(sub.startDate);
    if (subDate < closestDate) {
      closest = sub;
      closestDate = subDate;
    }
  }

  return closest;
}