export default class EmojiService {
  static async getEmoji() {
    return fetch("https://emojihub.yurace.pro/api/random")
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