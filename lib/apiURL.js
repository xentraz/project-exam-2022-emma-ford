export const apiURL = 'http://localhost:1337/places';
export const enquiresUrl = 'http://localhost:1337/enquires';

export const getUser = function (userKey) {
  return JSON.parse(localStorage.getItem(userKey));
};

// export const headers = {
//   headers: {
//     'content-type': 'application/json',
//     Authorization: `Bearer ${localStorage.getItem('jwt')}`
//   }
// };