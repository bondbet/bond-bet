import PoolBoxHeader from "../../Pools/Components/PoolBoxHeader";

const Description = ({ title, description }) => (
  <div>
    <div
      className="pools-box"
      style={{ marginBottom: "30px", marginTop: "30px" }}
    >
      <PoolBoxHeader title={title} />
      <div className="pools-box-content required-changes">
        <div className="pools-box-inner required-changes">
          <p className="pools-box-inner-description">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Description;
