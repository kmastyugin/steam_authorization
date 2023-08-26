import path from "path";
import fs from "fs";
import imageDownloader from "image-downloader";
import {ISteamUser} from "@/interfaces/User/ISteamUser";

class ImageService {
  downloadImage(url: string, filepath: string) {
    return imageDownloader.image({
      url,
      dest: filepath
    });
  }
  async getLocalImages(user: ISteamUser) {
    const {steamid, avatar} = user;

    const links: string[] = [];

    await Promise.all([
      this.downloadImage(avatar.small, path.resolve(__dirname, "..", "static", "images",)).then(({ filename }: any) => links.push(filename)),
      this.downloadImage(avatar.medium, path.resolve(__dirname, "..", "static", "images",)).then(({ filename }: any) => links.push(filename)),
      this.downloadImage(avatar.large, path.resolve(__dirname, "..", "static", "images",)).then(({ filename }: any) => links.push(filename)),
    ]);

    const avatarList = {
      large: '',
      medium: '',
      small: '',
    };


    links.map(async (link) => {
      if(link.includes('_full')) {
        const filePath = path.resolve(__dirname, '..', 'static', 'images', `${steamid}_large.jpg`);
        fs.renameSync(link, filePath);
        avatarList.large = filePath;
      } else if(link.includes('_medium')) {
        const filePath = path.resolve(__dirname, '..', 'static', 'images', `${steamid}_medium.jpg`);
        fs.renameSync(link, filePath);
        avatarList.medium = filePath;
      } else {
        const filePath = path.resolve(__dirname, '..', 'static', 'images', `${steamid}_small.jpg`);
        fs.renameSync(link, filePath);
        avatarList.small = filePath;
      }
    })

    return avatarList;
  }
}

export default new ImageService();