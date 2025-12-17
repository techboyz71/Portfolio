import MapComponent from "../components/mapComponent";
import DashViewPhysician from "./DashViewPhysician";
import DashViewPatient from "./DashViewPatient";
import SettingsButtonList from "../components/SettingsButtonList";

function TestView() {
  return (
    <div>
      <DashViewPatient />
      {/* <DashViewPhysician /> */}
    </div>
  );
}

export default TestView;
