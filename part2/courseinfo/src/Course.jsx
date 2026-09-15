const Header = ({course}) => <h1>{course.name}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  
const Content = ({parts}) => parts.map(part => <Part key={part.id} part={part} />)
  
  const Total = ({parts}) => <p>Number of exercises {parts.reduce((sum,part) => sum + part.exercises, 0)}</p>
    
  const Course = ({ course }) => (
    <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
  )

  export default Course