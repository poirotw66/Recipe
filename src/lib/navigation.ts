export interface NavLink {
  href: string;
  label: string;
  emphasis?: "button";
}

export const primaryNavLinks: NavLink[] = [
  { href: "/recipes/", label: "食譜" },
  { href: "/ingredients/", label: "食材" },
  { href: "/scenarios/", label: "情境" }
];

export const topicNavLinks: NavLink[] = [
  { href: "/brunch/", label: "早午餐" },
  { href: "/pasta/", label: "義大利麵" },
  { href: "/beef/", label: "牛肉" }
];

export const utilityNavLinks: NavLink[] = [
  { href: "/tools/fridge-recipe/", label: "冰箱剩料", emphasis: "button" }
];

export const allNavLinks: NavLink[] = [...primaryNavLinks, ...topicNavLinks, ...utilityNavLinks];
