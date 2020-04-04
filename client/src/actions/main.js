/* Actions for the Main React component */
const axios = require('axios');

// function to get necessary university data for main page
export const getRankedUniversities = () => {
  return new Promise((resolve, reject) => {
    axios.get('/api/uni/').then((res) => {
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
  const indeces = []
  const userGrade = user.grades.reduce((sum, grade) => sum + grade.grade, 0) / user.grades.length

  universities.some((uni, i) => {
    if (user.regions.find(reg => reg.region === uni.region) &&
        user.programs.some(prog1 => {
          return uni.programs.find(prog2 => prog2.program === prog1.program && userGrade >= prog2.gradeRequirement)
        })) {
          indeces.push(i)
    }
    return indeces.length == 20
  });

  return indeces;
}

// function to sort university programs by user preferences
export const sortPrograms = (user, universities) => {
  universities.forEach((uni, i) => {
    uni.programs.forEach(prog => {
        prog.score = (user.programs.find(p => p.program === prog.program) ? 100 : 0) + prog.gradeRequirement;
    })
    uni.programs = uni.programs.sort((prog1, prog2) => {
        return prog2.score - prog1.score
    })
  });
  return universities
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
