import React, { useEffect, useState } from 'react'
import LastesNews from './component/LastesNews'
import CategorySection from '../../components/CategorySection'
import axios from 'axios'

function Home() {

  const [news,setNews] = useState()
  const [limit,setLimit] = useState(12)
  //const [newsSite,setNewsSite] = useState()

  useEffect(() => {
    axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}`)
    .then(res => setNews(res.data.results))
  },[limit])

  // useEffect(() => {
  //   axios.get('https://api.spaceflightnewsapi.net/v4/info/')
  //     .then(re => setNewsSite(re.data.news_sites))
  //     .catch(error => console.error("Error fetching news sites:", error));
  // }, []);

  const handleReadMore = () => {
    setLimit(lastLimit => lastLimit + 8)
  }
  

  return (
    <>
        <LastesNews/>

      <div className='container d-flex gap-3 flex-wrap'>
      {
                news &&
                news.map(ns => (
                    <div key={ns.id}>
                      <CategorySection
                        id={ns.id}
                        src={ns.image_url}
                        title={ns.title}
                        summary={ns.summary}
                        key={ns.id}
                      />
                    </div>
                  ))
            }
            
      </div>
      <div className='container d-flex justify-content-center my-5' onClick={handleReadMore}>
        <button className='btn btn-outline-secondary'>Read More</button>
      </div>


    </>
  )
}

export default Home