import PropTypes from 'prop-types';

const Card = ({ title, image, onClick, isNewCourse = false }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      {isNewCourse ? (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-4xl text-gray-400">+</span>
        </div>
      ) : (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isNewCourse: PropTypes.bool
};

Card.defaultProps = {
  isNewCourse: false,
  image: ''
};

export default Card;