import { GoogleAuthProvider,  } from 'firebase/auth';


export default function OAuth({label}) {

    const handleGoogleClick = async () => {
        try{   
            const provider = new GoogleAuthProvider();

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
