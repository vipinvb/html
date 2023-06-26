import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import checkAuth from "./auth/checkAuth";


function SearchMedicine()
 {
      const [medicines, setMedicines] = useState([]);
      const [keyword, setKeyword] = useState("");

      const user = useSelector(store => store.auth.user);

  useEffect(() => {
    axios
      .get(`https://medicalstore.mashupstack.com/api/medicine/search?keyword=${keyword}`, {headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setMedicines(response.data);
      });
  }, [keyword, user.token]);

  function handleSearchInputChange(event) 
    {
    setKeyword(event.target.value);
    }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">Search Medicine</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or company..."
                value={keyword}
                onChange={handleSearchInputChange}
              />
            </div>
            <div className="list-group">
                  {medicines.map((medicine) => (
                <div
                    key={medicine.id}
                    className="list-group-item list-group-item-action"
                 >
                    Medicine: {medicine.name} <br />
                    Company: {medicine.company} <br />
                     Expiry: {medicine.expiry_date}
           </div>
                  ))}
           </div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(SearchMedicine);






