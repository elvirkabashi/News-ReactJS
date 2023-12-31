import React from 'react'
import NewCard from '../../../components/NewCard'


function CategorySection({id,src,title,summary,news_site}) {
  return (
    <>
        <NewCard id={id} src={src} title={title} summary={summary} news_site={news_site} />
    </>
  )
}

export default CategorySection