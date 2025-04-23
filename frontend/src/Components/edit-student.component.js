//src/Components/edit-student.component.js

// EditStudent Component for update student data
// Import Modules
import React,
{
    useState,
    useEffect
} from "react";
import axios from "axios";
import StudentForm
    from "./StudentForm";

import {
        useParams,
        useNavigate
      } from "react-router-dom";


// EditStudent Component
const EditStudent = (props) => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [formValues, setFormValues] =
        useState(
            {
                name: "",
                email: "",
                rollno: "",
            }
        )

    //onSubmit handler
    const onSubmit = (studentObject) => {
        axios
            .put( 
                axios.defaults.baseURL + "/students/students/" +
                id,
                studentObject
            )
            .then((res) => {
                if (res.status === 200) {
                    alert("Student successfully updated");
                    navigate("/student-list");
                    //props.history.push("/student-list");
                } else Promise.reject();
            })
            .catch(
                (err) =>
                    alert("Something went wrong "+err)
            );
    };

    // Load data from server and reinitialize student form
    useEffect(() => {
        axios
            .get(
                axios.defaults.baseURL + "/students/students/"
                + id
            )
            .then((res) => {
                const {
                    name,
                    email,
                    rollno
                } = res.data;
                setFormValues(
                    {
                        name,
                        email,
                        rollno
                    });
            })
            .catch(
                (err) =>
                    console.log(err)
            );
    }, []);

    // Return student form
    return (
        <StudentForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Update Student
        </StudentForm>
    );
};

// Export EditStudent Component
export default EditStudent;