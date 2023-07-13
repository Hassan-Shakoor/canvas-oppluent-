import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './components/FirebaseAuthComp/firebase';
import Login from './components/Login';
import Category from './components/Category';
import CategoryContent from './components/CategContentComponent/CategoryContent';

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
        {/* <Route path="/categories/:id" component={CategoryContent} /> */}
      </Routes>
    </Router>
  );
}
// element={isAuthenticated ? (<Category />) : <Navigate to="/" replace />}>
export default App;
