import type { Locale } from "./i18n";
import { localePath } from "./i18n";
import type { LocalizedRecipeEntry } from "./recipe-locale";
import type { IngredientItem, ScenarioItem } from "./taxonomy";
import { brandName, getSiteUrl } from "./site";

export const absoluteUrl = (path: string) => new URL(path, getSiteUrl()).toString();

export interface ItemListEntry {
  name: string;
  path: string;
}

export const buildItemListJsonLd = (name: string, path: string, items: ItemListEntry[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  url: absoluteUrl(path),
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path)
  }))
});

export const buildBreadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path)
  }))
});

const recipeYieldByLocale: Record<Locale, string> = {
  "zh-TW": "人份",
  en: "servings",
  ja: "人分",
  ko: "인분"
};

const recipeCuisineByLocale: Record<Locale, string> = {
  "zh-TW": "台灣家常料理",
  en: "Taiwanese home cooking",
  ja: "台湾の家庭料理",
  ko: "대만 가정 요리"
};

const recipeStepNameByLocale: Record<Locale, (stepNumber: number) => string> = {
  "zh-TW": (stepNumber) => `步驟 ${stepNumber}`,
  en: (stepNumber) => `Step ${stepNumber}`,
  ja: (stepNumber) => `手順 ${stepNumber}`,
  ko: (stepNumber) => `단계 ${stepNumber}`
};

export const buildRecipeJsonLd = (recipe: LocalizedRecipeEntry, locale: Locale = "zh-TW") => {
  const recipePagePath = localePath(locale, `/recipes/${recipe.slug}`);
  const recipePageUrl = absoluteUrl(recipePagePath);
  const coverImageUrl = absoluteUrl(recipe.data.coverImage);
  const stepName = recipeStepNameByLocale[locale];

  return {
  "@context": "https://schema.org",
  "@type": "Recipe",
  name: recipe.data.title,
  description: recipe.data.description,
  url: recipePageUrl,
  image: [coverImageUrl],
  author: {
    "@type": "Organization",
    name: brandName
  },
  datePublished: recipe.data.publishedAt.toISOString().slice(0, 10),
  dateModified: recipe.data.updatedAt.toISOString().slice(0, 10),
  prepTime: `PT${recipe.data.prepTime}M`,
  cookTime: `PT${recipe.data.cookTime}M`,
  totalTime: `PT${recipe.data.totalTime}M`,
  recipeYield: `${recipe.data.servings} ${recipeYieldByLocale[locale]}`,
  recipeCategory: recipe.data.category,
  recipeCuisine: recipeCuisineByLocale[locale],
  keywords: recipe.data.tags.join(", "),
  recipeIngredient: recipe.data.ingredients.map((item) => `${item.name} ${item.amount}${item.unit}`),
  recipeInstructions: recipe.data.steps.map((step, index) => {
    const position = index + 1;
    return {
      "@type": "HowToStep",
      position,
      name: stepName(position),
      text: step,
      url: `${recipePageUrl}#step-${position}`,
      image: coverImageUrl
    };
  }),
  nutrition: recipe.data.calories
    ? {
        "@type": "NutritionInformation",
        calories: `${recipe.data.calories} calories`,
        proteinContent: recipe.data.protein ? `${recipe.data.protein} g` : undefined,
        fatContent: recipe.data.fat ? `${recipe.data.fat} g` : undefined,
        carbohydrateContent: recipe.data.carbs ? `${recipe.data.carbs} g` : undefined
      }
    : undefined
  };
};

export const buildFaqJsonLd = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

export const buildCollectionPageJsonLd = (title: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url: absoluteUrl(path)
});

export const buildDefinedTermJsonLd = (ingredient: IngredientItem) => ({
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: ingredient.name,
  description: ingredient.description,
  inDefinedTermSet: absoluteUrl("/ingredients"),
  termCode: ingredient.slug
});

export const buildThingJsonLd = (
  item: Pick<ScenarioItem, "name" | "description" | "slug">,
  path?: string
) => ({
  "@context": "https://schema.org",
  "@type": "Thing",
  name: item.name,
  description: item.description,
  url: absoluteUrl(path ?? `/scenarios/${item.slug}/`)
});
