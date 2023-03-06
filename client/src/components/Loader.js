import { useState} from "react";

import HashLoader from "react-spinners/HashLoader";



function Loader() {
  let [loading, setLoading] = useState(true);
  

  return (  
    <div className="sweet-loading ">
     
      <HashLoader
        color="#0000"
        loading={loading}
        cssOverride=''
        size={80}
       
      />
    </div>
  );
}

export default Loader;