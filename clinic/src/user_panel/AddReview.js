import React, { useState, useEffect } from "react";
import axios from "axios";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= parseInt(rating, 10)) {
      stars.push(<span key={i} className="star">&#9733;</span>); // Filled star
    } else {
      stars.push(<span key={i} className="star star-empty">&#9733;</span>); // Empty star
    }
  }
  return stars;
};

const AddReview = () => {
  const [patientName, setPatientName] = useState("");
  const [rating, setRating] = useState("");
  const [ratedTo, setRatedTo] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    axios
      .get("http://localhost:5000/api/reviews")
      .then((response) => {
        setReviews(response.data); // Assuming response.data is an array of reviews
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split("T")[0];

    const reviewData = {
      patientName,
      rating,
      ratedTo,
      writeOn: currentDate, // Set current date here
      comment,
    };

    axios
      .post("http://localhost:5000/api/reviews", reviewData)
      .then((response) => {
        console.log("Review Submitted:", response.data);
        window.alert("Review added successfully.");
        fetchReviews(); // Fetch updated reviews after submission
        setPatientName("");
        setRating("");
        setRatedTo("");
        setComment("");
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        window.alert("Failed to add review. Please try again later.");
      });
  };

  return (
    <div className="add-review-container">
      <div className="add-review-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl mb-4">Add Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Patient Name:</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Select Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Rated To:</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={ratedTo}
              onChange={(e) => setRatedTo(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="hospital">Hospital</option>
              <option value="doctor">Doctor</option>
              <option value="product">Product</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Comment:</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>

      {/* Table to display reviews */}
      <div className="review-table bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl mb-4">Reviews</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Patient Name</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Rated To</th>
              <th className="px-4 py-2">Write On</th>
              <th className="px-4 py-2">Comment</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{review.patientName}</td>
                <td className="px-4 py-2">{renderStars(review.rating)}</td>
                <td className="px-4 py-2">{review.ratedTo}</td>
                <td className="px-4 py-2">{review.writeOn}</td>
                <td className="px-4 py-2">{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddReview;
