import React from 'react'


const verifyAge = (DOB) => {

    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }  
    return (
        
        {age}
    );
}

export default verifyAge;
