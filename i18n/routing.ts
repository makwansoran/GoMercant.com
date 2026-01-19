import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

// Supported locales - can be extended as needed
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    'en', // English
    'no', // Norwegian
    'es', // Spanish
    'fr', // French
    'de', // German
    'it', // Italian
    'pt', // Portuguese
    'ru', // Russian
    'zh', // Chinese
    'ja', // Japanese
    'ko', // Korean
    'ar', // Arabic
    'hi', // Hindi
    'nl', // Dutch
    'sv', // Swedish
    'da', // Danish
    'fi', // Finnish
    'pl', // Polish
    'tr', // Turkish
    'cs', // Czech
    'ro', // Romanian
    'hu', // Hungarian
    'el', // Greek
    'th', // Thai
    'vi', // Vietnamese
    'id', // Indonesian
    'he', // Hebrew
    'uk', // Ukrainian
    'bg', // Bulgarian
    'hr', // Croatian
    'sk', // Slovak
    'sl', // Slovenian
    'et', // Estonian
    'lv', // Latvian
    'lt', // Lithuanian
    'is', // Icelandic
    'mk', // Macedonian
    'sq', // Albanian
    'sr', // Serbian
    'bs', // Bosnian
    'ka', // Georgian
    'hy', // Armenian
    'az', // Azerbaijani
    'kk', // Kazakh
    'uz', // Uzbek
    'mn', // Mongolian
    'ne', // Nepali
    'si', // Sinhala
    'my', // Burmese
    'km', // Khmer
    'lo', // Lao
    'bn', // Bengali
    'ta', // Tamil
    'te', // Telugu
    'ml', // Malayalam
    'kn', // Kannada
    'gu', // Gujarati
    'pa', // Punjabi
    'ur', // Urdu
    'fa', // Persian
    'af', // Afrikaans
    'sw', // Swahili
    'zu', // Zulu
    'xh', // Xhosa
    'am', // Amharic
    'ms', // Malay
    'tl', // Tagalog
    'haw', // Hawaiian
    'cy', // Welsh
    'ga', // Irish
    'mt', // Maltese
  ],

  // Used when no locale matches
  defaultLocale: 'en'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
