import { useState } from "react";
import Layout from "../../components/Layout";
import Dashboard from "../Dashboard";
import Payments from "../Payments";
import Students from "../Students";
import Reports from "../Reports";
import Settings from "../Settings";
function DashboardPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const pageConfig = {
    dashboard: { title: "Dashboard", component: <Dashboard /> },
    payments: { title: "Payments", component: <Payments /> },
    students: { title: "Students", component: <Students /> },
    reports: { title: "Reports", component: <Reports /> },
    settings: { title: "Settings", component: <Settings /> },
  };

  const currentPage = pageConfig[activePage] || pageConfig.dashboard;

  return (
    <Layout
      pageTitle={currentPage.title}
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {currentPage.component}
    </Layout>
  );
}

export default DashboardPage;
