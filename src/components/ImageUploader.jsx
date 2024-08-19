import React, { useState } from "react";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [balance, setBalance] = useState("");
  const [balanceResult, setBalanceResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/eBay-gift-card.png.webp",
    "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/eBay-gift-card.png.webp",
    "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/eBay-gift-card.png.webp",
    "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/eBay-gift-card.png.webp",
    "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/eBay-gift-card.png.webp",
    "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/eBay-gift-card.png.webp",
  ];

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCheckBalance = () => {
    setIsLoading(true);

    // Simulate an API call to check balance
    setTimeout(() => {
      if (balance === "1234") {
        setBalanceResult("Your balance is $100");
      } else {
        setBalanceResult("Enter a valid number");
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="payment-text">Choose your payment options</h2>
      </div>

      <div className="payment-options">
        <button className="payment-button">Apple Card</button>
        <button className="payment-button">eBay</button>
        <button className="payment-button">Google Card</button>
        <button className="payment-button">Amazon</button>
      </div>

      <input type="file" onChange={handleFileChange} />

      {selectedFile && (
        <div className="image-container">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Uploaded"
            className="uploaded-image"
          />
          <div className="verification-message">
            Image uploaded successfully!
          </div>

          {/* Display the gift card balance section once a file is uploaded */}
          <div className="apple-cards-container">
            <h2>Check your gift card balance</h2>
            <div className="slider">
              <div
                className="slider-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((src, index) => (
                  <img key={index} src={src} alt={`Slide ${index + 1}`} />
                ))}
              </div>
              <div className="slider-controls">
                <button className="slider-control" onClick={handlePrevClick}>
                  ❮
                </button>
                <button className="slider-control" onClick={handleNextClick}>
                  ❯
                </button>
              </div>
            </div>

            <div className="balance-check">
              <input
                type="text"
                className="balance-input"
                placeholder="Enter your gift card number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
              <button
                className="check-balance-button"
                onClick={handleCheckBalance}
              >
                Check Balance
              </button>
            </div>

            {isLoading ? (
              <div className="rolling-message">
                <div className="spinner"></div>
                <div className="rolling-text">Checking balance...</div>
              </div>
            ) : (
              balanceResult && (
                <div
                  className={`balance-result ${
                    balanceResult === "Enter a valid number" ? "danger" : ""
                  }`}
                >
                  {balanceResult}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
