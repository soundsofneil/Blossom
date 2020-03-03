/* Actions for the Main React component */
import { faLaptopCode, faChartLine } from '@fortawesome/free-solid-svg-icons'

export const addToList = (main, uni) => {
  const mySchools = main.state.mySchools;

  if (mySchools.find(u => u.id === uni.id)) {
    return;
  }

  console.log("Adding " + uni.name + " to the list!");

  const newItem = {
    id: uni.id,
    name: uni.name
  }

  mySchools.push(newItem);

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
  // fetch data here
  const universities = require('../data.json')['universities'];
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

  return universities;
}

export const getReccomendations = (universities) => {
  // determine recommended schools here
  universities[0].recommended = true;

  return universities;
}