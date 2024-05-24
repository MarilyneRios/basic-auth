import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth({label}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoogleClick = async () => {
        try{   
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: result.user.displayName,
                  email: result.user.email,
                  photo: result.user.photoURL,
                }),
              });
              const data = await res.json();
              console.log(data);
              dispatch(signInSuccess(data));
              navigate('/');
        } 
        catch (error) {
            console.log('Vous ne pouvez pas vous connectez avec google', error);
          }
    };

  return (
    <div>
      <button
        type='button'
        onClick={handleGoogleClick}
        className="inline-flex p-3 rounded-lg uppercase w-full items-center justify-center gap-2 border border-slate-700 bg-white hover:bg-slate-300 text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-[22px] w-[22px] "
        />
         {label}
      </button>
    </div>
  );
}
