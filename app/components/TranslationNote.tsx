import Link from "next/link";
import { getDictionary } from "../dictionary";
import { defaultLocale } from "../i18n";
import { getLocale } from "../locale";

type TranslationNoteProps = {
  isTranslated: boolean;
  // The Nynorsk page the text is translated from.
  originalPath: string;
};

// Tells readers of a translated page that the Nynorsk text is the original.
export async function TranslationNote({ isTranslated, originalPath }: TranslationNoteProps) {
  const locale = await getLocale();
  const { translationNote, untranslatedNote } = getDictionary(locale);
  if (locale === defaultLocale || !translationNote) return null;

  return (
    <p className="translation-note">
      {isTranslated ? (
        <>
          {translationNote.text}{" "}
          <Link href={originalPath} hrefLang={defaultLocale}>{translationNote.linkLabel}</Link>
        </>
      ) : (
        untranslatedNote
      )}
    </p>
  );
}
