import React from 'react';
import fs from '../../assets/jsonfile/stateAndDistricts.json';

const district=()=>{
    const statesAndUTs=Object.keys(fs);
    
    return(  
        <div>
            {console.log(statesAndUTs)}
        </div>
    )
}
export default district;