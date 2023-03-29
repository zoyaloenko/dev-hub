import { useContext } from "react"
import { AuthContext } from "../AppContext/AppContext";

import { Tooltip } from '@material-tailwind/react';
import { Avatar } from '@material-tailwind/react';

const nature = require('../../assets/images/nature.jpeg');
const avatar = require('../../assets/images/1.jpeg');
const job = require('../../assets/images/job.jpeg');
const location = require('../../assets/images/location.jpeg');
const facebook = require('../../assets/images/facebook.png');
const twitter = require('../../assets/images/twitter.png');


const LeftSide = () => {
  

  const { user, userData } = useContext(AuthContext)
  return (
    // <>
    // <div>LeftSide</div>
    // <p>{user?.email || userData?.email}</p>
    // </>
    
    <div className="flex flex-col h-screen gh-white pb-4 border-2 rounded-r-xl shadow-lg">
    <div className="flex flex-col items-center relative">
      <img
        className="h-28 w-full rounded-r-xl"
        src={nature}
        alt="nature"
      ></img>
      <div className="absolute -bottom-4">
        <Tooltip content="Profile" placement="top">
          <Avatar src={user?.photoURL || avatar} alt="avatar"></Avatar>
        </Tooltip>
      </div>
    </div>
    <div className="flex flex-col items-center pt-6">
      <p className="font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
        {/* {user?.email || userData?.email} */}
        {user?.displayName || userData?.name}
      </p>
      {/* <p className="font-medium text-xs text-gray-700 no-underline tracking-normal leading-none">
        Access exclusive tools & insights
      </p>
      <p className="font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
        Try premium for free
      </p> */}
    </div>
    
    <div className="flex flex-col pl-2">

      {/* <div className="flex items-center pb-4">
        <img className="h-10" src={location} alt="location"></img>
        <p className="font-bold text-lg no-underline tracking-normal leading-none">
          Location
        </p>
      </div> */}

      {/* <div className="flex items-center pb-4">
        <img className="h-10" src={job} alt="job"></img>
        <p className="font-bold text-lg no-underline tracking-normal leading-none">
          React Developer
        </p>
      </div> */}

      <div className="flex justify-center items-center pt-4">
        {/* <p className=" font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
          Events
        </p> */}
        <p className=" font-bold text-md text-black no-underline tracking-normal leading-none mx-2">
          Mobs
        </p>
        {/* <p className=" font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none">
          Follow
        </p>
        <p className=" font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2">
          More
        </p> */}
      </div>
    </div>
    
    <div className="ml-2">
      {/* <p className="font-bold text-lg no-underline tracking-normal leading-none py-2">
      Social Profiles
      </p> */}
      {/* <div className="flex items-center">
        <img className="h-10 mb-3 mr-2" src={facebook} alt="facebook"></img>
        <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
          Social Network
        </p>
      </div> */}
      {/* <div className="flex items-center">
        <img className="h-10 mb-3 mr-2" src={twitter} alt="twitteer"></img>
        <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2">
          Social Network
        </p>
      </div> */}
    </div>
  </div>

  )
}

export default LeftSide