/* Actions for the Main React component */
const axios = require('axios');

export const addToList = (app, uni) => {
  const user = app.state.user;

  if (user.schools.find(school => school.name === uni.name)) {
    console.log("Already in list!");
    return;
  }

  console.log("Adding " + uni.name + " to the list!");

  const schools = user.schools
  schools.push({name: uni.name});

  // request to update user
  axios.put('http://localhost:5000/api/user/' + user.username, {schools: schools}).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  }).then(data => {
    if (data) {
      app.setState({user: data})
    }
    else {
      console.log('Could not update user profile!')
    }
  }).catch((error) => {
    alert('Error: Could not update user profile!')
    console.log(error)
    console.log(schools)
  })
}

export const removeFromList = (app, uni) => {
  const user = app.state.user;

  console.log("Removing " + uni.name + " from the list!");

  const schools = user.schools.filter(school => school.name !== uni.name);

  // request to update user
  axios.put('http://localhost:5000/api/user/' + user.username, {schools: schools}).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  }).then(data => {
    if (data) {
      app.setState({user: data})
    }
    else {
      console.log('Could not update user profile!')
    }
  }).catch((error) => {
      alert('Could not update user profile!')
      console.log(error)
      console.log(schools)
  })
}

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
