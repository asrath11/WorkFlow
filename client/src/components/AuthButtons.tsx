import Google from '../assets/Google.svg';
import FaceBook from '../assets/FaceBook.svg';
function AuthButtons() {
  const handleGoogleClick = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google`;
  };
  return (
    <>
      <div className='flex items-center my-4'>
        <div className='bg-black w-16 h-px' />
        <span className='text-center mx-2'>Or</span>
        <div className='bg-black w-16 h-px' />
      </div>
      <div className='flex gap-4'>
        <img
          src={Google}
          alt='Google'
          className='cursor-pointer'
          onClick={handleGoogleClick}
        />
        <img src={FaceBook} alt='FaceBook' className='cursor-pointer' />
      </div>
    </>
  );
}

export default AuthButtons;
