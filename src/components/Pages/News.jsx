import LeftSide from '../LeftSideBar/LeftSide'
import NavBar from '../NavBar/NavBar'
import RightSide from '../RightSideBar/RightSide'

import { useState, useEffect } from 'react';
import axios from 'axios';


const News = () => {

    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const subreddit = 'learnprogramming';
    const timeFilter = 'week';
    const endpoint = `https://www.reddit.com/r/${subreddit}/top.json?t=${timeFilter}&limit=9`;

    axios.get(endpoint).then((response) => {
      setPosts(response.data.data.children.map((post) => post.data));
    });
  }, []);




  return (
    <div className='w-full'>
    <div className="fixed top-0 z-10 w-full bg-white">
      <NavBar />
      </div>
      <div className='flex bg-gray-100'>
        <div className="flex-auto w-[20%] fixed top-12">
          <LeftSide />
        </div>
        <div className='flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl'>
          <div className="w-[80%] mx-auto">
          <div>NEWS from REDDIT</div>
          <div>
      <h2>Top Posts of the Week on /r/learnprogramming</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => (
                <li key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <a href={`https://www.reddit.com${post.permalink}`} className="block px-4 py-2 text-lg font-semibold text-gray-900 hover:text-gray-700">
                        {post.title}
                    </a>
                </li>
                    ))}
        </ul>
            </div>
          </div>
        </div>
        
        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSide />
        </div>
      </div>
  </div>

  )
}

export default News