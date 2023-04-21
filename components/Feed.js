import { SparklesIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import Input from "./Input";
import Post from "./Post";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        snapShot => {
          setPosts(snapShot.docs);
        },
      ),
    [db],
  );

  return (
    <div className="flex-grow max-w-2xl text-white border-l border-r border-gray-700 sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700 ">
        <h2 className="text-lg font-bold sm:text-xl ">Home</h2>
        <div className="flex items-center justify-center ml-auto hoverAnimation w-9 h-9 xl:px-0">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />

      <div className="pb-72">
        {posts.map(post => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
