import React, { FormEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

//objectification

const schema = z.object({
 
  //age: z.number().min(18),
  ip: z.string().regex(/^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/, 
    {message: 'Invalid IP Address'}
  )
});

type formdata = z.infer<typeof schema>;

const WeatherApp = () => {
//   const Form = useForm();
//   console.log(Form);
//   const address = useRef<HTMLInputElement>(null);
//   const [IP_Value, setIP_Value] = useState({
//   ip: "",
//   });

const [result, setResult] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

  const {register, handleSubmit, formState: {errors, isValid},
} = useForm<formdata>({resolver: zodResolver(schema)});

const onSubmit = async (data: formdata) => {
    console.log('Submitted Data', data);
    setLoading(true);
    setResult(null);

    try{
      const response = await fetch(`https://weatherproject-1-fqn9.onrender.com/?ip=${data.ip}`);
      const html = await response.text();
      setResult(html);
    } catch (error){
      console.error('Fetch error: ', error);
      setResult(`<h6 style='color:red;'>Failed to fetch data from server.</h6>`);
    } finally {
      setLoading(false);
    }
};
  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault();
  //   if (address.current !== null) IP_Value.ip = address.current.value;
  //   console.log(IP_Value.ip);
  // };
  return (
    <div className="container mt-5 middle" style={{ maxWidth: "400px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 d-flex justify-content-center">
          <h6>Get Weather By IP</h6>
        </div>
        <div className="mb-3">
          <input
            {...register("ip")}
            type="text"
            className="form-control"
            placeholder="Enter IP address"
          />
          {errors.ip && <p className="text-danger mt-1">{errors.ip.message}</p>}
        </div>
        <button disabled={!isValid} type="submit" className="btn btn-primary w-100">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {result && (
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: result }} />
      )}
    </div>
  );
};

export default WeatherApp;
