import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Shared/Header";
import Login from "./Pages/Login";
import PatientSample from "./Pages/patience/PatienceSampleCollection";
import PatientCardForm from "./MasterForms/PatientCardForm";
import ReportPreview from "./Components/modal/ReportPreview";
import PatienceCardList from "./Pages/patience/PatienceCardList";
import PatientInformationForm from "./Pages/patience/AddPatients";
import ViewPatientDetails from "./Pages/patience/ViewPatientDetails";
import Patient from "./Pages/patience/Patient";
import Doctor from "./Pages/Accounts/Doctor";
import User from "./Pages/MasterData/User";
import Collector from "./Pages/Accounts/Collector";
import AddDoctorForm from "./Pages/Accounts/AddDoctorForm";
import AddUserForm from "./Pages/MasterData/AddUserForm ";
import AddCollectorForm from "./Pages/MasterData/AddCollectorForm";
import EditDoctorForm from "./Pages/Accounts/EditDoctorForm";
import EditUserForm from "./Pages/Accounts/EditUserForm";
import EditCollectorForm from "./Pages/Accounts/EditCollectorForm";
import AddNewTest from "./Pages/MasterData/AddNewTest";
import ReportGroup from "./Pages/Accounts/ReportGroup";
import ReportFormat from "./Pages/Accounts/ReportFormat";
import PriceList from "./Pages/MasterData/PriceList";
import AddNewTestForm from "./MasterForms/AddNewTestForm";
import AddReportGroupForm from "./MasterForms/AddReportGroupForm";
import AddNewAccount from "./Pages/Accounts/AddNewAccount";
import PatientReport from "./Pages/patience/PatientReport";
import AppointMent from "./Pages/MasterData/AppointMent";
import NewReportEntry from "./Components/modal/NewReportEntry";
import VerifyReportEntry from "./Pages/MasterData/VerifyReportEntry";
import AddReportFormatForm from "./MasterForms/AddReportFormatForm";
import EditAccount from "./Pages/Accounts/EditAccount";
import AddPriceListForm from "./MasterForms/AddPriceListForm";
import GetAccountList from "./Pages/MasterData/GetAccountList";
import GetSampleList from "./Pages/MasterData/GetSampleList";
import AddSampleForm from "./Pages/MasterData/AddSampleForm";
import Visitor from "./Pages/patience/Visitor";
import EditReportGroupForm from "./MasterForms/EditReportFormatForm";
import NewReportEntrys from "./Components/modal/NewEntryReport";
import EditReportEntrys from "./Pages/MasterData/EditReportEntrys";
import EditSampleList from "./Pages/MasterData/EditSampleList";
import EditPriceListForm from "./MasterForms/EditPriceListForm";
import GenerateCode from "./MasterForms/GenerateCode";
import AddVisit from "./Pages/patience/AddVisit";
import EditTest from "./Pages/MasterData/EditTest";
import EditReport from "./MasterForms/EditReport";
import EditPatientCardForm from "./MasterForms/EditPatientCardForm";
import EditPatientInformationForm from "./Pages/patience/EditPatientInformationForm";


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("logintoken") || "");

  useEffect(() => {
    if (token === null) setToken(localStorage.getItem("logintoken"));
  }, []);



  return (
    <BrowserRouter>
      {token && <Header/>}
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/register-doctor" element={<Doctor/>} />
        <Route exact path="/register-user" element={<User/>} />
        <Route exact path="/register-collector" element={<Collector />} />

        <Route exact path="/add-doctor" element={<AddDoctorForm />} />
        <Route exact path="/add-user" element={<AddUserForm />} />
        <Route exact path="/add-collector" element={<AddCollectorForm />} />
        <Route exact path="/edit-doctor/:id" element={<EditDoctorForm />} />
        <Route exact path="/edit-user/:id" element={<EditUserForm />} />
        <Route
          exact
          path="/edit-collector/:id"
          element={<EditCollectorForm />}
        />

        <Route exact path="/add-test" element={<AddNewTest />} />
        <Route exact path="/add-report-group" element={<ReportGroup />} />
        <Route exact path="/add-report-format" element={<ReportFormat />} />
        <Route exact path="/edit-reports-format/:id" element={<EditReport />} />
        <Route exact path="/add-price-list" element={<PriceList />} />

        <Route exact path="/register-new-test" element={<AddNewTestForm />} />
        <Route exact path="/edit-test/:id" element={<EditTest />} />
        <Route
          exact
          path="/register-report-group"
          element={<AddReportGroupForm />}
        />

        <Route exact path="/add-new-account" element={<AddNewAccount />} />
        <Route
          exact
          path="/patient-report/:phone"
          element={<PatientReport />}
        />

        <Route
          exact
          path="/appointment-view/:phone"
          element={<AppointMent />}
        />
        <Route
          exact
          path="/new-report-entry/:id/:phone"
          element={<NewReportEntrys />}
        />

        <Route
          exact
          path="/edit-patience-report/:id/:phone"
          element={<EditReportEntrys />}
        />

        <Route
          exact
          path="/verify-report/:id/:phone"
          element={<VerifyReportEntry />}
        />

        <Route
          exact
          path="/register-report-format"
          element={<AddReportFormatForm />}
        />

        <Route exact path="/edit-account-list/:id" element={<EditAccount />} />

        <Route
          exact
          path="/edit-report-format/:id"
          element={<EditReportGroupForm />}
        />
        <Route
          exact
          path="/register-price-list"
          element={<AddPriceListForm />}
        />

        <Route
          exact
          path="/generate-barcode"
          element={<GenerateCode/>}
        />

         <Route
          exact
          path="/edit-price-list/:id"
          element={<EditPriceListForm/>}
        />

        <Route exact path="/get-account-list" element={<GetAccountList />} />

        <Route exact path="/get-sample-list" element={<GetSampleList />} />
        <Route exact path="/register-sample-list" element={<AddSampleForm />} />
        <Route exact path="/edit-sample-list/:id" element={<EditSampleList/>} />

        <Route exact path="/list-patience" element={<Patient />} />
        <Route
          exact
          path="/view-patient/:id"
          element={<ViewPatientDetails />}
        />
        <Route
          exact
          path="/add-patience"
          element={<PatientInformationForm />}
        />

        <Route
          exact
          path="/edit-patience/:id"
          element={<EditPatientInformationForm />}
        />

        <Route exact path="/patience-cards" element={<PatienceCardList />} />
        <Route
          exact
          path="/patience-report-preview/:id/:phone"
          element={<ReportPreview />}
        />

        <Route exact path="/add-patience-cards" element={<PatientCardForm />} />
        <Route exact path="/edit-patience-card/:id" element={<EditPatientCardForm />} />
        <Route exact path="/assign-collector" element={<PatientSample />} />
        <Route exact path="/visitor-book" element={<Visitor/>} />
        <Route exact path="/add-visit" element={<AddVisit/>} />
      </Routes>
    </BrowserRouter>
  );
  
};

export default App;



