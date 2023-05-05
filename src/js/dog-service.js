export default class DogService {
  static async getDog() {
    return fetch(`https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`)
      .then(response => {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .catch(error => {
        return error;
      });
  }
}