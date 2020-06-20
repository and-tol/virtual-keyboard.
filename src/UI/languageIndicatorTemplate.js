/**
 * Layout of the language Indicator
 */
const languageIndicatorTemplate = (lang) => {

  console.log('lang', typeof lang)

  if (lang === 0) {
    return `<div class="language-indicator">
              <p>Language indicator: <span id="language-text"><i>English</i></span>. For switch language Win + Spase</p>
            </div>`;
  }

  return `<div class="language-indicator">
              <p>Индикатор языка: <span id="language-text"><i>Русский</i></span>. Для переключения языка Win + Spase</p>
            </div>`;
};

export default languageIndicatorTemplate;
