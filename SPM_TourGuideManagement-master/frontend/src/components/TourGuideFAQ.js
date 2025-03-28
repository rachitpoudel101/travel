import React, { useState } from 'react';

const TourGuideFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services do tour guides provide?",
      answer: "Tour guides provide various services including guided tours, local knowledge sharing, historical information, cultural insights, navigation assistance, and translation services when needed."
    },
    {
      question: "How much does it cost to hire a tour guide?",
      answer: "Tour guide costs vary depending on experience, duration, and location. Typically prices range from Rs. 2000-5000 per day. Contact individual guides for specific rates."
    },
    {
      question: "How do I book a tour guide?",
      answer: "You can book a tour guide through our platform by selecting your preferred guide, checking their availability, and clicking the 'Book' button. You'll need to provide your travel dates and requirements."
    },
    {
      question: "Can I customize my tour with a guide?",
      answer: "Yes! Most of our guides offer customizable tour packages. You can discuss your specific interests and preferences with the guide to create a personalized itinerary."
    },
    {
      question: "What qualifications do your tour guides have?",
      answer: "All our tour guides are licensed professionals with extensive knowledge of local history, culture, and attractions. Many have years of experience and speak multiple languages."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container" style={styles.container}>
      <h1 style={styles.header}>Frequently Asked Questions</h1>
      <div className="faq-list" style={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item" style={styles.faqItem}>
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(index)}
              style={styles.questionButton}
            >
              {faq.question}
              <span style={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer" style={styles.answer}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <a href="/view" className="btn btn-primary" style={styles.backButton}>
          Back to Tour Guides
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '2.5em'
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  faqItem: {
    borderBottom: '1px solid #eee'
  },
  questionButton: {
    width: '100%',
    padding: '15px',
    textAlign: 'left',
    backgroundColor: '#f8f9fa',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1em',
    color: '#2c3e50',
    transition: 'background-color 0.3s'
  },
  answer: {
    padding: '15px',
    backgroundColor: '#fff',
    color: '#666',
    lineHeight: '1.6'
  },
  icon: {
    fontSize: '1.5em',
    fontWeight: 'bold'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '30px'
  },
  backButton: {
    padding: '10px 30px',
    borderRadius: '20px',
    textDecoration: 'none'
  }
};

export default TourGuideFAQ;
