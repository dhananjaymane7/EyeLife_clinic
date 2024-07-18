import React, { useState, useEffect } from 'react';
import './Review.css';

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch reviews from API when component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then(response => response.json())
      .then(data => setReviewsData(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedReviews = reviewsData.filter(review => review.id !== id);
    setReviewsData(updatedReviews);
  };

  const getStars = (rating) => {
    return (
      <div className="stars">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const filteredReviews = reviewsData.filter(review =>
    review.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <input
        type="text"
        placeholder="Search reviews..."
        className="search-input w-full py-2 px-4 mb-4 rounded-lg border"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b border-gray-200 py-2">ID</th>
              <th className="border-b border-gray-200 py-2">Patient Name</th>
              <th className="border-b border-gray-200 py-2">Rating</th>
              <th className="border-b border-gray-200 py-2">Rated To</th>
              <th className="border-b border-gray-200 py-2">Write On</th>
              <th className="border-b border-gray-200 py-2">Comment</th>
              <th className="border-b border-gray-200 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review, index) => (
              <tr key={index} className="text-sm">
                <td className="border-b border-gray-200 py-2 px-4">{index + 1}</td>
                <td className="border-b border-gray-200 py-2 px-4">{review.patientName}</td>
                <td className="border-b border-gray-200 py-2 px-4">{getStars(review.rating)}</td>
                <td className="border-b border-gray-200 py-2 px-4">{review.ratedTo}</td>
                <td className="border-b border-gray-200 py-2 px-4">{review.writeOn}</td>
                <td className="border-b border-gray-200 py-2 px-4">{review.comment}</td>
                <td className="border-b border-gray-200 py-2 px-4">
                  <button onClick={() => handleDelete(review.id)} className="delete-btn bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
