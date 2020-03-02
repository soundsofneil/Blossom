/* Actions for the Main React component */

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
  const universities = [
    {id: 0, name: "University of Toronto", location: "Toronto, Ontario", country: "Canada", description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", programs: [{id: 0, name: "Computer Science", average: 93}, {id: 1, name: "Commerce", average: 88}], icon: "uoft.png"},
    {id: 1, name: "Harvard University", location: "Cambridge, Massachusetts", country: "United States", description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts.", programs: [{id: 0, name: "Computer Science", average: 97}, {id: 1, name: "Commerce", average: 93}], icon: "harvard.png"},
    {id: 2, name: "McGill University", location: "Montreal, Quebec", country: "Canada", description: "McGill University is a public university in McGill, Quebec, Canada. Founded in 1821 by royal charter", programs: [{id: 0, name: "Computer Science", average: 85}, {id: 1, name: "Commerce", average: 90}], icon: "mcgill.png"}
  ];

  return universities;
}

export const getReccomendations = (universities) => {
  // determine recommended schools here
  universities[0].recommended = true;

  return universities;
}

export const getMySchoolsList = () => {
  // fetch data here
  const mySchools = [
    {id: 0, name: "University of Toronto"},
    {id: 4, name: "New York University"}
  ];

  return mySchools;
}
