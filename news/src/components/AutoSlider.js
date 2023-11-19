import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import CarouselImage from './CarouselImage';
import LoadingSpinner from '../Utils/LoadingSpinner';


function AutoSlider() {

    const [news,setNews] = useState()
    const [loading, setLoading] = useState()

    

    useEffect(() => {
        setLoading(true)
        axios.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=4')
        .then(res => {
            setNews(res.data.results)
            setLoading(false)
        })
        .catch(error => {
            console.error("Error fetching slider data:", error);
            setLoading(false); 
        })

        setLoading(false)
    },[])

    
    if(loading){
        return(
            <LoadingSpinner/>
        )
    }
    
  return (
    <>
        <Carousel slide={false} controls={false} indicators={false}>

            {
                news && news.map(nw => (
                    <Carousel.Item key={nw.id}>
                        <a href={`/news/id/${nw.id}`} style={{color:'black'}}>
                            <div>
                                <CarouselImage src={nw.image_url} width={600} height={400}/>
                                <h3>{nw.title}</h3>
                            </div>
                            <p style={{maxWidth:"600px"}}>{nw.summary}</p>
                        </a>
                    </Carousel.Item>
                ))
            }
           
        
            </Carousel>
    </>
  )
}

export default AutoSlider