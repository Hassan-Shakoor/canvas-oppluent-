// Importing FontAwesomeIcon
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// ** Firebase
import { auth } from '../src/configs/firebase';

// ** Pages
import Login from './pages/Login';
import Category from './pages/Category';
import TermsOfUse from './pages/TermsOfUse';
import Edit from './pages/Edit';
import PropertySearch from './pages/PropertySearch';
import AccountInformation from './pages/AccountInformation';

import { DndContext } from '@dnd-kit/core';


// Importing Modules
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CategoryContent from './components/CategContentComponent/CategoryContent';
import { store } from './store/store'
import { Provider } from 'react-redux';
import ColumnMLS from './components/PropertySearchComp/ColumnMLS';
import Partners from './pages/Partners';
import NewPartner from './pages/NewPartner';
import PartnerEdit from './pages/PartnerEdit';
import Share from './pages/Share';
import TemplateRequest from './pages/TemplateRequest';
import { getUserInformation } from './services/firebase/getUserInformation';

// Intialising FontAwesomeIcon
library.add(far);
library.add(fas)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUserInfo = async () => {
    const userProfile = await getUserInformation()
    if (userProfile) {
      setIsAdmin(userProfile?.isAdmin);
      // console.log(userProfile)
    }
  }

  useEffect(() => {
    getUserInfo();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      // console.log(user)
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/categories" replace /> : <Login />} />
          <Route path="/categories" element={isAuthenticated ? <Category /> : <Navigate to="/" replace />}>
            <Route path=':id' element={<CategoryContent />} />
          </Route>
          <Route path="/folders" element={isAuthenticated ? <Category /> : <Navigate to="/" replace />}>
            <Route path=':id' element={<CategoryContent />} />
          </Route>
          <Route path="/edit/:id" element={<Edit />} />
          <Route path='/property-search' element={<PropertySearch />}>
            <Route path=':id' element={<ColumnMLS />} />
          </Route>
          <Route path='/profile' element={isAuthenticated ? <AccountInformation /> : <Navigate to="/" replace />} />
          <Route path='/terms_of_use' element={<TermsOfUse />} />
          <Route path='/partners' element={isAuthenticated ? <Partners /> : <Navigate to="/" replace />} />
          <Route path='/partners/new' element={isAuthenticated ? <NewPartner /> : <Navigate to='/' replace />} />
          <Route path='/partners/:id/edit' element={isAuthenticated ? <PartnerEdit /> : <Navigate to='/' replace />} />
          <Route path='/share/:userId/:categoryId/:templateId' element={isAuthenticated ? <Share /> : <Navigate to='/' replace />} />
          <Route path='/template-request' element={isAdmin ? <TemplateRequest /> : <Navigate to='/' replace />} />
          {/* <Route path='/template-request' element={<TemplateRequest />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}
// element={isAuthenticated ? (<Category />) : <Navigate to="/" replace />}>
export default App;