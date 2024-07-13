/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

// import { useState } from "react";

// import usersData from "../../users";
function Search({searchUser}) {
  
     function searchName(name) {
      searchUser(name)
     }
    return (
        <div className="px-4 d-none d-md-block">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                    <input  onChange={(e) => searchName(e.target.value)} type="text" className="form-control my-3" placeholder="Search..." />
                </div>
            </div>
        </div>
    )
}

export default Search;