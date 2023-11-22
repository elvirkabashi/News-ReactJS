import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';
import NewCard from '../../components/NewCard';


function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isloggedin')
    const [bookmarks] = useLocalStorage('bookmarks')
    const navigate = useNavigate()
  
    useEffect(() => {
      if(isLoggedIn == null) {
        navigate("/");
      }
    }, [])
  return (
    <>
        <div className='container'>
            {bookmarks ? (
                <div className='d-flex my-5 gap-3 flex-wrap'>
                   { bookmarks.map(b => (
                        <NewCard 
                        key={b.id} 
                        id={b.id}
                        src={b.image_url} 
                        title={b.title}
                        news_site={b.news_site}
                        published={b.published_at}/>
                    ))}
                </div>
            )
            :
            (<div>You have no bookmarks</div>)}
        </div>
    </>
  )
}

export default Dashboard