import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import * as z from "zod";
import { axiosInstance } from "@/axiosInstance";
import { CaptainContext } from "@/context/CaptainContext";
import { useContext } from "react";

// Updated Zod schema to include vehicle details
const CaptainSignUpSchema = z.object({
  fullname: z.object({
    firstname: z.string().min(3, "First name must be at least 3 characters"),
    lastname: z.string().min(1, "Last name is required"),
  }),
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  vehicle: z.object({
    color: z.string().min(3, "Color must be at least 3 characters long"),
    plate: z.string().min(3, "Plate must be at least 3 characters long"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    vehicleType: z.enum(["car", "motorcycle", "auto"], {
      errorMap: () => ({ message: "Invalid vehicle type" }),
    }),
  }),
});

// Type inference from the Zod schema
type CaptainSignUpFormInputs = z.infer<typeof CaptainSignUpSchema>;

const CaptainSignUp = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaptainSignUpFormInputs>({
    resolver: zodResolver(CaptainSignUpSchema),
    defaultValues: {
      vehicle: {
        capacity: 3,
        vehicleType: "car",
      },
    },
  });

  const onSubmit = async (data: CaptainSignUpFormInputs) => {
    try {
      const response = await axiosInstance.post("/captain/register", {
        fullname: {
          firstname: data.fullname.firstname.toLowerCase(),
          lastname: data.fullname.lastname.toLowerCase(),
        },
        email: data.email,
        password: data.password,
        vehicle: {
          color: data.vehicle.color,
          plate: data.vehicle.plate,
          capacity: data.vehicle.capacity,
          vehicleType: data.vehicle.vehicleType,
        },
      });
      if (response.status === 201) {
        const captain = response.data.data;
        setCaptain(captain);
        navigate("/captain-sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-start py-4">
          <h1 className="text-4xl font-extrabold text-gray-800">Cabsy</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Existing name and email fields */}
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

          {/* Vehicle Details Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Vehicle Details
            </h2>

            <div className="flex space-x-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="color" className="block text-sm text-gray-600">
                  Vehicle Color
                </Label>
                <Input
                  type="text"
                  id="color"
                  placeholder="Vehicle Color"
                  {...register("vehicle.color")}
                  className="flex-1 px-3 py-2 focus:outline-none text-gray-600 border border-gray-300 rounded-lg"
                />
                {errors.vehicle?.color && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicle.color.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <Label htmlFor="plate" className="block text-sm text-gray-600">
                  Vehicle Plate
                </Label>
                <Input
                  type="text"
                  id="plate"
                  placeholder="Vehicle Plate"
                  {...register("vehicle.plate")}
                  className="flex-1 px-3 py-2 focus:outline-none text-gray-600 border border-gray-300 rounded-lg"
                />
                {errors.vehicle?.plate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicle.plate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="space-y-2 flex-1">
                <Label
                  htmlFor="capacity"
                  className="block text-sm text-gray-600"
                >
                  Vehicle Capacity
                </Label>
                <Input
                  type="number"
                  id="capacity"
                  placeholder="Capacity"
                  {...register("vehicle.capacity", {
                    setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
                  })}
                  className="flex-1 px-3 py-2 focus:outline-none text-gray-600 border border-gray-300 rounded-lg"
                />
                {errors.vehicle?.capacity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicle.capacity.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <Label
                  htmlFor="vehicleType"
                  className="block text-sm text-gray-600"
                >
                  Vehicle Type
                </Label>
                <Input
                  type="text"
                  id="vehicleType"
                  placeholder="car / auto / motorcycle"
                  {...register("vehicle.vehicleType")}
                  className="flex-1 px-3 py-2 focus:outline-none text-gray-600 border border-gray-300 rounded-lg"
                />
                {errors.vehicle?.vehicleType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicle.vehicleType.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-white py-3 rounded-lg font-medium bg-primary"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-2">
          <Link to="/captain-sign-in" className="hover:underline">
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

export default CaptainSignUp;
