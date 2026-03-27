import "./Search.css"; import 
{ countries } from "../data"; 

//need to add functionality to search and filter on our data, this is just the UI part of it.
const Search = () => { 
    return (
         <div className="search-container"> 
            <input type="text" placeholder="Search..." className="search"/> 
            <select className="search">
                {countries.map((country) => ( <option key={country} value={country}> {country} </option> ))} 
                </select> 
            
            </div> ); }
 export default Search;