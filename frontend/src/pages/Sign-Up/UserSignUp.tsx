import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import * as z from "zod";

// Updated Zod schema to match the desired output format
const SignUpSchema = z.object({
  fullname: z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
  }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type inference from the Zod schema
type SignUpFormInputs = z.infer<typeof SignUpSchema>;

const UserSignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpFormInputs) => {
    console.log("Form Submitted:", data);
    // You can add your signup logic here
    navigate("/sign-in");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-start py-4">
          <h1 className="text-4xl font-extrabold text-gray-800">Cabsy</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-4">
            <div className="space-y-2 flex-1">
              <Label
                htmlFor="firstname"
                className="block text-sm text-gray-600"
              >
                First Name
              </Label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <Input
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  {...register("fullname.firstname")}
                  className="flex-1 px-3 py-2 focus:outline-none text-gray-600"
                />
              </div>
              {errors.fullname?.firstname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullname.firstname.message}
                </p>
              )}
            </div>

            <div className="space-y-2 flex-1">
              <Label htmlFor="lastname" className="block text-sm text-gray-600">
                Last Name
              </Label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <Input
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  {...register("fullname.lastname")}
                  className="flex-1 px-3 py-2 focus:outline-none text-gray-600"
                />
              </div>
              {errors.fullname?.lastname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullname.lastname.message}
                </p>
              )}
            </div>
          </div>

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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full text-white py-3 rounded-lg font-medium bg-primary"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-2">
          <Link to="/sign-in" className="hover:underline">
            Already have an account?{" "}
            <span className="text-blue-500">Log In</span>
          </Link>
        </p>
      </div>

      <div className="my-4">
        <p className="text-xs text-gray-600 mt-2">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
