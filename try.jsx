/**
 *  Reduce number of requests & StudentsTable total update time as much as possible.
 *  Requests number is a bottleneck, we don’t want to fetch same data twice.
 *  Consider remote data to be constant within user session. Avoid unnecessary react re-renders, update only when all data for onStudentsPick is loaded.
 * fetchStudentData, fetchSchoolData & fetchLegalguardianData can only fetch one entity per request, we don’t have control over remote API.
 * There is no need to implement imported classes & functions, don’t waste your time.
 * Please, abstain from using help of neural networks - we’re evaluating your programming skills
 */

import StudentsPicker from "../components/StudentsPicker";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentData,
  fetchSchoolData,
  fetchLegalguardianData,
} from "../utils";
import { useState } from "react";

const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const schoolDataPromises = [];
  const legalguardianDataPromises = [];

  const onStudentsPick = async (studentIds) => {
    const studentDataPromises = studentIds.map((studentId) =>
      fetchStudentData(studentId)
    );
    setStudentsData(await Promise.all(studentDataPromises));

    for (const { schoolId, legalguardianId } of studentsData) {
      schoolDataPromises.push(fetchSchoolData(schoolId));
      legalguardianDataPromises.push(fetchSchoolData(legalguardianId));
    }
    // you can also combine both schooldsData and legalGaurdiansData promises in one big promise.all and split into two arrays by length then set scoolData nd guardiandata state setter
    setSchoolsData(await Promise.all(schoolDataPromises));
    setLegalguardiansData(await Promise.all(legalguardianDataPromises));

    // promise with all setteled
    setStudentsData(
      (await Promise.allSettled(studentDataPromises)).map(({ value }) => value)
    );
    setSchoolsData(
      (await Promise.allSettled(schoolDataPromises)).map(({ value }) => value)
    );
    setLegalguardiansData(
      (await Promise.allSettled(legalguardianDataPromises)).map(
        ({ value }) => value
      )
    );
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default studentsDataComponent;
