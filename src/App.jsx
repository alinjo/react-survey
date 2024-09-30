import { useState } from 'react';
import "./App.css";
import Header from "./components/Header";

export default function App() {
  
  
  const [submittedAnswers, setSubmittedAnswers] = useState([]);

  
  const [formData, setFormData] = useState({

    colorRating: '',
    spendTime: [],
    review: '',
    username: '',
    email: '',

  });


  const handleChange = (event) => {

    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {

      setFormData((prevData) => ({
        
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),

      }));

    } 

    else {

      setFormData((prevData) => ({

        ...prevData,
        [name]: value,

      }));

    }
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log(formData);
    setSubmittedAnswers((prev) => [...prev, formData]);
    
    setFormData({

      colorRating: '',
      spendTime: [],
      review: '',
      username: '',
      email: '',

    });

  };

  return (
    <>
      <Header />
      <form className="form" onSubmit={handleSubmit}>
        <h2>Tell us what you think about your rubber duck!</h2>
        
        <div className="form__group radio">
          <h3>How do you rate your rubber duck colour?</h3>
          <ul>
            {[1, 2, 3, 4].map((rating) => (
              <li key={rating}>
                <input
                  id={`color-${rating}`}
                  type="radio"
                  name="colorRating"
                  value={rating}
                  checked={formData.colorRating === String(rating)}
                  onChange={handleChange}
                />
                <label htmlFor={`color-${rating}`}>{rating}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="form__group">
          <h3>How do you like to spend time with your rubber duck?</h3>
          <ul>
            {['swimming', 'bathing', 'chatting', 'noTime'].map((activity) => (
              <li key={activity}>
                <label>
                  <input
                    name="spendTime"
                    type="checkbox"
                    value={activity}
                    checked={formData.spendTime.includes(activity)}
                    onChange={handleChange}
                  />
                  {activity.charAt(0).toUpperCase() + activity.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <label>
          What else have you got to say about your rubber duck?
          <textarea
            name="review"
            cols="30"
            rows="10"
            value={formData.review}
            onChange={handleChange}
          ></textarea>
        </label>

        <label>
          Put your name here (if you feel like it):
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>

        <label>
          Leave us your email pretty please??
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <input className="form__submit" type="submit" value="Submit Survey!" />
      </form>

      <div className="survey__list">
        {submittedAnswers.map((answer, index) => (
          <div className="answer" key={index}>
            <p>Rating: {answer.colorRating}</p>
            <p>Activities: {answer.spendTime.join(', ')}</p>
            <p>Review: {answer.review}</p>
            <p>Username: {answer.username}</p>
            <p>Email: {answer.email}</p>
          </div>

        ))}
      </div>
    </>
  );
}
