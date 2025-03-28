import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//import css file from style sheets directory
import styles from "./style_sheets/App.module.css";

//import images from img directory
import logo from "./img/logo.jpg";

//Import components from the component directory
import Home from "./components/Home";
import AddPayment from "./components/AddPayment";
import DisplayPayment from "./components/DisplayPayment";
import UpdatePayment from "./components/UpdatePayment";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import PaymentHistory from "./components/PaymentHistory";
import PrintPayments from "./components/PrintPayment";
import Checkout from "./components/Checkout";
import AddTourguide from './components/AddTourguide';
import AllTourguides from './components/AllTourguides';
import UpdateTourguide from './components/UpdateTourguide';
import AddHotel from "./components/AddHotel";
import BookingHotel from "./components/BookingHotel";
import Navbar from "./components/Navbar";
import AllHotel from "./components/AllHotel";
import EditHotel from "./components/EditHotel";
import ViewHotel from "./components/ViewHotel";
import Report from "./components/report";
import AddPackage from './components/addPackage';
import Manager from "./components/PackManager";
import Sith from './components/edit';
import CusPack from './components/CustomerPack';
import CusPackage from './components/customizePackage';
import FindMyPack from './components/findMyPack';
import AllPacks from './components/AllPacks';
import EditPack from './components/PackUpdate'
import GuideReport from './components/guidereport';
import EditCusPack from './components/EditCusPack';
import TourGuideFAQ from "./components/TourGuideFAQ";
import TourUpdates from "./components/TourUpdates";

const App = () => {
  const [userId, setUserId] = React.useState(() => {
    // Try to get stored userId from localStorage on initial load
    return localStorage.getItem('userId') || null;
  });

  const isAuthorizedForTourGuide = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin' || userRole === 'tourmanager';
  };

  async function login(userId = null) {
    setUserId(userId);
    // Store userId in localStorage when logging in
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }

  async function logout() {
    setUserId(null);
    // Remove userId from localStorage when logging out
    localStorage.removeItem('userId');
  }

  return (
    <Router>
      <div className="App min-vh-100" style={{backgroundColor: "#f7f7f7"}}>
        <nav className={`navbar-fixed-top ${styles.nav}`}>
          <div className={`container ${styles.parentnav}`}>
            <img src={logo} alt="Travelo logo" className={styles.logo}></img>
            <div className={styles.topnav_center}>
              <ul>

                <li>
                  <Link to={`/home`}>Home</Link>
                </li>

                <li>
                  <Link to={`/view/hotel`}>Hotels</Link>
                </li>

                <li>
                  {isAuthorizedForTourGuide() ? (
                    <Link to={`/add/tourguide`}>Tour Guide</Link>
                  ) : (
                    <Link to="/user/login" onClick={(e) => {
                      e.preventDefault();
                      alert('Please login as an administrator or tour manager to access tour guide management.');
                      window.location.href = '/user/login';
                    }}>Tour Guide</Link>
                  )}
                </li>

                <li>
                  <Link to="/view/cuspackage">Tour Packages</Link>
                </li>

                <li>
                  <Link to={`/profile/home/${userId}`}>Profile</Link>
                </li>

                <li>
                  <Link to="/tour-updates">Tour Updates</Link>
                </li>

              </ul>
            </div>
            {userId ? (
              <>
                <Link to={'/home'} onClick={logout} className={styles.btn_login}>Logout</Link>
              </>
            ) : (
              <>
                <Link to={"/user/login"} className={styles.btn_login}>Login</Link>
              </>
            )}
          </div>
        </nav>
        <div>
          <Switch>
            
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route path="/home" component={Home} />

            <Route 
              path="/add/payment+details"
              render={(props) => <AddPayment {...props} userId={userId} />}
            />

            <Route
              path={`/view/payment+details/${userId}`}
              render={(props) => <DisplayPayment {...props} userId={userId} />}
            />

            <Route
              path={`/update/payment+details/${userId}`}
              render={(props) => <UpdatePayment {...props} userId={userId} />}
            />

            <Route
              path={`/profile/home/${userId}`}
              render={(props) => <UserProfile {...props} userId={userId} />}
            />

            <Route
              path="/new+user/signup"
              component={Signup} 
            />

            <Route
              path="/user/login"
              render={(props) => <Login {...props} login={login} />}
            />

            <Route
              path={`/view/payment+history/${userId}`}
              render={(props) => <PaymentHistory {...props} userId={userId} />}
            />

            <Route
              path={`/print/payment+history`}
              render={(props) => <PrintPayments {...props} userId={userId} />}
            />

            <Route
              path={`/checkout`}
              render={(props) => <Checkout {...props} userId={userId} />}
            />

            <Route path="/all/tourguide" component={AllTourguides} />

            <Route 
              path="/add/tourguide" 
              render={(props) => 
                isAuthorizedForTourGuide() ? (
                  <AddTourguide {...props} />
                ) : (
                  <Redirect to="/user/login" />
                )
              } 
            />

            <Route path="/update/tourguide/:id" component={UpdateTourguide} />

            <Route path="/admin/hotel" component={Navbar} />

            <Route path="/add/hotel" component={AddHotel} />

            <Route path="/all/hotel" component={AllHotel} />

            <Route path="/update/hotel/:id" component={EditHotel} />

            <Route path="/view/hotel" component={ViewHotel} />

            <Route path="/report" component={Report} />

            <Route path="/book/hotel" component={BookingHotel} />

            <Route path="/add/package" component={AddPackage} />

            <Route path="/man" component={Manager} />

            <Route path="/sith" component={Sith} />

            <Route path="/view/cuspackage" component={CusPack} />

            <Route 
              path="/customize/package" 
              render={(props) => <CusPackage {...props} userId={userId} />}
            />

            <Route path="/manage/AllPacks" component={AllPacks} />

            <Route path="/update/package/:id" component={EditPack} />

            <Route path="/guidereport" component={GuideReport} />
            
            <Route path="/find/package/:userId" render={(props) => <FindMyPack {...props} userId={props.match.params.userId} />} />
            
            <Route path="/find/package" component={FindMyPack} />
            
            {/* Enhanced route to pass userId to EditCusPack for sidebar navigation */}
            <Route path="/edit/cuspack/:id/:userId?" render={(props) => <EditCusPack {...props} userId={props.match.params.userId} />} />

            <Route path="/tour-guide-faq" component={TourGuideFAQ} />
            <Route path="/tour-updates" component={TourUpdates} />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;