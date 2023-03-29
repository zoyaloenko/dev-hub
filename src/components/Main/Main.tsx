import { Key, useContext, useEffect, useReducer, useRef, useState } from "react"
import { AuthContext } from "../AppContext/AppContext"
import { doc, setDoc, collection, serverTimestamp, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PostReducer, postActions, postsStates } from "../AppContext/PostReducer";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import PostCard from "./PostCard";

import { Avatar, Button } from '@material-tailwind/react';
const avatar = require('../../assets/images/1.jpeg');
const live = require('../../assets/images/live.png');
const feeling = require('../../assets/images/feeling.png');
const addImage = require('../../assets/images/addImage.png');



const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null)
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  const [progressBar, setProgressBar] = useState(0);

  const [state, dispatch] = useReducer(PostReducer, postsStates);
  const {SUBMIT_POST, HANDLE_ERROR} = postActions

  const collectionPosts = collection(db, "posts");
  const posts = doc(collection(db, "posts"));
  const document = posts.id;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }
  
  const handleSubmitPost = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(text.current && text.current.value !== "") {
      try {
        if(text.current.value !== "")
          await setDoc(posts, {
            documentId: document,
            uid: user?.uid || userData?.uid,
            logo: user?.photoURL,
            name: user?.displayName || userData?.name,
            email: user?.email || userData?.email,
            text: text.current.value,
            image: image,
            timestamp: serverTimestamp(),
          });
          text.current.value = "";
        
      } catch (error: any) {
        dispatch({
          type: HANDLE_ERROR,
        })
        console.log(error.message)
      }  
    } else {
      dispatch({
        type: HANDLE_ERROR,
      })
    }
  }

  const storage = getStorage();

  const metadata = {
    contentType: ['image/jpeg', "image/jpg", "image/png", "image/gif", "image/svg+xml"]
  };


  const submitImage = async () => {
    const fileType = file?.["type"] && metadata.contentType.includes(file["type"]);
    console.log('file', file);
    if(!file) return;
    if(fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(
          // storageRef, file, metadata.contentType
          storageRef, file, file?.["type"]
        );
        await uploadTask.on("state_changed", (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressBar(progress);
        },
        (error) => {
          alert(error)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImage(downloadURL);
        }
        );
      } catch (error: any) {
        dispatch({type: HANDLE_ERROR})
        console.log(error.message)
      }
    }
  }

  useEffect((): (() => void) | void | undefined => {
    const postData = async () => {
      const q = query(collectionPosts, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        scrollRef?.current?.scrollIntoView({behavior: "smooth"});
        setImage('');
        setFile(null);
        // setProgressBar(0);
      })
    };
    return () => postData();
  }, [SUBMIT_POST])
    

  return (
  //   <>
  //   <div>Main</div>
  //   {/* <img src={user?.photoURL} alt="userPhoto"/> */}

  //   <form onSubmit={handleSubmitPost}>
  //     <input type="text" placeholder="Whats on your mind?" ref={text}></input>
  //     {image && <img src={image} alt="previewImage"/>}
  //     <button type="submit">Share</button>
  //  </form>

  //   <input type="file" onChange={handleUpload}></input>
  //   {file && <button type="submit" onClick={submitImage}>Upload</button>}
  //   <div>{state.error 
  //   ? (<div>Smth went wrong..</div>) 
  //   : (<div>{state.posts.length > 0 && state?.posts.map((post: { logo: any; documentId: any; uid: any; name: any; email: any; image: any; text: any; timestamp: { toDate: () => string | number | Date; }; }, index: Key | null | undefined) => {
  //     return (
  //       <PostCard 
  //         key={index}
  //         logo={post.logo} 
  //         id={post.documentId}
  //         uid={post.uid}
  //         name={post.name}
  //         email={post.email}
  //         image={post.image}
  //         text={post.text}
  //         timestamp={new Date(post?.timestamp?.toDate()).toUTCString()}
  //         />)
  //   })}</div>)
  //   }</div>
  //   <div ref={scrollRef}></div>
    
  //   </>


  <div className="flex flex-col item-center">
  <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
    <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
      <Avatar
        size="sm"
        variant="circular"
        // src={avatar}
        src={user?.photoURL}
        alt="avatar"
      ></Avatar>
      <form className="w-full" onSubmit={handleSubmitPost}>
        <div className="flex justify-between items-center">
          <div className="w-full ml-4">
            <input
              name="text"
              type="text"
              placeholder="What's on your mind.."
              className="outline-none w-full bg-white rounded-md"
              ref={text}
            ></input>
          </div>
          <div className="mx-4">{image && <img src={image} alt="previewImage"/>}</div>
          <div>
            <Button className="mr-4" variant="text" type="submit">
              SHARE
            </Button>
          </div>
        </div>
      </form>
    </div>
    <span>{/* {progress bar} */}</span>
    <div className="flex justify-around items-center pt-4">
      <div className="flex items-center">
        <label
          htmlFor="addImage"
          className="cursor-pointer flex items-center"
        >
          <img className="h-10 mr-4" src={addImage} alt="" />
          <input type="file" id="addImage" style={{ display: 'none' }} onChange={handleUpload}></input>
        </label>
        {file && <button type="submit" onClick={submitImage}>Upload</button>}
      </div>
      {/* <div className="flex items-center">
        <img className="h-10 mr-4" src={live} alt="live"></img>
        <p className="font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
          Live
        </p>
      </div> */}
      {/* <div className="flex items-center">
        <img className="h-10 mr-4" src={feeling} alt="feeling"></img>
        <p className="font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
          Feeling
        </p>
      </div> */}
    </div>
  </div>
  <div className="flex flex-col py-4 w-full">{state.posts.length > 0 && state?.posts.map((post: { logo: any; documentId: any; uid: any; name: any; email: any; image: any; text: any; timestamp: { toDate: () => string | number | Date; }; }, index: Key | null | undefined) => {
      return (
        <PostCard 
          key={index}
          logo={post.logo} 
          id={post.documentId}
          uid={post.uid}
          name={post.name}
          email={post.email}
          image={post.image}
          text={post.text}
          timestamp={new Date(post?.timestamp?.toDate()).toUTCString()}
          />)
    })}</div>
     <div ref={scrollRef}></div>
  </div>

  )
}

export default Main