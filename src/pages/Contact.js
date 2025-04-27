// src/pages/Contact.jsx
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('contactData');
    if (saved) setLastSubmission(JSON.parse(saved));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      nid: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^\d+$/, 'Phone must be numeric')
        .required('Phone is required'),
      address: Yup.string().required('Address is required'),
      nid: Yup.string()
        .matches(/^\d+$/, 'NID must be numeric')
        .required('NID is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      localStorage.setItem('contactData', JSON.stringify(values));
      setLastSubmission(values);
      toast.success('Data submitted successfully ✅');
      setShowModal(true);
      resetForm();
    },
  });

  return (
    <div className="min-h-[80vh] p-8 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      {lastSubmission && (
        <div className="mb-10 max-w-xl mx-auto text-left bg-gray-100 dark:bg-gray-800 p-5 rounded shadow">
          <h2 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Last Submitted Data</h2>
          <ul className="text-sm space-y-1">
            {Object.entries(lastSubmission).map(([k, v]) => (
              <li key={k}>
                <strong className="capitalize">{k}:</strong> {v}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto grid gap-6 text-left">
        {['name', 'email', 'phone', 'address', 'nid'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block mb-1 capitalize font-medium">{field}</label>
            <input
              id={field}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 rounded bg-gray-100 dark:bg-gray-800 border ${
                formik.touched[field] && formik.errors[field]
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            />
            {formik.touched[field] && formik.errors[field] && (
              <p className="text-sm text-red-500 mt-1">{formik.errors[field]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-6 py-3 rounded"
        >
          Submit
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 text-left p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Form Submitted</h2>
            <ul className="text-sm text-gray-800 dark:text-gray-200 space-y-1">
              {Object.entries(lastSubmission).map(([key, value]) => (
                <li key={key}>
                  <strong className="capitalize">{key}:</strong> {value}
                </li>
              ))}
            </ul>
            <div className="text-right">
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
