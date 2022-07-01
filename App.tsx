import {AppNavigation} from 'navigation';
import React from 'react';
import {ThemeContextProvider} from 'contexts';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <AppNavigation />
    </ThemeContextProvider>
  );
};

export default App;
