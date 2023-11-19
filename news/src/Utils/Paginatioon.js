import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';

function Paginatioon({ limit, offset, onPageChange }) {
  const [totalNews, setTotalNews] = useState();
  const [totalPages, setTotalPages] = useState();
  const buttonNumsShow = 5; 

  useEffect(() => {
    axios.get(`https://api.spaceflightnewsapi.net/v4/articles/`)
    .then((res) => setTotalNews(res.data.count));
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(totalNews / limit));
  }, [limit, totalNews]);

  const handleClickNext = () => {
    onPageChange(offset + limit);
  };

  const handleClickPrev = () => {
    const newOffset = offset > 0 ? offset - limit : 0;
    onPageChange(newOffset);
  };

  const handleClickPage = (page) => {
    const newOffset = (page - 1) * limit;
    onPageChange(newOffset);
  };

  const handleClickFirst = () => {
    onPageChange(0);
  };

  const handleClickLast = () => {
    const lastPage = (totalPages * limit) - limit;
    onPageChange(lastPage);
  };

  const generatePageButtons = () => {
    const buttons = [];
    const currentPage = Math.floor(offset / limit) + 1;

    // Krijo butonat për faqet
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        buttons.push(<Pagination.Item key={i} active>{i}</Pagination.Item>);
      } else {
        buttons.push(<Pagination.Item key={i} onClick={() => handleClickPage(i)}>{i}</Pagination.Item>);
      }
    }

    return buttons;
  };

  const generatePaginationWithEllipsis = () => {
    const pageButtons = generatePageButtons();
    const currentPage = Math.floor(offset / limit) + 1;
    const ellipsisPosition = Math.ceil(buttonNumsShow / 2);
    //console.log(ellipsisPosition)
    if (totalPages > buttonNumsShow) {

      if (currentPage <= ellipsisPosition) {
        return [
          ...pageButtons.slice(0, buttonNumsShow),//ka me i shfaq 5 butona , ... , dhe butonin e pages te fundit
          <Pagination.Ellipsis key="ellipsis" />,
          <Pagination.Item key={totalPages} onClick={() => handleClickPage(totalPages)}>{totalPages}</Pagination.Item>,
        ];
      } else if (currentPage >= totalPages - ellipsisPosition) {
        return [                //927
          <Pagination.Item key={1} onClick={() => handleClickPage(1)}>{1}</Pagination.Item>,
          <Pagination.Ellipsis key="ellipsis" />,
          ...pageButtons.slice(totalPages - buttonNumsShow),//ka me fillu mi hfaq prej 924
        ];
      } else {
        return [
          <Pagination.Item key={1} onClick={() => handleClickPage(1)}>{1}</Pagination.Item>,
          <Pagination.Ellipsis key="ellipsis" />,
          ...pageButtons.slice(currentPage - Math.floor(buttonNumsShow / 2), currentPage + Math.floor(buttonNumsShow / 2)),
          <Pagination.Ellipsis key="ellipsis" />,
          <Pagination.Item key={totalPages} onClick={() => handleClickPage(totalPages)}>{totalPages}</Pagination.Item>,
        ];
      }
      
    }
  
    return pageButtons;
  };

  return (
    <>
      <Pagination>
        <Pagination.First onClick={handleClickFirst} />
        <Pagination.Prev onClick={handleClickPrev} />
        {generatePaginationWithEllipsis()}
        <Pagination.Next onClick={handleClickNext} />
        <Pagination.Last onClick={handleClickLast} />
      </Pagination>
    </>
  );
}

export default Paginatioon;
