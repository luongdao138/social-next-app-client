import ButtonPrimary from 'components/Button/ButtonPrimary';
import LSInput from 'components/Input';
import LSLoader from 'components/LsLoader';
import LSSelect from 'components/Select';
import LSTextArea from 'components/TextArea';
import { genderOptions } from 'containers/Register';
import { Form, Formik, FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { EditProfileParams } from 'services/profile.service';
import { useAppSelector } from 'store/hooks';
import { selectors } from 'store/profile';
import { editUserProfileValidationSchema } from 'utils/validation';
import useEditProfile from './useEditProfile';

const initialValues: EditProfileParams = {
  address: '',
  fullname: '',
  gender: 'male',
  mobile: '',
  story: '',
  website: '',
};

interface Props {
  onClose: () => void;
}

const EditProfileForm: React.FC<Props> = ({ onClose }) => {
  const profile = useAppSelector(selectors.getUserProfile);
  const { meta, handleUpdateProfile, clearEditProfileMetadata } = useEditProfile();
  const originalValues = profile
    ? {
        story: profile.story,
        website: profile.website,
        mobile: profile.mobile,
        address: profile.address,
        fullname: profile.fullname,
        gender: profile.gender,
      }
    : initialValues;

  const handleEditUserProfile = (values: EditProfileParams) => {
    handleUpdateProfile(values);
  };

  const handleClose = (formik: FormikProps<EditProfileParams>) => {
    onClose();
    formik.setValues(originalValues);
  };

  useEffect(() => {
    if (meta.loaded) {
      onClose();
      clearEditProfileMetadata();
    }
  }, [meta.loaded, onClose, clearEditProfileMetadata]);

  return (
    <div className=''>
      <Formik
        initialValues={originalValues}
        onSubmit={handleEditUserProfile}
        enableReinitialize
        validationSchema={editUserProfileValidationSchema}
      >
        {(formik) => (
          <Form>
            <h1 className='text-center font-medium text-2xl mb-4'>Edit Profile</h1>
            <div className='flex flex-col gap-4'>
              <LSInput
                name='fullname'
                placeholder='Enter your full name'
                label='Full name'
                id='fullname'
              />
              <LSInput name='mobile' placeholder='Enter your mobile' label='Mobile' id='mobile' />
              <LSInput
                name='address'
                placeholder='Enter your address'
                label='Address'
                id='address'
              />
              <LSInput
                name='website'
                placeholder='Enter your website'
                label='Website'
                id='website'
              />
              <LSTextArea
                name='story'
                placeholder='Enter your story'
                label='Story'
                id='story'
                smallText={`${formik.values['story']?.length || 0} / 200`}
              />
              <LSSelect label='Gender' id='gender' name='gender' options={genderOptions} />
            </div>
            <div className='flex justify-end gap-2 mt-4'>
              <ButtonPrimary
                type='button'
                clickHandler={() => handleClose(formik)}
                size='sm'
                className='text-neutral-800'
              >
                Cancel
              </ButtonPrimary>
              <ButtonPrimary
                size='sm'
                type='submit'
                className='border-2 transition-colors duration-300 htext-white bg-teal-400 hover:bg-teal-500'
              >
                {meta.pending ? <LSLoader size={20} /> : 'Save'}
              </ButtonPrimary>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
