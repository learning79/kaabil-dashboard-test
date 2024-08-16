import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://admin.kaabil.me/api/courses/');
        setCourses(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses. Please try again later.');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = () => {
    navigate('/new');
  };

  const handleCourseClick = (course) => {
    navigate(`/${encodeURIComponent(course.subjectName)}`);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
          onClick={handleCreateCourse}
        >
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-400">+</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Create New Course</h3>
          </div>
        </Card>
        {courses.map((course) => (
          <Card
            key={course.subjectName}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleCourseClick(course)}
          >
            <img 
              src={`/api/placeholder/400/300?text=${encodeURIComponent(course.subjectName)}`} 
              alt={course.subjectName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{course.subjectName}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;