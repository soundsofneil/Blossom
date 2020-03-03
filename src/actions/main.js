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
  const universities = [
    {
      id: 0, 
      name: "University of Toronto", 
      website: "https://www.utoronto.ca/",
      twitter: "https://twitter.com/UofT",
      applyUri: "https://future.utoronto.ca/apply/applying/",
      location: "Toronto, Ontario", 
      locationUri: "https://www.google.com/maps/place/Toronto,+ON",
      country: "Canada", 
      description: "The University of Toronto is a globally top-ranked public research university in Toronto, Ontario, Canada.", 
      programs: [
        {
          id: 0, 
          name: "Computer Science", 
          average: 93,
          link: "https://fas.calendar.utoronto.ca/section/Computer-Science",
          icon: faLaptopCode
        }, {
          id: 1, 
          name: "Commerce", 
          average: 88,
          link: "https://rotmancommerce.utoronto.ca/",
          icon: faChartLine
        }], 
      icon: "uoft.png"},
    {
      id: 1, 
      name: "Harvard University", 
      website: "https://www.harvard.edu/",
      twitter: "https://twitter.com/Harvard",
      applyUri: "https://www.harvard.edu/admissions-aid",
      location: "Cambridge, Massachusetts",
      locationUri: "https://www.google.com/maps/place/Cambridge,+MA,+USA", 
      country: "United States", 
      description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts.", 
      programs: [
        {
          id: 0, 
          name: "Computer Science", 
          average: 97,
          link: "https://www.seas.harvard.edu/computer-science",
          icon: faLaptopCode
        }, {
          id: 1, 
          name: "Commerce", 
          average: 93,
          link: "https://www.hbs.edu/",
          icon: faChartLine
        }], 
      icon: "harvard.png"},
    {
      id: 2, 
      name: "McGill University", 
      website: "https://www.mcgill.ca/",
      twitter: "https://twitter.com/mcgillu",
      applyUri: "https://mcgill.ca/admissions/",
      location: "Montreal, Quebec", 
      locationUri: "https://www.google.com/maps/place/Montreal,+QC",
      country: "Canada", 
      description: "McGill University is a public university in McGill, Quebec, Canada. Founded in 1821 by royal charter", 
      programs: [
        {
          id: 0, 
          name: "Computer Science", 
          average: 85,
          link: "https://www.cs.mcgill.ca/",
          icon: faLaptopCode
        }, {
          id: 1, 
          name: "Commerce", 
          average: 90,
          link: "https://www.mcgill.ca/desautels/programs/bcom",
          icon: faChartLine
        }], 
      icon: "mcgill.png"}
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
