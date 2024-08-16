import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CourseLessonsPage = () => {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://admin.kaabil.me/api/questions?courseName=${subjectName}`);
        const lessonsData = Array.isArray(response.data) ? response.data : [response.data];
        setLessons(lessonsData);
        setSelectedLesson(null);
        setQuestions([]);
        setSelectedQuestion(null);
        setError(null);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setError('Failed to fetch lessons. Please try again later.');
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [subjectName]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (selectedLesson) {
        try {
          setLoading(true);
          const response = await axios.get(`https://admin.kaabil.me/api/questions?lessonId=${selectedLesson.id}`);
          const questionsData = Array.isArray(response.data) ? response.data : [response.data];
          setQuestions(questionsData);
          setSelectedQuestion(null);
          setError(null);
        } catch (error) {
          console.error('Error fetching questions:', error);
          setError('Failed to fetch questions. Please try again later.');
          setQuestions([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuestions();
  }, [selectedLesson]);

  const handleCreateLesson = () => {
    navigate(`/courses/${encodeURIComponent(subjectName)}/lessons/new`);
  };

  const handleEditLesson = () => {
    if (selectedLesson) {
      navigate(`/courses/${encodeURIComponent(subjectName)}/lessons/${selectedLesson.id}/edit`);
    }
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setSelectedQuestion(null);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{decodeURIComponent(subjectName)}</h1>
      <div className="flex">
        <div className="w-1/3 pr-4">
          <Card className="mb-4 cursor-pointer hover:bg-gray-100" onClick={handleCreateLesson}>
            <CardContent className="flex items-center justify-center h-20">
              <PlusCircle className="mr-2" />
              <span>Create new Lesson</span>
            </CardContent>
          </Card>
          {lessons.map((lesson) => (
            <Card
              key={lesson.id || `lesson-${lesson.title}`}
              className={`mb-4 cursor-pointer ${selectedLesson?.id === lesson.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              onClick={() => handleLessonClick(lesson)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold">{lesson.title}</h3>
                <p className="text-sm text-gray-600">{lesson.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="w-2/3 pl-4">
          {selectedLesson && (
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{selectedLesson.title}</h2>
              <Button variant="outline" onClick={handleEditLesson}>
                <Edit className="mr-2" size={16} />
                Edit Lesson
              </Button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {questions.map((question) => (
              <Card
                key={question.id || `question-${question.question.substring(0, 20)}`}
                className={`cursor-pointer ${selectedQuestion?.id === question.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => handleQuestionClick(question)}
              >
                <CardContent className="p-4">
                  <p className="text-sm">{question.question}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedQuestion && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{selectedQuestion.question}</h3>
                {selectedQuestion.options && (
                  <ul className="list-disc pl-5">
                    {(typeof selectedQuestion.options === 'string' 
                      ? JSON.parse(selectedQuestion.options) 
                      : selectedQuestion.options
                    ).map((option, index) => (
                      <li key={`option-${index}`}>{option}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLessonsPage;