import "./QuoteCard.css";

import Plane from "../../assets/plane.png";
import Boat from "../../assets/boat.png";

const QuoteCard = ({ quote }) => {
  return (
    <div className="quote-card">
      <div className="quote-card__side">
        <div className="quote-card__side--header">
          <img
            src={quote.shippingChannel === "air" ? Plane : Boat}
            alt={quote.shippingChannel}
          />
          <span>Traditional {quote.shippingChannel} freight</span>
        </div>
        <div className="quote-card__side--content">
          <div className="quote-card__range">
            <p>
              {quote.deliveryDate.minDays} - {quote.deliveryDate.maxDays} days
            </p>
          </div>
          <div className="quote-card__date">
            <span>Estimated delivery</span>
            <p>
              {quote.deliveryDate.minDate} - {quote.deliveryDate.maxDate}
            </p>
          </div>
        </div>
      </div>
      <div className="quote-card__main">
        <div className="quote-card__main--header">
          {quote.startCountry} -&gt; {quote.destinationCountry}
        </div>
        <div className="quote-card__main--content">
          <span>US ${quote.price}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
