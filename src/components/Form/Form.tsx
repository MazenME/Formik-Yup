import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from "yup";

export default function Form() {
  const [clicked, setClicked] = useState(false);

  const validation = Yup.object({
    firstName: Yup.string()
      .required("this field is Required")
      .min(3, "must be at least 3 characters")
      .max(15, "must be at most 15 characters"),
    lastName: Yup.string()
      .required("this field is required")
      .min(3, "must be at least 3 characters")
      .max(15, "must be at most 15 characters"),
    email: Yup.string()
      .email("Invalid email ")
      .required("this field is Required"),
    password: Yup.string()
      .required("this field is Required")
      .min(8, "must be at least 8 characters")
      .max(15, "must be at most 15 characters"),
    maritalStatus: Yup.string().required("this field is Required"),
    wife: Yup.string().when("maritalStatus", {
      is: "married",
      then: (schema) => schema.required("this field is Required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      maritalStatus: "",
      wife: "",
    },
    validationSchema: validation,
    onSubmit: function () {
      console.log("form submitted");
      console.log(formik.values);
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="name">
            <div className="Name">
              <label htmlFor="firstName">First Name</label>
              <input
                value={formik.values.firstName}
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.firstName &&formik.touched.firstName && <h4>{formik.errors.firstName}</h4>}
            </div>
            <div className="Name">
              <label htmlFor="lastName">Last Name</label>
              <input
                value={formik.values.lastName}
                type="text"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.lastName &&formik.touched.lastName&& <h4>{formik.errors.lastName}</h4>}
            </div>
          </div>

          <div className="eps">
            <div className="ep">
              <label htmlFor="email">Email</label>
              <input
                value={formik.values.email}
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <h4>{formik.errors.email}</h4>}
            </div>

            <div className="ep">
              <label htmlFor="password">Password</label>
              <input
                value={formik.values.password}
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && <h4>{formik.errors.password}</h4>}
            </div>
            {clicked && (
              <div className="ep wife">
                <label htmlFor="wife">Wife Name</label>
                <input
                  value={formik.values.wife}
                  type="text"
                  id="wife"
                  name="wife"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.wife && formik.errors.wife && (
                  <h4>{formik.errors.wife}</h4>
                )}
              </div>
            )}
            <div className="radio">
              <label>
                Married
                <input
                  onChange={() => {
                    setClicked(true);
                    formik.handleChange("maritalStatus")("married");
                  }}
                  type="radio"
                  name="maritalStatus"
                />
              </label>

              <label>
                Single
                <input
                  onChange={() => {
                    setClicked(false);
                    formik.handleChange("maritalStatus")("single");
                  }}
                  type="radio"
                  name="maritalStatus"
                />
              </label>
            </div>
            {formik.errors.maritalStatus && formik.touched.maritalStatus && (
              <h4>{formik.errors.maritalStatus}</h4>
            )}

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
