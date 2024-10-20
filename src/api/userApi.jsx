import Config from "react-native-config";

const userApi = () => {


  const createUser = async (name, email, password) => {

    const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})
    })
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json()
        return json
      
  }


  const fetchUser = async (email, password) => {
    
    const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/fetchUser`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });
          
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const json = await response.json();
        return json;
      
  };

  const fetchPicture = async (id) => {

    const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/fetchPicture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Add this header
        },
        body: JSON.stringify({id: id})
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    return json;

  }

  return { createUser, fetchUser, fetchPicture };
};


export default userApi;
