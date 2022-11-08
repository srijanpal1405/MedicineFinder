import { useState } from "react";

function Home() {
    const [medicine, setMedicine] = useState("");
    const [pin, setPin] = useState("");

    const handleSubmit= (e) => {
        e.preventDefault()
        console.log(medicine);
        console.log(pin);
      };

    return (
      <div className="Home">
        <form action='/submit' method="post">
            <input type="text" id ="search" name="search" placeholder="Search Medicines" ></input>
            <input type="text" id ="pin" name="pin" placeholder="Enter Area PIN Code"></input>
            <input type="submit" value="Search" on></input>
        </form>
    </div>
    );
  }
  
export default Home;