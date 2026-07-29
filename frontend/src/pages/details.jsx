import { useLocation, useNavigate } from 'react-router-dom'
import { LuArrowLeft, LuMapPin, LuStar, LuUsers, LuWallet, LuLaugh, LuLightbulb } from 'react-icons/lu'

function Details() {
  const location = useLocation()
  const navigate = useNavigate()
  const place = location.state?.place

  if (!place) {
    return (
      <div className="details-error">
        <h1>No place selected</h1>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    )
  }

  return (
    <div className="details-page">
      <nav>
        <button className="back-btn" onClick={() => navigate('/')}>
          <LuArrowLeft /> Back
        </button>
        <h1>Fun <span>Spot <LuLaugh /></span></h1>
        <div />
      </nav>

      {/* Hero Image */}
      <div className="details-hero">
        <img src={place.images?.[0]} alt={place.location_name} />
        <div className="details-hero-overlay">
          <h1>{place.location_name}</h1>
          <div className="details-badges">
            <span className="badge-theme">{place.theme}</span>
            <span className="badge-rating"><LuStar /> {place.rating}</span>
          </div>
        </div>
      </div>

      <div className="details-content">
        {/* Info Grid */}
        <div className="details-info-grid">
          <div className="details-info-card">
            <LuMapPin />
            <div>
              <h4>Address</h4>
              <p>{place.address || 'N/A'}</p>
              {place.google_maps_url && (
                <a href={place.google_maps_url} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps →
                </a>
              )}
            </div>
          </div>

          <div className="details-info-card">
            <LuUsers />
            <div>
              <h4>Group Size</h4>
              <p>{place.group_size || 'N/A'} people</p>
            </div>
          </div>

          <div className="details-info-card">
            <LuWallet />
            <div>
              <h4>Total Budget</h4>
              <p>₦{place.total_budget_ngn?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>

          <div className="details-info-card">
            <LuStar />
            <div>
              <h4>Estimated Total</h4>
              <p>₦{place.estimated_total_spent_ngn?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Activity Breakdown */}
        {place.activity_breakdown && place.activity_breakdown.length > 0 && (
          <div className="details-section">
            <h2>Activity Breakdown</h2>
            <div className="activity-list">
              {place.activity_breakdown.map((activity, index) => (
                <div className="activity-card" key={index}>
                  <div className="activity-header">
                    <span className="activity-num">0{index + 1}</span>
                    <h3>{activity.activity}</h3>
                  </div>
                  <p className="activity-details">{activity.details}</p>
                  <div className="activity-cost">
                    <LuWallet />
                    <span>₦{activity.estimated_cost_ngn?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {place.recommendations && (
          <div className="details-section">
            <h2><LuLightbulb /> Recommendations</h2>
            <div className="recommendations-card">
              <p>{place.recommendations}</p>
            </div>
          </div>
        )}

        {/* More Images */}
        {place.images && place.images.length > 1 && (
          <div className="details-section">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {place.images.map((img, index) => (
                <div className="gallery-img" key={index}>
                  <img src={img} alt={`${place.location_name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Details
