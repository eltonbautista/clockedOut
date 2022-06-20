
export const postObject = (
  postText: string,
  postImage: HTMLImageElement | string,
  postVideo: HTMLVideoElement | string) => {

  return {
    postText,
    postImage,
    postVideo
  };

};

// export const initialPost = postObject('', '', '');


interface IUserDisplayedInfo {
  gameOne?: string;
  gameTwo?: string;
  socialOne?: string;
  socialTwo?: string;
  socialThree?: string;
  socialFour?: string;
};

export const userObject = (
  userName: string,
  userDescription: string,
  userProfilePicture: string | HTMLImageElement,
  userDisplayedInfo: IUserDisplayedInfo) => {

  return {
    userName,
    userDescription,
    userProfilePicture,
    userDisplayedInfo
  };
};

