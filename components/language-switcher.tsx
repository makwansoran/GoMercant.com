"use client"

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';
import {Globe} from 'lucide-react';
import {useState} from 'react';

const languages = [
  {code: 'en', name: 'English', nativeName: 'English'},
  {code: 'no', name: 'Norwegian', nativeName: 'Norsk'},
  {code: 'es', name: 'Spanish', nativeName: 'Español'},
  {code: 'fr', name: 'French', nativeName: 'Français'},
  {code: 'de', name: 'German', nativeName: 'Deutsch'},
  {code: 'it', name: 'Italian', nativeName: 'Italiano'},
  {code: 'pt', name: 'Portuguese', nativeName: 'Português'},
  {code: 'ru', name: 'Russian', nativeName: 'Русский'},
  {code: 'zh', name: 'Chinese', nativeName: '中文'},
  {code: 'ja', name: 'Japanese', nativeName: '日本語'},
  {code: 'ko', name: 'Korean', nativeName: '한국어'},
  {code: 'ar', name: 'Arabic', nativeName: 'العربية'},
  {code: 'hi', name: 'Hindi', nativeName: 'हिन्दी'},
  {code: 'nl', name: 'Dutch', nativeName: 'Nederlands'},
  {code: 'sv', name: 'Swedish', nativeName: 'Svenska'},
  {code: 'da', name: 'Danish', nativeName: 'Dansk'},
  {code: 'fi', name: 'Finnish', nativeName: 'Suomi'},
  {code: 'pl', name: 'Polish', nativeName: 'Polski'},
  {code: 'tr', name: 'Turkish', nativeName: 'Türkçe'},
  {code: 'cs', name: 'Czech', nativeName: 'Čeština'},
  {code: 'ro', name: 'Romanian', nativeName: 'Română'},
  {code: 'hu', name: 'Hungarian', nativeName: 'Magyar'},
  {code: 'el', name: 'Greek', nativeName: 'Ελληνικά'},
  {code: 'th', name: 'Thai', nativeName: 'ไทย'},
  {code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt'},
  {code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia'},
  {code: 'he', name: 'Hebrew', nativeName: 'עברית'},
  {code: 'uk', name: 'Ukrainian', nativeName: 'Українська'},
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale});
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm font-medium"
      >
        <Globe className="w-4 h-4"/>
        <span>{currentLanguage.nativeName}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-200 z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    locale === language.code
                      ? 'bg-orange-100 text-orange-600 font-semibold'
                      : 'hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{language.nativeName}</span>
                    <span className="text-xs text-neutral-500">{language.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
