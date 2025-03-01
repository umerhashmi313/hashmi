import React, { useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import { PrimaryButton } from './Components/Buttons/Buttons';
import { useMutation } from 'react-query';

function App2({ onLogout }) {
  // Refs for hidden file inputs.
  const bulkFileInputRef = useRef(null);
  const assignFileInputRef = useRef(null);

  // Set a default password for bulk upload (you could make this configurable).
  const [defaultPassword] = useState('defaultPassword123'); 

  // Mutation for bulk user upload.
  const bulkMutation = useMutation(async (formData) => {
    const response = await fetch('https://backend-lms-xpp7.onrender.com/api/bulk-students/', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Error uploading bulk students');
    }
    return response.json();
  });

  // Mutation for assigning current students to more courses.
  const assignMutation = useMutation(async (formData) => {
    const response = await fetch('https://backend-lms-xpp7.onrender.com/api/assign-current-students-to-more-courses/', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Error assigning current students to more courses');
    }
    return response.json();
  });

  // Trigger bulk file input.
  const handleBulkUploadClick = () => {
    if (bulkFileInputRef.current) {
      bulkFileInputRef.current.click();
    }
  };

  // Trigger assign file input.
  const handleAssignClick = () => {
    if (assignFileInputRef.current) {
      assignFileInputRef.current.click();
    }
  };

  // When a file is selected for bulk upload.
  const handleBulkFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('csv_file', file);
    formData.append('default_password', defaultPassword);
    bulkMutation.mutate(formData);
  };

  // When a file is selected for assigning students to courses.
  const handleAssignFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('csv_file', file);
    // If you have additional fields to append, you can do it here.
    assignMutation.mutate(formData);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <PrimaryButton onClick={handleBulkUploadClick}>
          Upload Bulk User
        </PrimaryButton>
        {/* Hidden file input for bulk upload */}
        <input
          type="file"
          accept=".csv"
          ref={bulkFileInputRef}
          style={{ display: 'none' }}
          onChange={handleBulkFileChange}
        />
        <PrimaryButton onClick={handleAssignClick}>
          Handle More Than One User
        </PrimaryButton>
        {/* Hidden file input for assigning more courses */}
        <input
          type="file"
          accept=".csv"
          ref={assignFileInputRef}
          style={{ display: 'none' }}
          onChange={handleAssignFileChange}
        />
        <PrimaryButton onClick={onLogout}>Logout</PrimaryButton>

        {/* Display mutation states for bulk upload */}
        {bulkMutation.isLoading && <div>Uploading Bulk Users...</div>}
        {bulkMutation.isError && <div>Error: {bulkMutation.error.message}</div>}
        {bulkMutation.isSuccess && <div>{bulkMutation.data.message}</div>}

        {/* Display mutation states for assigning more courses */}
        {assignMutation.isLoading && <div>Assigning Users to Courses...</div>}
        {assignMutation.isError && <div>Error: {assignMutation.error.message}</div>}
        {assignMutation.isSuccess && <div>{assignMutation.data.message}</div>}
      </Box>
    </Container>
  );
}

export default App2;
