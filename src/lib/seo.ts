import type { RecipeEntry } from "./recipes";
import type { IngredientItem, ScenarioItem } from "./taxonomy";

const getSiteUrl = () => import.meta.env.PUBLIC_SITE_URL || "https://example.com";

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

export const buildRecipeJsonLd = (recipe: RecipeEntry) => ({
  "@context": "https://schema.org",
  "@type": "Recipe",
  name: recipe.data.title,
  description: recipe.data.description,
  image: [absoluteUrl(recipe.data.coverImage)],
  author: {
    "@type": "Organization",
    name: "今天煮什麼"
  },
  datePublished: recipe.data.publishedAt.toISOString().slice(0, 10),
  dateModified: recipe.data.updatedAt.toISOString().slice(0, 10),
  prepTime: `PT${recipe.data.prepTime}M`,
  cookTime: `PT${recipe.data.cookTime}M`,
  totalTime: `PT${recipe.data.totalTime}M`,
  recipeYield: `${recipe.data.servings} 人份`,
  recipeCategory: recipe.data.category,
  recipeCuisine: "台灣家常料理",
  keywords: recipe.data.tags.join(", "),
  recipeIngredient: recipe.data.ingredients.map((item) => `${item.name} ${item.amount}${item.unit}`),
  recipeInstructions: recipe.data.steps.map((step) => ({
    "@type": "HowToStep",
    text: step
  })),
  nutrition: recipe.data.calories
    ? {
        "@type": "NutritionInformation",
        calories: `${recipe.data.calories} calories`,
        proteinContent: recipe.data.protein ? `${recipe.data.protein} g` : undefined,
        fatContent: recipe.data.fat ? `${recipe.data.fat} g` : undefined,
        carbohydrateContent: recipe.data.carbs ? `${recipe.data.carbs} g` : undefined
      }
    : undefined
});

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
