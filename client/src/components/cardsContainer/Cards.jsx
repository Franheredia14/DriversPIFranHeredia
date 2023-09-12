import { useEffect, useState } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers } from "../../redux/actions";
import "./cards.css";

function Cards() {
  const allDrivers = useSelector((state) => state.allDrivers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDrivers());
  }, []);

  const driversPerPage = 9;
  const totalPages = Math.ceil(allDrivers.length / driversPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const maxPagesToShow = 5; // Cantidad máxima de números de página a mostrar

  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const driversToDisplay = allDrivers.slice(
    (currentPage - 1) * driversPerPage,
    currentPage * driversPerPage
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };
  console.log(driversToDisplay);

  return (
    <div className="cards-container">
      <div className="cards-wrapper">
        {driversToDisplay?.map(({ id, name, surname, teams, image }, index) => {
          return (
            <Card 
                key={index}
                id={id}
                name={name}
                surname={surname}
                teams={teams}
                image={image.url} />
          );
        })}
      </div>
      <div className="pagination">
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className="pagination-button start"
        >
          Start
        </button>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button prev"
        >
          Prev
        </button>
        {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`pagination-button ${
                page === currentPage ? "active" : ""
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button next"
        >
          Next
        </button>
        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className="pagination-button end"
        >
          End
        </button>
      </div>
    </div>
  );
}

export default Cards;