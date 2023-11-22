import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../Utils/LoadingSpinner'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


function NewsDetails() {

    const {id} = useParams()
    const [news,setNews] = useState()
    const [loading, setLoading] = useState()
    const [isHovered, setIsHovered] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isloggedin')
    const [bookmark,setBookmark] = useLocalStorage('bookmarks',[])
    const [isBookmark,setIsBookmark] = useState()

    const [success,setSuccess] = useState(false)
    const [unBookmark,setUnBookmark] = useState(false)


    const navigate = useNavigate()

    
    useEffect(() => {

        if(isLoggedIn == null) {
            navigate("/login");
            return;
        }

        setLoading(true);
        axios.get(`https://api.spaceflightnewsapi.net/v4/articles/${id}/`)
            .then(res => {
                setNews(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    
        const hasBookmark = bookmark.some(b => (b.userId === isLoggedIn.id) && (b.id === news?.id))
    
        if (hasBookmark) {
            setIsBookmark(true);
        } else {
            setIsBookmark(false);
        }
    }, [id, isLoggedIn?.id, news?.id]);
      

      const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

      const filterCondition = (item) => {
        return item.id !== news.id;
      };

      const handleClick = () => {
        const hasBookmark = bookmark.filter(b => b.userId === isLoggedIn.id);
        const sameBookmark = hasBookmark.some(b => (b.userId === isLoggedIn.id) && (b.id === news.id));
    
        if (sameBookmark) {
            const filteredItems = bookmark.filter(filterCondition);
            setBookmark([...filteredItems]);
            setIsBookmark(false); 

            setUnBookmark(true)
            setTimeout(() => {
                setUnBookmark(false);
            }, 3000);
        } else {
            setBookmark([...bookmark, { ...news, userId: isLoggedIn.id }]);
            setIsBookmark(true); 

            setSuccess(true)
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        }
    }

  return (
     <>
     {loading ? (
    <div style={{marginLeft: '50%'}}>
        <LoadingSpinner/>
      </div>
     )
    :
    (
        <>{news &&
            <div className='container'>
                
                <div>
                    <h1 className="text-center p-5">{news.title}</h1>
                </div>
                
                <div className='d-flex'>
                    <div className='text-center' style={{width:'80%'}}>
                        <img style={{width: '70%'}} src={news.image_url} alt={news.title}></img>
                    </div>
                    <div className='px-3'>
                    {isBookmark ? (
                                        <div>
                                            <i className="bi bi-bookmark-fill" onMouseLeave={handleMouseLeave} onClick={handleClick} style={{ color: '#CCCC00', fontSize: '25px' }} />
                                        </div>
                                    ) : (
                                        <div>
                                            {isHovered ? (
                                                <i className="bi bi-bookmark-fill" onMouseLeave={handleMouseLeave} onClick={handleClick} style={{ color: '#CCCC00', fontSize: '25px' }} />
                                            ) : (
                                                <i className="bi bi-bookmark" onMouseEnter={handleMouseEnter} style={{ color: 'black', fontSize: '25px' }} />
                                            )}
                                        </div>
                                    )}
                    </div>
                    <div>
                   
                        {success && (
                            <Alert variant="success">
                                <small>Bookmarked successfull!</small>
                            </Alert>
                        )}

                        {unBookmark && (
                            <Alert variant="warning">
                                <small>UnMarked successfull!</small>
                            </Alert>
                        )}
                       
                        <p className='text-end'><b>Publish: <i className="bi bi-calendar2-date"></i></b>{ ` ${news.published_at.split('T')[0]}`} <br/> 
                        <i className="bi bi-clock"></i>{` ${news.published_at.split('T')[1].slice(0, 5)}` }</p>
                        <p className='text-end'><b>Updated: <i className="bi bi-calendar2-date"></i></b> {`${news.updated_at.split('T')[0]} `} <br/> 
                        <i className="bi bi-clock"></i>{` ${news.updated_at.split('T')[1].slice(0, 5)}`}</p>
                    </div>
                </div>
    
                <div style={{padding: '100px'}} className='paragraf-container'>
                    <p className='summary-text' style={{lineHeight:'1.8'}} id='textiveqant'>{news.summary}
                    NGSO satellite systems provide a variety of applications that the modern digital economy demands. These systems can serve communities by providing connectivity for both individual users and for enterprise users such as schools, hospitals, or businesses. In cooperation with existing mobile operators, NGSOs can provide backhaul services between distant communities and core fiber networks. NGSO satellites can provide flexible, secure broadband to connect remote assets across land, sea and air for transportation and agricultural purposes. They can also supplement existing infrastructure with redundant connectivity, which becomes essential when terrestrial networks fail — be it due to natural disasters, cyber-attacks or human error.
                    <br/><br/>
                    An eventful morning at Starbase Texas this morning the SpaceX Starship team celebrated the launch of the second integrated flight test of Starship, marking a substantial leap forward in the development of returning humans to deep space. At 7:02 am CT, Starship 25, accompanied by Booster 9, lifted off from the launch pad, showcasing the power of all 33 Raptor engines on the booster—a historic moment as it marked the first time all engines ignited and successfully powered to stage separation.
                    <br/><br/>
                    For just over the next 5 minutes, all 6 Raptor engines on Ship 25 were firing nominally until SpaceX seemingly lost signal with the vehicle, possibly being the reason the automated flight termination system activated. This has yet to be confirmed by SpaceX. Based on the stream, engine shutdown appears to occur t+ 8 minutes and 4 seconds, followed by flight termination at t+ 8 minutes and 7 seconds.
                    </p>
                    
                    <a href={news.url} target='_blank' rel="noreferrer"><button className='btn btn-outline-secondary'>Read more {news.news_site} web</button></a>
                </div>
                    
            </div>}
        </>
    )}
    </>
  )
}

export default NewsDetails