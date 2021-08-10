import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";

const Metas = ({ pageTitle = "Digifigs Limited", metaContent = "" }) => {
  return (
    <MetaTags>
      <title>{pageTitle}</title>
      <meta name="description" content={metaContent} />
    </MetaTags>
  );
};

Metas.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  metaContent: PropTypes.string.isRequired,
};

export default Metas;
