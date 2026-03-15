export default function StudentsTable({ students }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Recent Students</h3>
        <p>Latest enrolled students</p>
      </div>

      <div className="table-wrap">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Student No.</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Year Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students?.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.student_number}</td>
                  <td>{student.full_name}</td>
                  <td>{student.gender}</td>
                  <td>{student.course?.course_code}</td>
                  <td>{student.year_level}</td>
                  <td>{student.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}