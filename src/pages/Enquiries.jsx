import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useProperties } from '../context/propertyStore'

function Enquiries() {
  const { changeEnquiryStatus, enquiries, removeEnquiry } = useProperties()

  return (
    <div className="home-page">
      <Navbar />

      <section className="property-section">
        <h2>Buyer Enquiries</h2>

        {enquiries.length > 0 ? (
          <div className="enquiry-list">
            {enquiries.map((enquiry) => (
              <article className="enquiry-card" key={enquiry.id}>
                <div>
                  <h3>{enquiry.name}</h3>
                  <p>{enquiry.propertyTitle}</p>
                </div>
                <p>{enquiry.phone}</p>
                <p>{enquiry.message}</p>
                <select
                  value={enquiry.status}
                  onChange={(event) => changeEnquiryStatus(enquiry.id, event.target.value)}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
                <button type="button" onClick={() => removeEnquiry(enquiry.id)}>
                  Delete
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="no-property">No enquiries submitted yet.</p>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Enquiries
