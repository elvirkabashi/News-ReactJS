import React from 'react'
import NewCard from './NewCard'


function CategorySection({src,title,summary,news_site}) {
  return (
    <>
        <NewCard src={src} title={title} summary={summary} news_site={news_site} />
    </>
  )
}

export default CategorySection