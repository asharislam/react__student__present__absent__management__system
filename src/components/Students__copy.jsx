import { useState } from "react";
const Students = function(){
    const [studentName, setStudentName] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [isEditableStudent, setIsEditableStudent] = useState(false);
    const [editableStudent, setEditableStudent] = useState(null);
    
    const addStudentHandler = function(e){
        e.preventDefault();
        if(!studentName){
            alert("Enter Student Name")
        }else{
            const newStudent = {
                name: studentName,
                id: Date.now(),
            }
            setStudentList([...studentList, newStudent]);
            setStudentName("");
        }
    }
    
    const editHandler = function(id){
        const toBeEditedStudent = studentList.find(student=>student.id===id)
        setIsEditableStudent(true);
        setEditableStudent(toBeEditedStudent);
        setStudentName(toBeEditedStudent.name);

    }
    const deleteHandler = function(id){
        const toBeDeletedStudent = studentList.filter(student=>student.id !==id);
        setStudentList(toBeDeletedStudent);
    }
    const updateHandler = function(e){
        e.preventDefault();
        // editableStudent.name = studentName || editableStudent.name;

        if (studentName){
            editableStudent.name = studentName
        }else{
            editableStudent.name = editableStudent.name;
            alert("You Do Not Edited");
        }

        setStudentName("");
        setIsEditableStudent(false);
        setEditableStudent(null);
    }
    return(
        <div className="container">
            <h2>Student Input Form</h2>
            <form>
                <input value={studentName} type="text" onChange={(e)=>setStudentName(e.target.value)} name="studentlist" placeholder="Enter Student Name" />

                <button onClick={(e)=>isEditableStudent===true? updateHandler(e):addStudentHandler(e)}>{isEditableStudent===true?"Update Student":"Add Student"}</button>
                
            </form>
            <div className="container__all__student">
                <ol>
                    {studentList.map(student=>(
                        <li>
                            <span>{student.name+" "}</span>
                            <button onClick={(e)=>editHandler(student.id)}>Edit</button>
                            <button onClick={(e)=>deleteHandler(student.id)}>Delete</button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
export default Students;