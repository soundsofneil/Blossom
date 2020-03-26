/* Actions for the Main React component */
import { faLaptopCode, faChartLine } from '@fortawesome/free-solid-svg-icons'

export const addToList = (main, uni) => {
  const mySchools = main.state.mySchools;

  if (mySchools.find(u => u.id === uni.id)) {
    return;
  }

  console.log("Adding " + uni.name + " to the list!");

  mySchools.push(uni);

  main.setState(
    {mySchools}
  )
}

export const removeFromList = (main, uni) => {
  const mySchools = main.state.mySchools.filter(u => u.id !== uni.id);

  console.log("Removing " + uni.name + " from the list!");

  main.setState(
    {mySchools}
  )
}

export const fetchUniversities = () => {
  /*
  // fetch hard-coded data from json (placeholder)
  let universities = require('../data.json')['universities'];
  for (let i = 0; i < universities.length; i++) {
    const programs = universities[i]['programs']
    for (let j = 0; j < programs.length; j++) {
      if (universities[i]['programs'][j].icon === 'faLaptopCode') {
        universities[i]['programs'][j].icon = faLaptopCode
      } else if (universities[i]['programs'][j].icon === 'faChartLine') {
        universities[i]['programs'][j].icon = faChartLine
      }
    }
  }
  */

  const url = 'http://localhost:5000/api/uni/';

  return fetch(url)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Could not get unversities')
    }
  })
  .then((json) => {
    console.log(json.universities)
    return json.universities;
  })
}

export const getReccomendations = (universities) => {
  // determine recommended schools here
  if (universities.length > 0) {
    universities[0].recommended = true;
  }

  return universities;
}
