import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/navBar';
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

  function App() {
    return (
      <Router>
        <Nav />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/stats" element={<Stats />}/>
            <Route path="/statsall" element={<StatsAll />}/>
          </Routes>
      </Router>
    ) 
  }



// function App() {
//     return (
//     <ApolloProvider client={client}>
//       <div className="flex-column justify-flex-start min-100-vh">
//         {/* <Header /> */}
//         <div className="container">
//           <Home />
//         </div>
//         {/* <Footer /> */}
//       </div>
//     </ApolloProvider>
//   );
// }

// export default App;
