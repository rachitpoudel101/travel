import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//import css file from style sheets directory
import styleDisplayPayments from "../style_sheets/Payment.module.css";

//Import components from the component directory
import Profile from "./Profile";

//import images from img directory
import illustration from "../img/void.png";

const DisplayPayment = (props) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = () => {
    axios
      .get(`http://localhost:8070/payment/get/${props.userId}`)
      .then((response) => {
        setData(response.data.payment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteEntry = () => {
    axios
      .delete(`http://localhost:8070/payment/delete/${props.userId}`)
      .then(() => {
        console.log("Deleted");
        retrieveData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styleDisplayPayments.maincontainer}>
      <div className={styleDisplayPayments.side_bar}>
          <Profile {...props} userId={props.userId}/>
      </div>
      {data ? (
        <div className={styleDisplayPayments.container} style={{width: "1400px"}}>
          <div className={styleDisplayPayments.innercontainer}>
            <h2 className={`text-center ${styleDisplayPayments.headertext}`}>Payment Details</h2>
            <hr className={styleDisplayPayments.divider} style={{ marginTop: "35px", marginBottom: "-20px"}} /><br></br><br></br>
            <div className="text-center">
              <p>Card Number :</p>
              <p style={{ marginTop: "-12px", fontSize: "18px", fontWeight: "500", marginBottom: "25px" }}>{data.card_num}</p>
              <p>Full Name :</p>
              <p style={{ marginTop: "-12px", fontSize: "18px", fontWeight: "500", marginBottom: "25px" }}>{data.full_name}</p>
              <p>Expiry Date :</p>
              <p style={{ marginTop: "-12px", fontSize: "18px", fontWeight: "500", marginBottom: "70px" }}>{data.expiry_date}</p>
            </div>
            <h5 style={{marginLeft: "90px", marginBottom: "20px"}}>Billing Address</h5><hr className={styleDisplayPayments.divider} style={{ marginTop: "10px" }} /><br></br>
            <div style={{ marginLeft: "90px", marginTop: "-30px" }}>
              <p style={{ fontSize: "18px", fontWeight: "400" }}>{data.full_name}</p>
              <p style={{ marginTop: "-10px", fontSize: "18px", fontWeight: "400" }}>{data.street_address},</p>
              <p style={{ marginTop: "-10px", fontSize: "18px", fontWeight: "400" }}>{data.city}, {data.zip_code}</p>
              <p style={{ marginTop: "-10px", fontSize: "18px", fontWeight: "400" }}>{data.state}</p>
              <p style={{ marginTop: "-10px", fontSize: "18px", fontWeight: "400" }}>{data.country}</p>
              <br></br>
            </div>
            <div className={styleDisplayPayments.btncontainer}>
              <Link to={`/update/payment+details/${props.userId}`}>
              <button type="button" className={styleDisplayPayments.btn_update}>Update</button>
              </Link>
              <button onClick={deleteEntry} className={styleDisplayPayments.btn_delete}>Delete</button>
            </div>
          </div>
        </div>   
        ) : (
          <div className={`text-center ${styleDisplayPayments.nocard}`} style={{width: "1000px"}}>
            <img src={illustration} alt="Logo" className={styleDisplayPayments.illustration}/>
            <h4 className="text-center" style={{marginBottom: "30px"}}><strong>You don't have any card details added to the system</strong></h4>
            <Link to={"/add/payment+details"} className={styleDisplayPayments.btn_update} style={{marginTop: '20px', padding: "6px 40px 6px 40px"}}>Add</Link>
          </div>
        )}
    </div>
  );
};

export default DisplayPayment;