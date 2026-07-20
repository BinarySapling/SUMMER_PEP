import React, { useState, useEffect } from "react";

const FormComp = () => {

    const [arr1, setArr1] = useState([]);
    const [formData, setFormData] = useState({
        name: "", refId: "", email: "",
        city: "Delhi",
    });
    const [submittedData, setSubmittedData] = useState(null);
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setSubmittedData(formData);
        localStorage.setItem("users", JSON.stringify([...arr1, formData]));
        setArr1((prev) => [...prev, formData])
        setFormData({
            name: "", refId: "", email: "",
            city: "Delhi"
        })
    };

    const clearDATA = () => {
        localStorage.clear();
        setArr1([]);
    }

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("users") || "[]");
        setArr1(stored);
    }, []);
    return (
        <div className="comp">
            <form onSubmit={handleSubmit} className="form">
                <h1>FORM</h1>
                <h4>Name</h4>
                <input className="input"
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <h4>Ref Id</h4>
                <input
                    className="input"
                    type="text"
                    required
                    name="refId"
                    value={formData.refId}
                    onChange={handleChange}
                />

                <h4>Email</h4>

                <input required className="input" type="email" name="email" value={formData.email} onChange={handleChange}
                />

                <h4>City</h4>
                <select className="input" name="city" value={formData.city} onChange={handleChange}
                >
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Chennai">Chennai</option>
                </select>

                <br />
                <br />

                <button type="submit">Submit</button>
            </form>


            {submittedData && (
                <div className="old_input">
                    <h3>Submitted Data</h3>
                    <p>Name: {submittedData.name}</p>
                    <p>Ref Id: {submittedData.refId}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>City: {submittedData.city}</p>
                </div>
            )}


            <div className="old_input">
                {arr1.map((item, index) => (
                    <div key={index}>
                        <p>Name: {item.name}</p>
                        <p>Ref Id: {item.refId}</p>
                        <p>Email: {item.email}</p>
                        <p>City: {item.city}</p>
                        <hr />
                    </div>
                ))}
                <button onClick={clearDATA}>Clear DATA</button>
            </div>


        </div>
    );
};

export default FormComp;