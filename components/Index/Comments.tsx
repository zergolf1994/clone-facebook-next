import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PostType from "../../types/PostType";

const Comments = ({ post, user }: { post: PostType; user: any }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);

  return (
    <div className="px-4">
      <hr />
      <p className="w-full py-2 text-sm font-semibold text-right">
        All Comments
      </p>
      <form>
        <div className="flex items-center gap-2">
          <div className="flex items-center overflow-hidden rounded-full">
            <Image src={user.picture} alt="" height={35} width={35} />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full px-4 p-2 rounded-full bg-[#f0f2f5] outline-none"
              placeholder="Write a comment..."
              onChange={e => {
                setCommentText(e.target.value);
              }}
              value={commentText}
            />
          </div>
          <button
            className="p-2 text-base transition-all rounded-full hover:font-semibold hover:bg-gray-500 hover:text-white"
            onClick={e => {
              e.preventDefault();
            }}
          >
            Send
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-4 pt-4">
        {comments.map(comment => (
          <div key={comment._id}>
            <div className="flex items-start gap-2">
              <div className="flex items-center overflow-hidden rounded-full">
                <Image
                  src={comment.user.picture || "https://picsum.photos/700"}
                  alt=""
                  height={35}
                  width={35}
                />
              </div>
              <div>
                <div className="w-max px-4 p-2 rounded-[18px] bg-[#f0f2f5]  ">
                  <Link
                    href={comment.user.nickname || "/users/" + comment.user._id}
                  >
                    <a className="font-bold transition-all hover:underline">
                      {comment.user.firstName + " " + comment.user.lastName}
                    </a>
                  </Link>
                  <p>{comment.text}</p>
                </div>{" "}
                <div className="flex items-center gap-4 pt-2 pl-4 text-xs font-bold">
                  <button className="hover:underline">Like</button>
                  <button className="hover:underline">Reply</button>
                  <p>1d</p>
                </div>
              </div>
            </div>
          </div>
        ))}{" "}
        <p className="pt-2 text-sm font-bold cursor-pointer hover:underline">
          Write a Comment
        </p>
      </div>
    </div>
  );
};

export default Comments;
