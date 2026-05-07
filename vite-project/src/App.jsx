import { act, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import './i18n.js';
const ThemeToggle = ({ theme, setTheme }) => {
  const handleClick = () => {
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button className={theme === 'dark' ? 'dark' : 'light'} onClick={handleClick}>
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

const SizeButtons = ({ size, setSize, theme }) => {
  const decreaseSize = () => {
    if (size <= 30) return;
    setSize(size - 10);
  };
  const increaseSize = () => {
    if (size >= 80) return;
    setSize(size + 10);
  };

  return (
    <div>
      <button className={theme === 'dark' ? 'dark' : 'light'} onClick={() => decreaseSize()}>
        A-
      </button>
      <button className={theme === 'dark' ? 'dark' : 'light'} onClick={() => increaseSize()}>
        A+
      </button>
    </div>
  );
};

const Greeting = ({ greeting, theme, size }) => {
  const { t } = useTranslation();
  return (
    <h1
      className={theme === 'dark' ? 'dark' : 'light'}
      style={{ fontSize: size + 'px', margin: size / 2 + 'px' }}
    >
      {t(greeting)}
    </h1>
  );
};

const LanguageButtons = ({ language, setHistory, theme, activeIndex, setActiveIndex }) => {
  const { t, i18n } = useTranslation();

  const handleClick = (lng, i) => {
    setHistory((curr) => {
      if (curr.length >= 5) {
        return [lng.str, ...curr.slice(0, 4)];
      }
      return [lng.str, ...curr];
    });
    setActiveIndex(i);
    i18n.changeLanguage(lng.locale);
  };

  return (
    <div>
      <ul id='language-buttons'>
        {language.map((lng, i) => (
          <button
            className={`${theme === 'dark' ? 'dark' : 'light'} ${activeIndex === i ? 'active' : 'un-active'}`}
            key={i}
            onClick={() => handleClick(lng, i)}
          >
            {lng.str}
          </button>
        ))}
      </ul>
    </div>
  );
};

const HistoryFeature = ({ history, setHistory, theme }) => {
  return (
    <div>
      <h3>History</h3>
      <ul id='history-list'>
        {history.length === 0
          ? 'No selections yet'
          : history.map((lng, i) => <li key={i}>{lng}</li>)}
      </ul>
      <button className={theme === 'dark' ? 'dark' : 'light'} onClick={() => setHistory([])}>
        Clear History
      </button>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('light');
  const [size, setSize] = useState(50);
  const [greeting, setGreeting] = useState('greeting');
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState([
    { locale: 'en', str: 'English' },
    { locale: 'es', str: 'Spanish' },
    { locale: 'ht', str: 'Haitian Creole' },
    { locale: 'pt', str: 'Portuguese' },
    { locale: 'fr', str: 'French' },
    { locale: 'ja', str: 'Japanese' },
  ]);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <main className={theme === 'dark' ? 'dark' : 'light'}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <SizeButtons size={size} setSize={setSize} theme={theme} />
      <Greeting greeting={greeting} theme={theme} size={size} />
      <LanguageButtons
        language={language}
        setHistory={setHistory}
        theme={theme}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <HistoryFeature history={history} setHistory={setHistory} theme={theme} />
    </main>
  );
}

export default App;
