import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const MeterForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Client"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.client}
                name="client"
                error={!!touched.client && !!errors.client}
                helperText={touched.client && errors.client}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Substation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.substation}
                name="substation"
                error={!!touched.substation && !!errors.substation}
                helperText={touched.substation && errors.substation}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Load Center"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.loadCenter}
                name="loadCenter"
                error={!!touched.loadCenter && !!errors.loadCenter}
                helperText={touched.loadCenter && errors.loadCenter}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Model"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.model}
                name="model"
                error={!!touched.model && !!errors.model}
                helperText={touched.model && errors.model}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Manufacturer"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.manufacturer}
                name="manufacturer"
                error={!!touched.manufacturer && !!errors.manufacturer}
                helperText={touched.manufacturer && errors.manufacturer}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Firmware Version"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firmwareVersion}
                name="firmwareVersion"
                error={!!touched.firmwareVersion && !!errors.firmwareVersion}
                helperText={touched.firmwareVersion && errors.firmwareVersion}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Serial Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.serialNumber}
                name="serialNumber"
                error={!!touched.serialNumber && !!errors.serialNumber}
                helperText={touched.serialNumber && errors.serialNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Registration Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registrationDate}
                name="registrationDate"
                error={!!touched.registrationDate && !!errors.registrationDate}
                helperText={touched.registrationDate && errors.registrationDate}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Cut-Off Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cutOffDate}
                name="cutOffDate"
                error={!!touched.cutOffDate && !!errors.cutOffDate}
                helperText={touched.cutOffDate && errors.cutOffDate}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Billing Period"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.billingPeriod}
                name="billingPeriod"
                error={!!touched.billingPeriod && !!errors.billingPeriod}
                helperText={touched.billingPeriod && errors.billingPeriod}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Register New Meter
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  client: yup.string().required("required"),
  location: yup.string().required("required"),
  substation: yup.string().required("required"),
  loadCenter: yup.string().required("required"),
  model: yup.string().required("required"),
  manufacturer: yup.string().required("required"),
  firmwareVersion: yup.string().required("required"),
  serialNumber: yup.string().required("required"),
  registrationDate: yup.date().required("required"),
  cutOffDate: yup.date().required("required"),
  billingPeriod: yup.string().required("required"),
});

const initialValues = {
  client: "",
  location: "",
  substation: "",
  loadCenter: "",
  model: "",
  manufacturer: "",
  firmwareVersion: "",
  serialNumber: "",
  registrationDate: "",
  cutOffDate: "",
  billingPeriod: "",
};

export default MeterForm;