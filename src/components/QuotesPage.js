import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://assignment.stage.crafto.app/getQuotes?limit=5&offset=${
            page * 20
          }`,
          {
            headers: { Authorization: token },
          }
        );

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data.data)) {
          if (data.data.length === 0) {
            setLoading(false);
            return;
          }

          setQuotes((prevQuotes) => [...prevQuotes, ...data.data]);
        } else {
          setLoading(false);
          console.error("Data is not in the expected format", data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching quotes", err);
      }
    };

    fetchQuotes();
  }, [page, token]);

  const handlePage = () => {
    const currentScrollPosition = window.scrollY;
    setPage((prevPage) => prevPage + 1);

    setTimeout(() => {
        window.scrollTo(0, currentScrollPosition);
      }, 500); 
    };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Quotes</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {quotes.map((quote, index) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                key={quote.id}
              >
                <div className="relative">
                  <img
                    src={quote.mediaUrl}
                    alt="Quote"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black opacity-75 p-4">
                    <p className="text-white font-bold text-lg">{quote.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
              onClick={handlePage}
            >
              Load More
            </button>
          </div>
        </>
      )}

      <Link
        to="/CreateQuotes"
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        Create Quotes+
      </Link>
    </div>
  );
};

export default QuotesPage;
