export default class PoetryService {
  static async getPoem() {
    return fetch("https://poetrydb.org/random")
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