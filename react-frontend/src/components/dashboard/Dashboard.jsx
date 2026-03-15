<<<<<<< HEAD
import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import api from "../../services/api";
import StatCard from "./StatCard";
import EnrollmentChart from "./EnrollmentChart";
import CourseDistributionChart from "./CourseDistributionChart";
import AttendanceChart from "./AttendanceChart";
import StudentsTable from "./StudentsTable";
import WeatherWidget from "../weather/WeatherWidget";
import DashboardSkeleton from "./DashboardSkeleton";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setPageError("");

        const [statsRes, enrollmentRes, courseRes, attendanceRes, studentsRes] =
          await Promise.all([
            api.get("/dashboard/stats"),
            api.get("/dashboard/enrollment-trends"),
            api.get("/dashboard/course-distribution"),
            api.get("/dashboard/attendance-patterns"),
            api.get("/students?per_page=10"),
          ]);

        setStats(statsRes.data);
        setEnrollmentData(enrollmentRes.data);
        setCourseData(courseRes.data);
        setAttendanceData(attendanceRes.data);
        setStudents(studentsRes.data.data || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setPageError(
          "Failed to load dashboard data. Make sure the Laravel API is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <DashboardSkeleton />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="hero-banner">
          <div className="hero-content">
            <h1>Academic Monitoring Dashboard</h1>
            <p>
              View enrollment trends, course distribution, attendance patterns,
              and local weather updates for the 2025-2026 academic year.
            </p>
          </div>
        </section>

        {pageError && <div className="alert error page-alert">{pageError}</div>}

        <section className="stats-grid">
          <StatCard title="Total Students" value={stats?.students_count || 0} />
          <StatCard title="Courses Offered" value={stats?.courses_count || 0} />
          <StatCard title="School Days" value={stats?.school_days_count || 0} />
          <StatCard title="Male Students" value={stats?.male_students_count || 0} />
          <StatCard title="Female Students" value={stats?.female_students_count || 0} />
          <StatCard
            title="Present Students"
            value={stats?.present_students_count || 0}
          />
        </section>

        <section className="charts-grid">
          <EnrollmentChart data={enrollmentData} />
          <CourseDistributionChart data={courseData} />
          <AttendanceChart data={attendanceData} />
        </section>

        <section className="content-grid">
          <StudentsTable students={students} />
          <WeatherWidget />
        </section>

        <section className="province-gallery">
          <div className="gallery-card">
            <img src="/backgrounds/ddnbg.jpg" alt="Davao del Norte scenery" />
          </div>
          <div className="gallery-card">
            <img src="/backgrounds/ddnbg2.jpg" alt="Davao del Norte landmark" />
          </div>
        </section>
      </main>
    </>
  );
}
=======
import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import LoadingSpinner from "../common/LoadingSpinner";
import api from "../../services/api";
import StatCard from "./StatCard";
import EnrollmentChart from "./EnrollmentChart";
import CourseDistributionChart from "./CourseDistributionChart";
import AttendanceChart from "./AttendanceChart";
import StudentsTable from "./StudentsTable";
import WeatherWidget from "../weather/WeatherWidget";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setPageError("");

      const [statsRes, enrollmentRes, courseRes, attendanceRes, studentsRes] =
        await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/enrollment-trends"),
          api.get("/dashboard/course-distribution"),
          api.get("/dashboard/attendance-patterns"),
          api.get("/students?per_page=10"),
        ]);

      setStats(statsRes.data);
      setEnrollmentData(enrollmentRes.data);
      setCourseData(courseRes.data);
      setAttendanceData(attendanceRes.data);
      setStudents(studentsRes.data.data || []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setPageError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner text="Loading dashboard..." />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="hero-banner">
          <div className="hero-content">
            <h1>Academic Monitoring Dashboard</h1>
            <p>
              View enrollment trends, course distribution, attendance patterns,
              and local weather updates for the 2025–2026 academic year.
            </p>
          </div>
        </section>

        {pageError && <div className="alert error page-alert">{pageError}</div>}

        <section className="stats-grid">
          <StatCard title="Total Students" value={stats?.students_count || 0} />
          <StatCard title="Courses Offered" value={stats?.courses_count || 0} />
          <StatCard title="School Days" value={stats?.school_days_count || 0} />
          <StatCard title="Male Students" value={stats?.male_students_count || 0} />
          <StatCard title="Female Students" value={stats?.female_students_count || 0} />
          <StatCard title="Present Students" value={stats?.present_students_count || 0} />
        </section>

        <section className="charts-grid">
          <EnrollmentChart data={enrollmentData} />
          <CourseDistributionChart data={courseData} />
          <AttendanceChart data={attendanceData} />
        </section>

        <section className="content-grid">
          <StudentsTable students={students} />
          <WeatherWidget />
        </section>

        <section className="province-gallery">
          <div className="gallery-card">
            <img src="/davao-1.jpg" alt="Davao Del Norte scenery" />
          </div>
          <div className="gallery-card">
            <img src="/davao-2.jpg" alt="Davao Del Norte landmark" />
          </div>
        </section>
      </main>
    </>
  );
}
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
