import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateCourse from './Course/CreateCourse';
import CoursesPage from './Course/CoursesPage';
import CourseLessonsPage from './Course/CourseLessonsPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/new" element={<CreateCourse />} />
          <Route path="/:subjectName" element={<CourseLessonsPage />} />

          {/* Other routes */}
        </Routes>
      </Router>
    </>
  )
}

export default App
