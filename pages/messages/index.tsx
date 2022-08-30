import Header from "../../components/Header";
import getUser from "../../lib/Auth/getUser";
import type { NextApiResponse, NextApiRequest } from "next";
import Chats from "../../components/Messages/Chats";
import { L49 } from "react-isloading";
import Router from "next/router";

const Messages = ({ user }: { user: any }) => {
  const conversations = user.conversations.map((c: any) => JSON.parse(c));

  if (conversations[0]) Router.push("/messages/" + conversations[0]._id);

  return (
    <Header user={user}>
      <div className="relative flex w-screen text-black h-[93.45vh] bg-white ">
        <Chats />
        <div className="flex w-full h-full ">
          <main className="flex flex-col items-center justify-center w-full h-full font-semibold">
            {true ? (
              <L49
                style={{
                  height: "7rem",
                  width: "7rem",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ) : (
              "No Messages Found."
            )}
          </main>
        </div>
      </div>
    </Header>
  );
};

export default Messages;

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const user = await getUser(req, res);

  return {
    props: {
      user: user.user,
    },
  };
};
