// Importing FontAwesomeIcon
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
// Importing Modules
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './components/FirebaseAuthComp/firebase';
import Login from './pages/Login';
import Category from './pages/Category';
import CategoryContent from './components/CategContentComponent/CategoryContent';
import Edit from './pages/Edit';
import PropertySearch from './pages/PropertySearch';
// Intialising FontAwesomeIcon
library.add(far);
library.add(fas)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/categories"
          element={<Category />}>
          <Route path=':id' element={<CategoryContent />}/>
        </Route>
        <Route path="/edit" element={<Edit />} />
        <Route path="/property-search" element={<PropertySearch />} />
      </Routes>
    </Router>
  );
}
// element={isAuthenticated ? (<Category />) : <Navigate to="/" replace />}>
export default App;
