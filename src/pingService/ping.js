import axios from "axios";

const ping = async () => {
  try {
    if(!localStorage.getItem("key")){
        const { data } = await axios.get("https://blue-envy-api.herokuapp.com/sitePings");
        localStorage.setItem("key", data.key)
        return
    }
    await axios.get("https://blue-envy-api.herokuapp.com/sitePings", {params: {key: localStorage.getItem("key")}}); 
  } catch(err) {

  }
};

export default ping;
