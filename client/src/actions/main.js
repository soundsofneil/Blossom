/* Actions for the Main React component */
const axios = require('axios');

// function to get necessary university data for main page
export const getRankedUniversities = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5000/api/uni/').then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    }).then((data) => {
      if (data && data.universities) {
        const rankedUniversities = data.universities.sort((uni1, uni2) => uni1.ranking - uni2.ranking)
        resolve(rankedUniversities);
      } else {
        reject()
      }
    }).catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}

// function to compute user reccomendations
export const getRecomendedUniversities = (user, universities) => {
  const indeces = universities.map((uni, i) => i)

  if (indeces.length > 0 && universities.length > 0) {
    universities[indeces[0]].recommended = true;
  }

  return indeces;
}

// function to search through universities by name
export const search = (query, universities) => {
      return new Promise((res, rej) => {
          const indeces = universities.reduce( (inds, uni, i) => {
              if (uni.name.toLowerCase().trim().indexOf(query.toLowerCase().trim()) > -1) {
                  inds.push(i)
              }

              return inds;
          }, [])

          res(indeces)
      })
  }
