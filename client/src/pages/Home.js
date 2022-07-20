import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PROFILE } from "../utils/queries";
import '../App.css'

export default function Home() {
  const { data } = useQuery(QUERY_PROFILE);

  return (
    // Drew wants a title in jumbo
    // description of the site and buttons for 


    <div>

    <div className="jumbotron mt-3 text-primary" id='home-jumbo'>
      <h1 className="display-4 d-flex justify-content-center p-5">Welcome to Slugger Stats!</h1>
      <h4>What we do:</h4>
      <p className="lead d-flex justify-content-center p-5">
      Slugger Stats is a website where you can record baseball player stats with an intuitive, easy to use design. Record every at bat and what follows so you can track stats all season long <br/> <br/>
      No more sifting through old stat cards and inputting the numbers in a spreadsheet at home, here everything is stored automatically plus you can share your stats with other people simply by sending them a link to your player page
      </p>
      {!data ?
      <div className="d-flex justify-content-center">
        <Link to='/login'>
          <button className="btn btn-primary btn-lg m-1 mr-3">Log In</button>
        </Link>
        <Link to='/signup'>
          <button className="btn btn-primary btn-lg m-1">Sign Up</button>
        </Link>
      </div>
        :
      <div className="d-flex justify-content-center">
        <Link to='/profile'>
          <button className="btn btn-primary btn-lg m-1 mr-3">My Profile</button>
        </Link>
        <Link to='/record'>
          <button className="btn btn-primary btn-lg m-1">Record Game</button>
        </Link>
      </div>
      }
    </div>
      <hr className="my-4 p-4" />
      <p className="lead d-flex justify-content-center p-5">
      To get started, simply create an account, head over to your profile page to create your first player then you are ready to start tracking games <br/> <br/>
      If you ever want to check stats, you can see your players stats by selecting them from your profile page. You can also see how they stack up against the competition on the All Players page and view stats from players around the world!
      </p>
    <div className="container p-5 static-bottom">
      <div className="row bottom">
        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
          <h5>Kyle Gorski</h5>
          <p>
            <a href="https://github.com/GorillaJxnes">Github Profile</a>
          </p>
        </div>
        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
          <h5>Drew Kempen</h5>
          <p>
            <a href="https://github.com/dkempen98">Github Profile</a> 
          </p>
        </div>
        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
          <h5>Salvador Flores</h5>
          <p>
            <a href="https://github.com/G3TSN1P3D">Github Profile</a>
          </p>
        </div>
      </div>
    </div>
    </div>

    
  );
}
