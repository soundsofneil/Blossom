/* Actions for the Main React component */
const axios = require('axios');

// function to get necessary university data for main page
export const getUniversityData = (main) => {
  axios.get('http://localhost:5000/api/uni/').then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  }).then((data) => {
    if (data && data.universities) {
      // get all necessary data
      main.setState({universities: data.universities});
      const searchInds = data.universities.map((uni, i) => i);
      main.setState({searchInds})
    } else {
      alert('Could not get unversity data from server!')
    }
  }).catch((error) => {
    console.log(error)
  })
}

// function to compute user reccomendations
export const getReccomendations = (main) => {
  const universities = main.state.universities;
  if (universities.length > 0) {
    universities[0].recommended = true;
  }
  main.setState({universities: universities});
}
