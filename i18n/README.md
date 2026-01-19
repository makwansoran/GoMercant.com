# Internationalization (i18n) Setup

This website is now fully internationalized and can be translated to any language.

## Current Setup

- **Framework**: next-intl (Next.js App Router compatible)
- **Default Language**: English (en)
- **Supported Languages**: 60+ languages configured
- **Language Switcher**: Available in the navigation bar

## How It Works

1. **URL Structure**: All pages are under `/[locale]/` (e.g., `/en/contact`, `/no/contact`)
2. **Translation Files**: Located in `/messages/[locale].json`
3. **Language Detection**: Automatically detects user's browser language
4. **Language Switcher**: Users can manually switch languages via the globe icon

## Adding a New Language

To add a new language (e.g., French):

1. **Add the locale to routing** (`i18n/routing.ts`):
   ```typescript
   locales: ['en', 'no', 'fr', ...]
   ```

2. **Create translation file** (`messages/fr.json`):
   ```json
   {
     "common": {
       "brand": "SPECTR",
       "clientLogin": "Connexion client",
       ...
     }
   }
   ```

3. **Copy structure from English**: Use `messages/en.json` as a template and translate all values.

## Translation Keys Structure

- `common.*` - Common UI elements (buttons, labels, etc.)
- `hero.*` - Hero section content
- `services.*` - Services section
- `ceo.*` - CEO message section
- `partners.*` - Partner resources
- `news.*` - News section
- `careers.*` - Careers pages
- `contact.*` - Contact page
- `login.*` - Login page
- `research.*` - Research pages
- `insights.*` - Insight cards

## Using Translations in Components

```tsx
import {useTranslations} from 'next-intl';

export function MyComponent() {
  const t = useTranslations();
  
  return <h1>{t('common.brand')}</h1>;
}
```

## Language Switcher

The language switcher is automatically included in the main navigation. Users can click the globe icon to see all available languages and switch between them.

## Notes

- All URLs automatically include the locale prefix
- The default locale (English) can be accessed without prefix at root `/`
- Translations support interpolation: `t('careers.noPerfectFitDescription', {email: 'msi@spectr.no'})`
