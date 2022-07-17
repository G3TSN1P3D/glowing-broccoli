import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header';
import Footer from './components/footer';
import Navbar from './components/navBar';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

  function App() {
    return (
      <Router>
        <Navbar />
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

export default App;
