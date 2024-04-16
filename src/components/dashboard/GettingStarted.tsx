import Sidebar from "../stepper/Sidebar";
import GettingStartedForm from "./GettingStartedForm";
import useCountStore from "../../store/store";
import Lifestyle from "../lifestyle/Lifestyle";
import HealthCheckups from "../HealthCheckups/HealthCheckups";
import MedicalHistory from "../MedicalHistory/MedicalHistory";

// import { GoogleSpreadsheet } from 'google-spreadsheet'
// import { JWT } from 'google-auth-library';
// import { useEffect } from "react";
// import { google } from "googleapis";
// import axios from "axios";
// import { GoogleAuth } from "google-auth-library";

const GettingStarted = () => {
  const count = useCountStore(state => state.count)
  const form = useCountStore(state => state.form)

  const {
    NEXT_PUBLIC_PRIVATE_KEY,
    NEXT_PUBLIC_CLIENT_EMAIL,
    NEXT_PUBLIC_SPREADSHEET_ID,
    NEXT_PUBLIC_KEY,
    NEXT_PUBLIC_SHEET_ID
  } = process.env
  console.log(NEXT_PUBLIC_KEY, 'NEXT_PUBLIC_KEY')


  console.log(form, 'form')

  

  //  const serviceAccountAuth = new JWT({
  //   email: NEXT_PUBLIC_CLIENT_EMAIL,
  //   key: "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".replace(/\\n/g, "\n"),
  //   scopes: [
  //       'https://www.googleapis.com/auth/spreadsheets',
  //   ],
  // });


  const appendSpreadsheet = async () => {
    // const doc = new GoogleSpreadsheet(NEXT_PUBLIC_SPREADSHEET_ID, { apiKey: NEXT_PUBLIC_KEY });
    // const dataOnject = {
    //   firstName: useCountStore.getState().form.firstName,
    //   lastName: useCountStore.getState().form.lastName,
    //   phoneNumber: useCountStore.getState().form.phoneNumber
    // }
    try {
      axios.post('https://sheet.best/api/sheets/20608cdb-dc81-44c9-ac2c-88feab750490', {form})
    .then(response => {
      console.log(response);
    })

    } catch (e) {
      console.error("Error: ", e);
    }
  };
  // const appendSpreadsheet = async () => {
  //   const doc = new GoogleSpreadsheet(NEXT_PUBLIC_SPREADSHEET_ID, { apiKey: NEXT_PUBLIC_KEY });
  //   const dataOnject = {
  //     firstName: useCountStore.getState().form.firstName,
  //     lastName: useCountStore.getState().form.lastName,
  //     phoneNumber: useCountStore.getState().form.phoneNumber
  //   }
  //   try {
      
  //     await doc.loadInfo();
  //     const sheet = doc.sheetsById[NEXT_PUBLIC_SHEET_ID];
  //     const result = await sheet.addRow(dataOnject);
      
  //     console.log(result, 'final result')
  //     return result;
  //   } catch (e) {
  //     console.error("Error: ", e);
  //   }
  // };

  
//   fetch("https://script.google.com/macros/s/AKfycbxAkEboKwnGtRgmwCY7CUCqA98h1_Vv0m5qmtGhsQX8f121BRZ543XszPVicZPJxoA/exec", {
//    method: 'POST',
//    body: new FormData(),
//    }).then(res => {
//      return res.json()
//    }).then((data)=>{
//      console.log(data); 
//      alert(data.msg)
//    })
//    .catch(err => console.log(err))
// }

// https://docs.google.com/spreadsheets/d/1t9QeoOJdB6DB2nZN4dm5MLNlogCLGwRD6T2Fl4mbIV4/edit?usp=sharing
// https://sheet.best/api/sheets/20608cdb-dc81-44c9-ac2c-88feab750490
  return (
    <div className="sm:mx-20 max-w-2x">
      <div className="flex justify-center h-screen">
        <Sidebar />
        <div className="flex flex-1 mx-10 my-4 md:my-8 w-full overflow-y-scroll no-scrollbar">
          {count === 1 && <GettingStartedForm />}
          {count === 2 && <Lifestyle />}
          {count === 3 && <HealthCheckups />}
          {count === 4 && <MedicalHistory {...{appendSpreadsheet}} />}
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;

// Client ID    663205475197-ng3o4a17aeg1mjtuehopboh549g2j8le.apps.googleusercontent.com
// Client secret   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


// https://docs.google.com/spreadsheets/d/1UwZU5LOAYGo3DnxpBg6cPJvgTK8RnAg3F_imP815e8Y/edit?usp=sharing