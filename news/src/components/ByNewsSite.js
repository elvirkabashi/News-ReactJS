import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingSpinner from '../Utils/LoadingSpinner';
import NewCard from './NewCard';

function ByNewsSite() {

    const newsSite = window.location.href.split('bynewssite/')[1]
    const [news,setNews] = useState()
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=500`)
          .then(res => {
            const filtred = res.data.results.filter(article => article.news_site === newsSite)
            setNews(filtred);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }, [newsSite]);


    return (
        
        <div className='container'>
            {loading ? (
            <div style={{marginLeft: '50%'}}>
            <LoadingSpinner/>
            </div>
            )
            :
            (
            <>
            <div className='d-flex gap-1 flex-wrap'>
              {news && news.map(newss => (
                <div key={newss.id}>
                  <NewCard id={newss.id} src={newss.image_url} title={newss.title} summary={newss.summary} news_site={newss.news_site} published={newss.published_at} url={newss.url}/>
                </div>
              ))}
            </div>
            </>
            )}
          
        </div>
      );
}

export default ByNewsSite