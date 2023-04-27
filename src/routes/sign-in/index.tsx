import SignInForm from "@components/sign-in-form";
import SignUpForm from "@components/sign-up-form";

const SignIn = () => {
  return (
    <div className="grid grid-cols-2 gap-4 py-6">
      <div>
        <h2 className="mb-6 font-header text-2xl font-bold text-slate-800">
          Already have an account?
        </h2>
        <SignInForm />
      </div>
      <div>
        <h2 className="mb-6 font-header text-2xl font-bold text-slate-800">
          Create an account
        </h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignIn;
