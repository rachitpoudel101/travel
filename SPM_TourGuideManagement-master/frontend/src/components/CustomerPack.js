import React, { Component } from "react";
import axios from "axios";
import Train from '../img/my23.jpg'
import '../App.css';
import myStyle from "../style_sheets/Style.module.css";
//import Package from ".../src/Package";
//import Package from "../../../TourPackage/BACKEND/models/Package";

export default class cusPack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      isLoggedIn: !!localStorage.getItem('userId') // Check if user is logged in
    };
  }

  componentDidMount() {
    this.retrivePackages();
  }

  retrivePackages() {
    console.log("Fetching initial packages data...");
    axios.get("http://localhost:8070/package/all").then(res => {
      if (res.data.success) {
        console.log("Successfully retrieved packages:", res.data.existingPackages);
        this.setState({
          packages: res.data.existingPackages
        });
      } else {
        console.error("API returned error status:", res.data);
      }
    }).catch(err => {
      console.error("Error fetching packages:", err);
    });
  }

  //Filter /Search Method
  filterContent(packages, searchTerm) {
    console.log("Filtering with search term:", searchTerm);
    console.log("Packages data:", packages);

    const searchTermLower = searchTerm.toLowerCase();
    const results = packages.filter((pack) => {
      if (!pack.Destination) {
        console.log("Warning: Package missing Destination field:", pack);
        return false;
      }
      return pack.Destination.toLowerCase().includes(searchTermLower);
    });

    console.log("Search results:", results);
    this.setState({ packages: results });
  }

  handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    console.log("Search input changed:", searchTerm);

    axios.get("http://localhost:8070/package/all").then(res => {
      if (res.data.success) {
        console.log("API returned data:", res.data);
        this.filterContent(res.data.existingPackages, searchTerm)
      } else {
        console.error("API call succeeded but with error status:", res.data);
      }
    }).catch(error => {
      console.error("Error fetching packages:", error);
    });
  };

  handleCustomizeClick = (e) => {
    if (!this.state.isLoggedIn) {
      e.preventDefault();
      if (window.confirm('Please login to customize your tour package. Would you like to login now?')) {
        window.location.href = '/user/login';
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <img className="img-fluid" src={Train} height={100} width={600} alt="Card image cap" />
          </div>
          <a 
            href={this.state.isLoggedIn ? "/customize/package" : "#"} 
            onClick={this.handleCustomizeClick}
            className={myStyle.btnSubmit2} 
            style={{
              position: "absolute", 
              right: 150, 
              top: 410,
              opacity: this.state.isLoggedIn ? 1 : 0.8
            }}
          >
            <strong>
              <i className="fa-solid fa-plane-departure"></i>
              &nbsp;&nbsp;{this.state.isLoggedIn ? 'Customize Your Tour' : 'Login to Customize Tour'}
            </strong>
          </a>&nbsp;&nbsp;

          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h3 className={`Ball ${myStyle.tableH}`}><strong>Search your Destination </strong></h3>
            </div>

            <div className="text-center col-lg-3 mt-2 mb-2" style={{ right: "100px", width: 600 }}>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                name="searchTerm"
                onChange={this.handleTextSearch}
              />
            </div>
          </div>

          <br />
          <table className="table">
            <thead className="thead-primary">
              <tr>
                <th scope="col" className="tableH">Package Name</th>
                <th scope="col" className="tableH">Destination</th>
                <th scope="col" className="tableH">Number of Days</th>
                <th scope="col" className="tableH">Number of Passengers</th>
                <th scope="col" className="tableH">Total Price (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.packages.map((packages, index) => (
                <tr key={index}>
                  <td>{packages.packName}</td>
                  <td className="desti">{packages.Destination}</td>
                  <td className="num">{packages.NumOfDays}</td>
                  <td className="num">{packages.NumOfPassen}</td>
                  <td className="totPrice2">{packages.TotPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <a href="/view/cuspackage" className={myStyle.btnBack}><strong>Back</strong></a>&nbsp;&nbsp;

        </div>

        <br />
        <div className="card-body">
          <h5 className="text-dark text-center"><strong>Travelo</strong></h5>
          <div className="text-white text-center">copyright @2020 Travelo All rights are reserved</div>
        </div>
        <div className="card-footer text-muted">
        </div>
      </div>
    )
  }
}