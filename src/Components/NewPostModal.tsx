import React from "react";
import { INewPostModal } from "../Helpers/interface";



const NewPostModal: React.FC<INewPostModal> = (props: INewPostModal) => {

  return (
    <div>
      <form id="new-post-form">
        <div>
          <div></div>
          <textarea></textarea>
          <div>
            <button type="button">Add Image</button>
            <button type="button">Add Video</button>
            <button type="submit" form="new-post-form">Create Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPostModal;