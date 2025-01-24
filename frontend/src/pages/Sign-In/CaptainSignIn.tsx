import { useNavigate } from "react-router-dom";
import { map } from "@/assets/auth/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const CaptainSignIn = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form Submitted:", data);
    navigate("/home");
  };

  return (
    <>
      {/* Map with Gradient Background */}
      <div className="relative w-full h-72">
        {/* Background gradient */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-radial from-green-400/90 via-green-300/50 to-transparent blur-2xl" />
        </div>

        {/* Secondary gradient */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full bg-gradient-radial from-green-500/80 via-green-400/40 to-transparent blur-xl" />
        </div>

        {/* Map image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={map}
            alt="Location map"
            className="w-48 h-48 object-contain z-10"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Cabsy</h1>
        <p className="text-gray-600 text-sm text-center">Captain Login</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="block text-sm text-gray-600">
            Email
          </Label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <Input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              {...register("email")}
              className="flex-1 px-3 py-2 focus:outline-none text-gray-600"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </Label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <Input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              {...register("password")}
              className="flex-1 px-3 py-2 focus:outline-none text-gray-600"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full text-white py-3 rounded-lg font-medium bg-primary"
        >
          Login
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        <Link to="/captain-sign-up" className="hover:underline">
          New here ? <span className="text-blue-500">Create new Account</span>
        </Link>
      </p>
      <p className="text-center my-2 text-gray-600">or</p>
      <Link
        to="/sign-in"
        className="text-white py-2 my-2 rounded-lg font-medium bg-primary flex justify-center items-center"
      >
        Sign in as User
      </Link>
    </>
  );
};

export default CaptainSignIn;
